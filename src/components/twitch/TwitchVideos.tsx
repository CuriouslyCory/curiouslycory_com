import { useTwitchVideos } from "~/hooks/use-twitch-videos";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Image from "next/image";

type TwitchVideosProps = {
  userId: string;
  limit?: number;
};

export function TwitchVideos({ userId, limit }: TwitchVideosProps) {
  const {
    videos,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTwitchVideos({
    userId,
    limit,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (videos.length === 0) {
    return <div>No videos found</div>;
  }

  // Helper function to format duration (e.g., "1h2m3s")
  const formatDuration = (duration: string) => {
    return duration.replace("h", "h ").replace("m", "m ").replace("s", "s");
  };

  // Helper to create proper thumbnail URL
  const getThumbnailUrl = (url: string | null, videoId: string) => {
    if (!url) return "/placeholder-thumbnail.jpg";

    // Replace the width and height values
    return url.replace("%{width}", "320").replace("%{height}", "180");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-[180px] w-full">
                <Image
                  src={getThumbnailUrl(video.thumbnail_url, video.id)}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute right-2 bottom-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                  {formatDuration(video.duration)}
                </div>
                <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                  {video.view_count.toLocaleString()} views
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <CardTitle className="line-clamp-2 text-base">
                {video.title}
              </CardTitle>
              <CardDescription className="mt-1 line-clamp-1">
                {video.user_name}
              </CardDescription>
              <div className="mt-1 text-xs text-gray-500">
                {new Date(video.created_at).toLocaleDateString()}
              </div>
            </CardContent>
            <CardFooter>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Watch on Twitch
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>

      {hasNextPage && (
        <div className="my-4 flex justify-center">
          <Button
            onClick={() => void fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="outline"
          >
            {isFetchingNextPage ? "Loading more..." : "Load more videos"}
          </Button>
        </div>
      )}
    </div>
  );
}
