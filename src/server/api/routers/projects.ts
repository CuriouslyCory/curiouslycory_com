import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

/**
 * Projects router with procedures for managing project data
 * Returns project records and related metadata from the database
 */
export const projectsRouter = createTRPCRouter({
  /**
   * Get all projects
   * Returns all project records with author information
   */
  getAll: publicProcedure.query(async ({ ctx }) => {
    const projects = await ctx.db.project.findMany({
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    return projects;
  }),

  /**
   * Get the top published projects in curated order
   * Powers the homepage "Featured Missions" grid
   */
  getShowcase: publicProcedure
    .input(z.object({ limit: z.number().int().min(1).max(12).default(4) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.project.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        take: input.limit,
      });
    }),

  /**
   * Get all distinct tags from projects
   * Returns a unique list of all tags used across projects
   */
  getTags: publicProcedure.query(async ({ ctx }) => {
    const projects = await ctx.db.project.findMany({
      select: {
        tags: true,
      },
      where: {
        published: true,
      },
    });

    // Flatten the array of tag arrays and get unique values
    const allTags = projects.flatMap((project) => project.tags);
    const uniqueTags = [...new Set(allTags)].sort();

    return uniqueTags;
  }),
});
