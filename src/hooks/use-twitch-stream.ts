import { type TwitchStream } from "~/server/api/routers/twitch";
import { api } from "~/trpc/react";
import { type TRPCClientErrorLike } from "@trpc/client";
import { type AppRouter } from "~/server/api/root";

type UseTwitchStreamParams = {
  userIds: string[];
  enabled?: boolean;
  refetchInterval?: number;
};

type UseTwitchStreamReturn = {
  streams: TwitchStream[];
  isLive: boolean;
  isLoading: boolean;
  isError: boolean;
  error: TRPCClientErrorLike<AppRouter> | null;
  refetch: () => Promise<unknown>;
};

export function useTwitchStream({
  userIds,
  enabled = true,
  refetchInterval = 60000, // Default to refetch every minute
}: UseTwitchStreamParams): UseTwitchStreamReturn {
  const { data, isLoading, isError, error, refetch } =
    api.twitch.getStreams.useQuery(
      {
        userIds,
      },
      {
        enabled: enabled && userIds.length > 0,
        refetchInterval, // Automatically refetch at the specified interval
      },
    );

  return {
    streams: data?.streams ?? [],
    isLive: data?.isLive ?? false,
    isLoading,
    isError,
    error: error ?? null,
    refetch: async () => refetch(),
  };
}
