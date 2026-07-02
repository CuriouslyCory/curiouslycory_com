import fs from "fs";
import path from "path";
import { createHash, randomUUID } from "node:crypto";
import { Prisma, PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import matter from "gray-matter";
import slugify from "slugify";
import { z } from "zod";
import { extractSearchableText } from "../lib/blog-content-extractor.js";
import { chunkText } from "../lib/chunk-text.js";
import { toVectorLiteral } from "../lib/vector-literal.js";
import { embedChunks } from "../server/embeddings.js";

let prisma: PrismaClient;
function getPrisma(): PrismaClient {
  if (!prisma) {
    let connectionString = process.env.DATABASE_URL;
    const needsSsl = connectionString?.includes("sslmode=");
    if (needsSsl && connectionString) {
      connectionString = connectionString.replace(/[?&]sslmode=[^&]*/g, "");
    }
    const adapter = new PrismaPg({
      connectionString,
      ...(needsSsl ? { ssl: { rejectUnauthorized: false } } : {}),
    });
    prisma = new PrismaClient({ adapter });
  }
  return prisma;
}

// Define the schema for post metadata validation
const PostMetadataSchema = z.object({
  title: z.string().optional(),
  excerpt: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  publishedAt: z.union([
    z.string(),
    z.date()
  ]).optional().transform(val => val ? new Date(val) : new Date()),
  published: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),
  authorId: z.string().optional(),
  tags: z.string().optional().transform(val =>
    val ? val.split(",").map(tag => tag.trim()) : []
  ),
});

// Helper function to ensure there's a default user for blog posts
async function getDefaultUser(): Promise<string> {
  // Check for a default user ID from environment variables
  const defaultUserId = process.env.DEFAULT_AUTHOR_ID;

  // If we have a valid ID, check if it exists
  if (defaultUserId) {
    const user = await getPrisma().user.findUnique({
      where: { id: defaultUserId },
    });

    if (user) return user.id;
  }

  // Otherwise, find or create a default user
  const defaultUser = await getPrisma().user.findFirst({
    where: { email: 'blog@example.com' },
  });

  if (defaultUser) return defaultUser.id;

  // Create a default user as a last resort
  const newUser = await getPrisma().user.create({
    data: {
      name: 'Blog Author',
      email: 'blog@example.com',
    },
  });

  return newUser.id;
}

/**
 * Chunk + embed a single post's content into `PostChunk`, guarded so
 * unchanged posts make zero OpenAI calls on re-runs (#44).
 *
 * Read raw from `process.env` here (not `~/env`), mirroring the
 * `DEFAULT_AUTHOR_ID` precedent above — this keeps the indexer script
 * decoupled from full t3-env validation (no Discord/Twitch/Auth secrets
 * required to run it standalone, e.g. from CI in a future update).
 */
async function embedPostChunks(
  post: { id: string; slug: string; content: string | null; contentHash: string | null },
  forceReembed: boolean,
  apiKey: string | undefined,
  embedCallCounter: { count: number },
): Promise<void> {
  const { id: postId, slug, content, contentHash } = post;

  if (!content) {
    // Content removed/empty -> clean up any stale chunks, no API call.
    await getPrisma().postChunk.deleteMany({ where: { postId } });
    return;
  }

  const existing = await getPrisma().postChunk.findFirst({
    where: { postId },
    select: { contentHash: true },
  });
  const needsEmbed =
    forceReembed || existing?.contentHash !== contentHash;

  if (!needsEmbed) return; // zero OpenAI calls on unchanged re-run

  if (!apiKey) {
    console.warn(`skip embed ${slug}: no OPENAI_API_KEY (leaving stale chunks)`);
    return;
  }

  const chunks = chunkText(content);
  if (chunks.length === 0) {
    await getPrisma().postChunk.deleteMany({ where: { postId } });
    return;
  }

  embedCallCounter.count += 1;
  const embeddings = await embedChunks(
    chunks.map((c) => c.content),
    apiKey,
  );

  if (!embeddings) {
    console.warn(`skip embed ${slug}: embedding failed (leaving old chunks intact)`);
    return;
  }

  // Transaction opens only AFTER embedChunks has succeeded — never hold a
  // DB txn open across the network call to OpenAI.
  await getPrisma().$transaction(async (tx) => {
    await tx.postChunk.deleteMany({ where: { postId } });
    for (let i = 0; i < chunks.length; i++) {
      await tx.$executeRaw(Prisma.sql`
        INSERT INTO "PostChunk" ("id", "postId", "chunkIndex", "content", "contentHash", "embedding")
        VALUES (${randomUUID()}, ${postId}, ${chunks[i]!.index}, ${chunks[i]!.content}, ${contentHash}, ${toVectorLiteral(embeddings[i]!)}::vector)
      `);
    }
  });

  console.log(`Embedded ${chunks.length} chunk(s) for ${slug}`);
}

