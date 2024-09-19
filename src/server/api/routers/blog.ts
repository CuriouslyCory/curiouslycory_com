import { z } from "zod";
import { type Prisma } from "@prisma/client";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { postSearchParamsSchema, postSchema } from "~/data/blog-schema";

export const blogRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(postSearchParamsSchema)
    .query(async ({ ctx, input }) => {
      const { q, tag, featured, year, month, page, perPage } = input;
      const skip = (page - 1) * perPage;

      // Query builder
      const query: Prisma.PostFindManyArgs = {
        where: {
          published: true,
          ...(featured ? { featured: true } : {}),
          ...(tag ? { tags: { some: { slug: tag } } } : {}),
          ...(q
            ? {
                OR: [
                  {
                    title: {
                      contains: q,
                      mode: "insensitive" as Prisma.QueryMode,
                    },
                  },
                  {
                    content: {
                      contains: q,
                      mode: "insensitive" as Prisma.QueryMode,
                    },
                  },
                ],
              }
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
        skip,
        take: perPage,
      };

      const [posts, totalCount] = await Promise.all([
        ctx.db.post.findMany(query),
        ctx.db.post.count({ where: query.where }),
      ]);

      return {
        posts,
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
