import { type TwitchVideo } from "~/server/api/routers/twitch";
import { api } from "~/trpc/react";
import { useCallback } from "react";
import { type TRPCClientErrorLike } from "@trpc/client";
import { type AppRouter } from "~/server/api/root";

type UseTwitchVideosParams = {
  userId: string;
  limit?: number;
  initialCursor?: string;
  enabled?: boolean;
};

type UseTwitchVideosReturn = {
  videos: TwitchVideo[];
  isLoading: boolean;
  isError: boolean;
  error: TRPCClientErrorLike<AppRouter> | null;
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export function useTwitchVideos({
  userId,
  limit = 20,
  initialCursor,
  enabled = true,
}: UseTwitchVideosParams): UseTwitchVideosReturn {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = api.twitch.getUserVideos.useInfiniteQuery(
    {
      userId,
      limit,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialCursor,
      enabled: enabled && !!userId,
    },
  );

  const fetchNext = useCallback(async () => {
    if (hasNextPage && !isFetchingNextPage) {
      return await fetchNextPage();
    }
    return undefined;
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Flatten all pages of videos into a single array
  const videos = data?.pages.flatMap((page) => page.videos) ?? [];

  return {
    videos,
    isLoading,
    isError,
    error: error ?? null,
    fetchNextPage: fetchNext,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
  };
}
