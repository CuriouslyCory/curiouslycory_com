import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "~/env";

const twitchVideoSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  user_login: z.string(),
  user_name: z.string(),
  title: z.string(),
  description: z.string(),
  created_at: z.string(),
  published_at: z.string(),
  url: z.string(),
  thumbnail_url: z.string().nullable(),
  viewable: z.string(),
  view_count: z.number(),
  language: z.string(),
  type: z.string(),
  duration: z.string(),
  muted_segments: z.array(z.unknown()).nullable(),
});

const twitchVideosResponseSchema = z.object({
  data: z.array(twitchVideoSchema),
  pagination: z.object({
    cursor: z.string().optional(),
  }),
});

const twitchStreamSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  user_login: z.string(),
  user_name: z.string(),
  game_id: z.string(),
  game_name: z.string(),
  type: z.string(),
  title: z.string(),
  viewer_count: z.number(),
  started_at: z.string(),
  language: z.string(),
  thumbnail_url: z.string(),
  tag_ids: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  is_mature: z.boolean(),
});

const twitchStreamsResponseSchema = z.object({
  data: z.array(twitchStreamSchema),
  pagination: z.object({
    cursor: z.string().optional(),
  }),
});

export type TwitchVideo = z.infer<typeof twitchVideoSchema>;
export type TwitchVideosResponse = z.infer<typeof twitchVideosResponseSchema>;
export type TwitchStream = z.infer<typeof twitchStreamSchema>;
export type TwitchStreamsResponse = z.infer<typeof twitchStreamsResponseSchema>;

const getTwitchAccessToken = async (): Promise<string> => {
  const tokenResponse = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: env.TWITCH_CLIENT_ID,
      client_secret: env.TWITCH_CLIENT_SECRET,
      grant_type: "client_credentials",
    }),
  });

  const { access_token } = (await tokenResponse.json()) as {
    access_token: string;
  };

  if (!access_token) {
    throw new Error("Failed to get Twitch access token");
  }

  return access_token;
};

export const twitchRouter = createTRPCRouter({
  getUserVideos: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const access_token = await getTwitchAccessToken();

      // Fetch videos
      const url = new URL("https://api.twitch.tv/helix/videos");
      url.searchParams.append("user_id", input.userId);
      url.searchParams.append("first", input.limit.toString());

      if (input.cursor) {
        url.searchParams.append("after", input.cursor);
      }

      const videosResponse = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Client-Id": env.TWITCH_CLIENT_ID,
        },
      });

      if (!videosResponse.ok) {
        throw new Error(`Twitch API error: ${videosResponse.statusText}`);
      }

      const rawData = (await videosResponse.json()) as unknown;
      const result = twitchVideosResponseSchema.parse(rawData);

      return {
        videos: result.data,
        nextCursor: result.pagination.cursor,
      };
    }),

  getStreams: publicProcedure
    .input(
      z.object({
        userIds: z.array(z.string()).min(1).max(100),
      }),
    )
    .query(async ({ input }) => {
      const access_token = await getTwitchAccessToken();

      // Fetch streams
      const url = new URL("https://api.twitch.tv/helix/streams");

      // Add each user_id as a separate query parameter
      input.userIds.forEach((userId) => {
        url.searchParams.append("user_id", userId);
      });

      const streamsResponse = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Client-Id": env.TWITCH_CLIENT_ID,
        },
      });

      if (!streamsResponse.ok) {
        throw new Error(`Twitch API error: ${streamsResponse.statusText}`);
      }

      const rawData = (await streamsResponse.json()) as unknown;
      const result = twitchStreamsResponseSchema.parse(rawData);

      return {
        streams: result.data,
        isLive: result.data.length > 0,
      };
    }),
});
