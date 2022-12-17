import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../../db/client";
import { createClient } from "contentful";
import { BlogPost } from "../../../features/blog/types/contentful";

export const contentfulRouter = router({
  getBlogPosts: publicProcedure.query(async ({ input }) => {
    return await getBlogPosts();
  }),
  getBlogPost: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      return getBlogPost(input.postId);
    }),
});

const getBlogPosts = () => {
  const client = createClient({
    space: "r5b2emceg285",
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
  });
  return client
    .getEntries<BlogPost>({
      order: "-sys.createdAt",
      content_type: "blogPost",
    })
    .then((response) => response.items);
};

const getBlogPost = (id: string) => {
  const client = createClient({
    space: "r5b2emceg285",
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
  });
  return client.getEntry<BlogPost>(id);
};
