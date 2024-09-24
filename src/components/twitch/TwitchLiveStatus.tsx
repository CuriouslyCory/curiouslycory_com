import { useTwitchStream } from "~/hooks/use-twitch-stream";
import { Badge } from "~/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

type TwitchLiveStatusProps = {
  userId: string;
  showName?: boolean;
  showViewers?: boolean;
  showGameName?: boolean;
  className?: string;
};

export function TwitchLiveStatus({
  userId,
  showName = true,
  showViewers = true,
  showGameName = true,
  className = "",
}: TwitchLiveStatusProps) {
  const { streams, isLive, isLoading } = useTwitchStream({
    userIds: [userId],
    refetchInterval: 30000, // Check every 30 seconds
  });

  const stream = streams[0];

  if (isLoading) {
    return (
      <div
        className={`h-6 w-20 animate-pulse rounded bg-gray-200 ${className}`}
      />
    );
  }

  if (!isLive) {
    return (
      <Badge variant="outline" className={`text-gray-500 ${className}`}>
        Offline
      </Badge>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <Badge variant="destructive" className="animate-pulse">
        LIVE
      </Badge>

      {showName && stream?.title && (
        <span className="line-clamp-1 font-medium">{stream.title}</span>
      )}

      {showGameName && stream?.game_name && (
        <Badge variant="secondary">{stream.game_name}</Badge>
      )}

      {showViewers && stream?.viewer_count && (
        <span className="text-sm text-gray-500">
          {stream.viewer_count.toLocaleString()} viewers
        </span>
      )}

      <Link
        href={`https://twitch.tv/${stream?.user_login ?? ""}`}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-1 inline-flex items-center text-sm text-blue-600 hover:underline"
      >
        Watch <ExternalLink className="ml-1 h-3 w-3" />
      </Link>
    </div>
  );
}
