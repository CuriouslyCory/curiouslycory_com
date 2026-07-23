import { z } from "zod";
import { Prisma, type PrismaClient } from "~/generated/prisma/client";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { postSearchParamsSchema, postSchema } from "~/data/blog-schema";
import { reorderByRank } from "~/lib/reorder-by-rank";
import { reciprocalRankFusion } from "~/lib/reciprocal-rank-fusion";
import { toVectorLiteral } from "~/lib/vector-literal";
import { embedQuery } from "~/server/embeddings";
import { env } from "~/env";

/**
 * Postgres full-text search over the generated `Post.searchVector` tsvector
 * column (title A / excerpt B / content C weighted). Returns the *full*
 * ranked id list for `q` — no LIMIT, no other filters — so #44's semantic
 * (RRF) layer can compose against the same ranked set without a rewrite.
 *
 * `published = true` is enforced here in SQL as defense-in-depth, in
 * addition to the Prisma `where` composed by the caller.
 *
 * Exported as a standalone function (not inlined in `getAll`) so it is a
 * stable seam other callers can compose against.
 */
export async function searchPostIds(
  db: PrismaClient,
  q: string,
): Promise<Array<{ id: string; rank: number }>> {
  return db.$queryRaw<Array<{ id: string; rank: number }>>(Prisma.sql`
    WITH query AS (
      SELECT CASE WHEN numnode(websearch_to_tsquery('english', ${q})) = 0
                  THEN plainto_tsquery('english', ${q})
                  ELSE websearch_to_tsquery('english', ${q}) END AS tsq
    )
    SELECT "Post"."id" AS id, ts_rank_cd("Post"."searchVector", query.tsq) AS rank
    FROM "Post", query
    WHERE "Post"."published" = true AND "Post"."searchVector" @@ query.tsq
    ORDER BY rank DESC
  `);
}

/**
 * Semantic search over `PostChunk.embedding` (#44): ranks posts by their
 * best-matching chunk's cosine distance to the query embedding. Bounded to
 * the 50 closest posts (`ORDER BY distance ASC LIMIT 50`) so pagination
 * `total` stays meaningful as the corpus grows — harmless at today's scale,
 * matters once there are hundreds of posts.
 *
 * `published = true` is enforced here in SQL, same defense-in-depth
 * rationale as `searchPostIds`. Callers must catch: this can throw if
 * `PostChunk`/pgvector isn't provisioned yet (e.g. migration not applied),
 * and getAll must degrade to FTS-only in that case.
 */
export async function searchPostIdsSemantic(
  db: PrismaClient,
  queryEmbedding: number[],
): Promise<Array<{ id: string; distance: number }>> {
  return db.$queryRaw<Array<{ id: string; distance: number }>>(Prisma.sql`
    SELECT "PostChunk"."postId" AS id, MIN("PostChunk"."embedding" <=> ${toVectorLiteral(queryEmbedding)}::vector) AS distance
    FROM "PostChunk"
    JOIN "Post" ON "Post"."id" = "PostChunk"."postId"
    WHERE "Post"."published" = true
    GROUP BY "PostChunk"."postId"
    ORDER BY distance ASC
    LIMIT 50
  `);
}

