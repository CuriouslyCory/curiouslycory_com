import { z } from "zod";
import { AtpAgent } from "@atproto/api";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const bskyRouter = createTRPCRouter({
  getFeed: publicProcedure.query(async () => {
    const agent = new AtpAgent({ service: "https://api.bsky.app" });
    const feedResponse = await agent.getAuthorFeed({
      actor: "curiouslycory.com",
      limit: 10,
    });

    return feedResponse.data.feed;
  }),
});
