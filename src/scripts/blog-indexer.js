import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import matter from "gray-matter";
import slugify from "slugify";
import { z } from "zod";

const prisma = new PrismaClient();

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
async function getDefaultUser() {
  // Check for a default user ID from environment variables
  let defaultUserId = process.env.DEFAULT_AUTHOR_ID;
  
  // If we have a valid ID, check if it exists
  if (defaultUserId) {
    const user = await prisma.user.findUnique({
      where: { id: defaultUserId },
    });
    
    if (user) return user.id;
  }
  
  // Otherwise, find or create a default user
  const defaultUser = await prisma.user.findFirst({
    where: { email: 'blog@example.com' },
  });
  
  if (defaultUser) return defaultUser.id;
  
  // Create a default user as a last resort
  const newUser = await prisma.user.create({
    data: {
      name: 'Blog Author',
      email: 'blog@example.com',
    },
  });
  
  return newUser.id;
}

// This will run at build time to extract metadata from custom blog pages
// and upsert them to the database to maintain the searchable index
export async function indexBlogPosts() {
  console.log("🔍 Indexing blog posts...");
  
  // Get or create a default user for blog posts
  const defaultUserId = await getDefaultUser();
  console.log(`Using default user ID: ${defaultUserId}`);
  
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
      // Format:
      // /* 
      //   ---bm
      //   title: Post Title
      //   excerpt: Short description
      //   coverImage: /images/post.jpg
      //   publishedAt: 2023-01-01
      //   featured: true
      //   tags: tag1,tag2,tag3
      //   --- 
      // */
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
      
      // Format the post data with validated metadata
      const postData = {
        title: String(metadata.title ?? slug),
        slug,
        content: null, // Content is in the page component, not in the database
        excerpt: metadata.excerpt,
        coverImage: metadata.coverImage,
        published: metadata.published,
        featured: metadata.featured,
        publishedAt: metadata.publishedAt,
        // Use the metadata authorId or fall back to our default user
        authorId: metadata.authorId ?? defaultUserId,
      };
      
      console.log(`Indexing: ${postData.title} (${slug})`);
      
      // Upsert post to maintain index
      const post = await prisma.post.upsert({
        where: { slug },
        update: postData,
        create: postData,
      });
      
      // Process tags
      const tagNames = metadata.tags;
      if (tagNames.length > 0) {
        // First, disconnect all existing tags
        await prisma.post.update({
          where: { id: post.id },
          data: {
            tags: { set: [] },
          },
        });
        
        // Then connect or create tags
        for (const tagName of tagNames) {
          const tagSlug = slugify(tagName, { lower: true });
          
          await prisma.tag.upsert({
            where: { slug: tagSlug },
            update: { name: tagName },
            create: { name: tagName, slug: tagSlug },
          });
          
          await prisma.post.update({
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
    
    console.log("✅ Blog indexing completed");
  } catch (error) {
    console.error("Error indexing blog posts:", error);
  } finally {
    await prisma.$disconnect();
  }
}