export const blogRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(postSearchParamsSchema)
    .query(async ({ ctx, input }) => {
      const { q, tag, featured, year, month, page, perPage } = input;
      const skip = (page - 1) * perPage;

      const ftsIds = q ? await searchPostIds(ctx.db, q) : null;

      // Semantic fusion (#44): every branch here degrades to FTS-only
      // (`rankedIds = ftsIds`) and none can throw out of `getAll` — no `q`,
      // `q` too short, no OPENAI_API_KEY, embed timeout/error (embedQuery
      // never throws, resolves null), or the semantic query itself throwing
      // (e.g. PostChunk/pgvector not provisioned yet).
      let rankedIds = ftsIds;
      if (q && q.trim().length >= 3) {
        const emb = await embedQuery(q, env.OPENAI_API_KEY);
        if (emb) {
          try {
            const sem = await searchPostIdsSemantic(ctx.db, emb);
            rankedIds = reciprocalRankFusion([ftsIds ?? [], sem]).map(
              ({ id, score }) => ({ id, rank: score }),
            );
          } catch {
            // pgvector/PostChunk missing or query failed -> keep FTS-only.
          }
        }
      }

      // Query builder
      const query: Prisma.PostFindManyArgs = {
        where: {
          published: true,
          ...(featured ? { featured: true } : {}),
          ...(tag ? { tags: { some: { slug: tag } } } : {}),
          ...(rankedIds
            ? { id: { in: rankedIds.map((r) => r.id) } }
            : {}),
          ...(year
            ? {
                publishedAt: {
                  gte: new Date(year, month ?? 0, 1),
                  lt: new Date(year, month ?? 12, month ? 32 : 1),
                },
              }
            : {}),
        },
        orderBy: {
          publishedAt: "desc",
        },
        include: {
          tags: true,
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        // Non-search results are paginated in SQL; search results are
        // fetched in full (composed with the other filters above), then
        // reordered by FTS rank and sliced in JS below.
        ...(rankedIds ? {} : { skip, take: perPage }),
      };

      const [posts, totalCount] = await Promise.all([
        ctx.db.post.findMany(query),
        ctx.db.post.count({ where: query.where }),
      ]);

      // Pagination total with `q` present = count of the fully composed
      // filter set (FTS ∩ tag ∩ date ∩ featured), not raw FTS hit count —
      // otherwise pagination overcounts when other filters are active.
      const paginatedPosts = rankedIds
        ? reorderByRank(posts, rankedIds).slice(skip, skip + perPage)
        : posts;

      return {
        posts: paginatedPosts,
        pagination: {
          total: totalCount,
          page,
          perPage,
          totalPages: Math.ceil(totalCount / perPage),
        },
      };
    }),

  getDateAggregations: publicProcedure.query(async ({ ctx }) => {
    // Get all posts with valid publishedAt dates
    const posts = await ctx.db.post.findMany({
      where: {
        published: true,
        publishedAt: { not: null },
      },
      select: {
        publishedAt: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    // Group posts by year and month
    const dateAggregations = posts.reduce(
      (acc, post) => {
        const date = post.publishedAt!;
        const year = date.getFullYear();
        const month = date.getMonth(); // JavaScript months are 0-based

        // Find or create year entry
        let yearEntry = acc.find((entry) => entry.year === year);
        if (!yearEntry) {
          yearEntry = { year, months: [], count: 0 };
          acc.push(yearEntry);
        }

        // Find or create month entry
        let monthEntry = yearEntry.months.find(
          (entry) => entry.month === month,
        );
        if (!monthEntry) {
          monthEntry = { month, count: 0 };
          yearEntry.months.push(monthEntry);
        }

        // Increment counts
        monthEntry.count++;
        yearEntry.count++;

        return acc;
      },
      [] as Array<{
        year: number;
        months: Array<{ month: number; count: number }>;
        count: number;
      }>,
    );

    // Sort years descending and months ascending
    dateAggregations.sort((a, b) => b.year - a.year);
    dateAggregations.forEach((year) => {
      year.months.sort((a, b) => a.month - b.month);
    });

    return dateAggregations;
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { slug: input.slug, published: true },
        include: {
          tags: true,
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });

      return post;
    }),

  getFeatured: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      where: {
        published: true,
        featured: true,
      },
      include: {
        tags: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: 3,
    });

    return posts;
  }),

  create: protectedProcedure
    .input(postSchema)
    .mutation(async ({ ctx, input }) => {
      // Separate tags from other input data
      const { tags, ...postData } = input;

      // Prepare the create data with proper structure for Prisma
      const data: Prisma.PostCreateInput = {
        ...postData,
        author: {
          connect: { id: ctx.session.user.id },
        },
      };

      // Add tags relation if tags exist
      if (tags && tags.length > 0) {
        data.tags = {
          connectOrCreate: tags.map((tag) => ({
            where: { slug: tag.slug },
            create: {
              name: tag.name,
              slug: tag.slug,
            },
          })),
        };
      }

      return ctx.db.post.create({ data });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: postSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data: inputData } = input;
      const { tags, ...postData } = inputData;

      // Get the current post
      const currentPost = await ctx.db.post.findUnique({
        where: { id },
        include: { tags: true },
      });

      if (!currentPost) {
        throw new Error("Post not found");
      }

      // Verify ownership
      if (currentPost.authorId !== ctx.session.user.id) {
        throw new Error("Not authorized to update this post");
      }

      // Prepare update data with proper structure for Prisma
      const data: Prisma.PostUpdateInput = {
        ...postData,
      };

      // Add tags relation if tags exist
      if (tags && tags.length > 0) {
        data.tags = {
          set: [], // First disconnect all tags
          connectOrCreate: tags.map((tag) => ({
            where: { slug: tag.slug },
            create: {
              name: tag.name,
              slug: tag.slug,
            },
          })),
        };
      }

      return ctx.db.post.update({
        where: { id },
        data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.id },
      });

      if (!post) {
        throw new Error("Post not found");
      }

      // Verify ownership
      if (post.authorId !== ctx.session.user.id) {
        throw new Error("Not authorized to delete this post");
      }

      return ctx.db.post.delete({
        where: { id: input.id },
      });
    }),
});
