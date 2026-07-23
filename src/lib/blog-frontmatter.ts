import matter from "gray-matter";
import { z } from "zod";

/**
 * Schema for a blog post's `---bm ... ---` metadata block. Every field is
 * optional so a partial block still parses; `published` defaults to `false`,
 * so a post is only listed/searchable once it explicitly sets `published: true`.
 */
export const PostMetadataSchema = z.object({
  title: z.string().optional(),
  excerpt: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  publishedAt: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : new Date())),
  published: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),
  authorId: z.string().optional(),
  tags: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",").map((tag) => tag.trim()) : [])),
});

export type PostMetadata = z.infer<typeof PostMetadataSchema>;

const FRONTMATTER_RE = /---bm\s*([\s\S]*?)\s*---/;

export type ParsedFrontmatter =
  | { ok: true; data: PostMetadata }
  | { ok: false; reason: "missing" }
  | { ok: false; reason: "invalid"; detail: string };

/**
 * Extract and validate a post's `---bm ... ---` frontmatter from its `page.tsx`
 * source. Pure — no fs, DB, or network — so it is unit-testable in isolation.
 *
 * Returns a discriminated result instead of throwing: malformed YAML (e.g. an
 * unquoted `title:` whose value itself contains `": "`, which YAML reads as a
 * key/value separator) comes back as `{ ok: false, reason: "invalid" }` rather
 * than a thrown exception, so the indexer can record the one bad post and keep
 * going instead of aborting the whole run.
 */
export function parsePostFrontmatter(fileContent: string): ParsedFrontmatter {
  const match = FRONTMATTER_RE.exec(fileContent);
  if (!match?.[1]) return { ok: false, reason: "missing" };

  let rawMetadata: unknown;
  try {
    rawMetadata = matter(`---\n${match[1]}\n---`).data;
  } catch (error) {
    return {
      ok: false,
      reason: "invalid",
      detail: error instanceof Error ? error.message : String(error),
    };
  }

  const result = PostMetadataSchema.safeParse(rawMetadata);
  if (!result.success) {
    return {
      ok: false,
      reason: "invalid",
      detail: JSON.stringify(result.error.format()),
    };
  }
  return { ok: true, data: result.data };
}
