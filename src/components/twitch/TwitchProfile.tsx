import { useState } from "react";
import { TwitchVideos } from "./TwitchVideos";
import { TwitchLiveStatus } from "./TwitchLiveStatus";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type TwitchProfileProps = {
  userId: string;
  username: string;
};

export function TwitchProfile({ userId, username }: TwitchProfileProps) {
  const [activeTab, setActiveTab] = useState<string>("videos");

  return (
    <Card className="w-full">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">
          {username}&#39;s Twitch
        </CardTitle>
        <TwitchLiveStatus
          userId={userId}
          showName={false}
          showGameName={true}
          showViewers={true}
        />
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="mb-4 flex border-b">
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-4 py-2 font-medium ${activeTab === "videos" ? "border-primary border-b-2" : ""}`}
            >
              Recent Videos
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`px-4 py-2 font-medium ${activeTab === "about" ? "border-primary border-b-2" : ""}`}
            >
              About
            </button>
          </div>

          {activeTab === "videos" && (
            <div className="mt-0">
              <TwitchVideos userId={userId} limit={6} />
            </div>
          )}

          {activeTab === "about" && (
            <div className="mt-0">
              <p className="text-muted-foreground text-sm">
                Check out {username}&#39;s content on Twitch. You can watch
                their recent videos or tune in when they&#39;re live streaming.
              </p>
              <a
                href={`https://twitch.tv/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
              >
                Visit {username}&#39;s Twitch Channel
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
