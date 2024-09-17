import { z } from "zod";

export const tagSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
});

export const postSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  excerpt: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  publishedAt: z.date().optional().nullable(),
  tags: z.array(tagSchema).optional(),
  authorId: z.string(),
});

export const postSearchParamsSchema = z.object({
  q: z.string().optional(),
  tag: z.string().optional(),
  featured: z.boolean().optional(),
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(10),
});

export type Tag = z.infer<typeof tagSchema>;
export type Post = z.infer<typeof postSchema>;
export type PostSearchParams = z.infer<typeof postSearchParamsSchema>;
