import Link from "next/link";
import { Radio } from "lucide-react";

import { Astronaut } from "~/components/astronaut";
import { HeroLiveIndicator } from "~/components/home/twitch-status";
import { SkyAmbiance } from "~/components/sky-ambiance";
import { Button } from "~/components/ui/button";
import { ChatBubble } from "~/components/ui/chat-bubble";

type Star = {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
};

/**
 * A fixed star field, generated once from a seeded LCG so server and client
 * markup always match (Math.random would cause a hydration mismatch).
 */
const STARS: Star[] = (() => {
  let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  return Array.from({ length: 70 }, () => ({
    x: rnd() * 100,
    y: rnd() * 88,
    size: rnd() < 0.15 ? 3 : rnd() < 0.5 ? 2 : 1.5,
    duration: 2 + rnd() * 4,
    delay: -rnd() * 6,
  }));
})();

function StarField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden dark:block"
    >
      {STARS.map((star, i) => (
        <span
          key={i}
          className="hero-star absolute rounded-full bg-white"
          style={
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              "--twinkle-duration": `${star.duration}s`,
              "--twinkle-delay": `${star.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/**
 * Copy that changes with the time of day. Both variants are rendered and
 * toggled with the `dark:` variant so the server markup is theme-agnostic.
 */
function DayNight({ day, night }: { day: string; night: string }) {
  return (
    <>
      <span className="dark:hidden">{day}</span>
      <span className="hidden dark:inline">{night}</span>
    </>
  );
}

export function Hero() {
  return (
    <>
      <section className="hero-sky relative overflow-clip pt-[88px]">
        <StarField />
        <SkyAmbiance />
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-12 px-8">
          <div className="max-w-[600px] flex-[1_1_360px] pb-[72px]">
            <p className="text-muted-foreground mb-5 flex items-center gap-2.5 font-mono text-[13px]">
              <span className="bg-primary size-2 rounded-full" />
              <DayNight
                day="// incoming transmission from the developer"
                night="// night shift: systems nominal"
              />
            </p>
            <h1 className="font-oswald text-[clamp(44px,6vw,68px)] leading-[1.02] font-bold tracking-tight text-balance">
              Hi, I&apos;m <span className="text-primary">CuriouslyCory</span>.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-[500px] text-xl leading-[1.55] text-pretty">
              I like to build things people actually want to use. Here&apos;s
              what I&apos;ve launched, what I&apos;ve learned along the way, and
              where to find me between missions.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/cv">View My Resume</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/blog">Read the Blog</Link>
              </Button>
            </div>
            <div className="text-muted-foreground mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <span className="flex items-center gap-2">
                <Radio className="size-4" aria-hidden="true" />
                <span>
                  Leading engineering at{" "}
                  <span className="text-foreground font-semibold">
                    Centauri Health Solutions
                  </span>
                </span>
              </span>
              <HeroLiveIndicator />
            </div>
          </div>

          {/* Clip the bottom edge so the sun/moon sits on the horizon while
              the thought bubble and glow can still overflow up and out. */}
          <div className="relative mt-[72px] aspect-[806.18/821.5] w-[clamp(260px,34vw,400px)] max-w-full flex-none [clip-path:inset(-200px_-50%_0_-50%)]">
            <div className="absolute -top-[104px] -right-3 z-10 max-w-[250px]">
              <ChatBubble
                variant="thought"
                direction="bottomLeft"
                text="Psst… tap me to change the sky."
                className="dark:hidden"
              />
              <ChatBubble
                variant="thought"
                direction="bottomLeft"
                text="Tap me to bring back the sun."
                className="hidden dark:inline-block"
              />
            </div>
            <Astronaut
              className="relative block w-full translate-y-1"
              backdropClassName="top-0 left-0 aspect-square w-full"
            />
          </div>
        </div>
      </section>

      {/* Horizon band — overlaps the hero to ground the sun/moon like a surface */}
      <div
        className="hero-horizon relative z-20 -mt-3 h-24"
        aria-hidden="true"
      />
    </>
  );
}
