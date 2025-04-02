import { z } from "zod";
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
      const { q, tag, featured, page, perPage } = input;
      const skip = (page - 1) * perPage;

      // Query builder
      const query = {
        where: {
          published: true,
          ...(featured ? { featured: true } : {}),
          ...(tag ? { tags: { some: { slug: tag } } } : {}),
          ...(q
            ? {
                OR: [
                  { title: { contains: q, mode: "insensitive" } },
                  { content: { contains: q, mode: "insensitive" } },
                ],
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
      return ctx.db.post.create({
        data: {
          ...input,
          author: {
            connect: { id: ctx.session.user.id },
          },
          ...(input.tags && {
            tags: {
              connectOrCreate: input.tags.map((tag) => ({
                where: { slug: tag.slug },
                create: {
                  name: tag.name,
                  slug: tag.slug,
                },
              })),
            },
          }),
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: postSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;

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

      return ctx.db.post.update({
        where: { id },
        data: {
          ...data,
          ...(data.tags && {
            tags: {
              set: [], // First disconnect all tags
              connectOrCreate: data.tags.map((tag) => ({
                where: { slug: tag.slug },
                create: {
                  name: tag.name,
                  slug: tag.slug,
                },
              })),
            },
          }),
        },
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
