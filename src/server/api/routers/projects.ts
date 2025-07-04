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