// This will run at build time to extract metadata from custom blog pages
// and upsert them to the database to maintain the searchable index
export async function indexBlogPosts(): Promise<void> {
  console.log("🔍 Indexing blog posts...");

  // Get or create a default user for blog posts
  const defaultUserId = await getDefaultUser();
  console.log(`Using default user ID: ${defaultUserId}`);

  // Embedding config (#44) — raw process.env, mirrors DEFAULT_AUTHOR_ID.
  const forceReembed = !!process.env.FORCE_REEMBED;
  const apiKey = process.env.OPENAI_API_KEY;
  const embedCallCounter = { count: 0 };

  // Path to blog posts directory
  const postsDirectory = path.join(process.cwd(), "src/app/blog");

  try {
    // Find all slug directories
    const slugDirs = fs
      .readdirSync(postsDirectory, { withFileTypes: true })
      .filter(
        (dirent) =>
          dirent.isDirectory() &&
          dirent.name !== "[slug]" &&
          dirent.name !== "template" &&
          !dirent.name.startsWith("_"),
      )
      .map((dirent) => dirent.name);

    console.log(`Found ${slugDirs.length} blog posts to index`);

    for (const slug of slugDirs) {
      const postDir = path.join(postsDirectory, slug);
      const pageFile = path.join(postDir, "page.tsx");

      // Skip directories without a page.tsx file
      if (!fs.existsSync(pageFile)) {
        console.log(`Skipping ${slug} - no page.tsx found`);
        continue;
      }

      // Read the page file
      const fileContent = fs.readFileSync(pageFile, "utf8");

      // Extract metadata from frontmatter-style comments in the page file
      const metadataRegex = /---bm\s*([\s\S]*?)\s*---/;
      const match = metadataRegex.exec(fileContent);

      if (!match?.[1]) {
        console.log(`Skipping ${slug} - no metadata found`);
        continue;
      }

      // Extract the YAML content
      const { data: rawMetadata } = matter(`---\n${match[1]}\n---`);

      // Validate and transform the metadata with Zod
      const result = PostMetadataSchema.safeParse(rawMetadata);

      if (!result.success) {
        console.error(`Invalid metadata format in ${slug}:`, result.error.format());
        continue;
      }

      const metadata = result.data;

      // Extract real searchable prose/code from the page's JSX via the AST
      // (DB-free) so the generated tsvector column has real body content to
      // rank against, not just title/excerpt.
      const bodyText = extractSearchableText(fileContent);
      const content = bodyText.length > 0 ? bodyText : null;
      const contentHash = content
        ? createHash("sha256").update(content).digest("hex")
        : null;

      // Format the post data with validated metadata
      const postData = {
        title: String(metadata.title ?? slug),
        slug,
        content,
        contentHash,
        excerpt: metadata.excerpt ?? null,
        coverImage: metadata.coverImage ?? null,
        published: metadata.published,
        featured: metadata.featured,
        publishedAt: metadata.publishedAt,
        authorId: metadata.authorId ?? defaultUserId,
      };

      console.log(`Indexing: ${postData.title} (${slug})`);

      // Upsert post to maintain index
      const post = await getPrisma().post.upsert({
        where: { slug },
        update: postData,
        create: postData,
      });

      // Chunk + embed for semantic search (#44). Wrapped per-post so one
      // bad post (embed failure, transient DB error) never aborts the run
      // for the rest of the posts.
      try {
        await embedPostChunks(post, forceReembed, apiKey, embedCallCounter);
      } catch (error) {
        console.error(`Error embedding chunks for ${slug}:`, error);
      }

      // Process tags
      const tagNames = metadata.tags;
      if (tagNames.length > 0) {
        // First, disconnect all existing tags
        await getPrisma().post.update({
          where: { id: post.id },
          data: {
            tags: { set: [] },
          },
        });

        // Then connect or create tags
        for (const tagName of tagNames) {
          const tagSlug = slugify(tagName, { lower: true });

          await getPrisma().tag.upsert({
            where: { slug: tagSlug },
            update: { name: tagName },
            create: { name: tagName, slug: tagSlug },
          });

          await getPrisma().post.update({
            where: { id: post.id },
            data: {
              tags: {
                connect: { slug: tagSlug },
              },
            },
          });
        }
      }
    }

    console.log(
      `✅ Blog indexing completed (${embedCallCounter.count} embed call(s))`,
    );
  } catch (error) {
    console.error("Error indexing blog posts:", error);
  } finally {
    await getPrisma().$disconnect();
  }
}
