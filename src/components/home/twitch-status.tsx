"use client";

import Link from "next/link";
import { FaTwitch } from "react-icons/fa";

import { Button } from "~/components/ui/button";
import { TWITCH_URL, TWITCH_USER_ID } from "~/data/socials";
import { useTwitchStream } from "~/hooks/use-twitch-stream";
import { cn } from "~/lib/utils";

/** Both homepage indicators share one cached query via React Query. */
function useIsLive() {
  const { isLive } = useTwitchStream({
    userIds: [TWITCH_USER_ID],
    refetchInterval: 30_000,
  });
  return isLive;
}

function LiveDot({ isLive }: { isLive: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "size-2 shrink-0 rounded-full",
        isLive ? "live-pulse bg-red-500" : "bg-muted-foreground",
      )}
    />
  );
}

/** Compact "on air" line in the hero; jumps down to the links section. */
export function HeroLiveIndicator() {
  const isLive = useIsLive();

  return (
    <a href="#links" className="flex items-center gap-2">
      <LiveDot isLive={isLive} />
      {isLive ? "Live on Twitch right now" : "Twitch: off air"}
    </a>
  );
}

/** Twitch call-to-action card in the "Stay in orbit" section. */
export function TwitchLiveCard() {
  const isLive = useIsLive();

  return (
    <div
      className={cn(
        "flex max-w-[440px] items-center gap-4 rounded-xl border px-5 py-[18px]",
        isLive
          ? "border-red-500/60 bg-red-500/12"
          : "border-background/20 dark:border-border bg-current/6",
      )}
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-[10px] bg-[#9146ff] text-white">
        <FaTwitch className="size-[22px]" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-[15px] font-bold">
          <LiveDot isLive={isLive} />
          {isLive ? "LIVE NOW on Twitch" : "Off air right now"}
        </p>
        <p className="mt-0.5 text-sm opacity-75">
          {isLive
            ? "Building in public. Come say hi in chat."
            : "Catch the replays on YouTube until the next stream."}
        </p>
      </div>
      <Button asChild size="sm" variant={isLive ? "default" : "secondary"}>
        <Link href={TWITCH_URL} target="_blank" rel="noopener noreferrer">
          {isLive ? "Tune in" : "Follow"}
        </Link>
      </Button>
    </div>
  );
}
