import Link from "next/link";
import { ScrollText } from "lucide-react";

import { TwitchLiveCard } from "~/components/home/twitch-status";
import { SOCIALS } from "~/data/socials";

const tileClassName =
  "border-background/20 dark:border-border hover:border-primary flex flex-col items-center justify-center gap-2.5 rounded-xl border px-2 py-5 text-center text-sm font-medium transition-[transform,border-color,color] duration-200 hover:-translate-y-1 hover:-rotate-2 focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none motion-reduce:hover:transform-none";

export function StayInOrbit() {
  return (
    <section
      id="links"
      aria-labelledby="links-heading"
      className="bg-foreground text-background dark:text-foreground dark:bg-gray-100/10"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-12 px-8 py-[72px]">
        <div className="flex flex-col gap-5">
          <div>
            <h2
              id="links-heading"
              className="font-oswald text-[clamp(30px,3vw,36px)] leading-[1.1] font-semibold tracking-tight"
            >
              Stay in orbit
            </h2>
            <div className="heading-accent" />
          </div>
          <p className="max-w-[420px] text-[17px] leading-relaxed opacity-80">
            I build in public on Twitch, post climbing and dev videos on
            YouTube, and ship code on GitHub.
          </p>
          <TwitchLiveCard />
        </div>

        <ul className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3">
          {SOCIALS.map((social) => (
            <li key={social.url}>
              <Link
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={tileClassName}
              >
                <social.icon className="size-[30px]" aria-hidden="true" />
                {social.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/cv" className={tileClassName}>
              <ScrollText className="size-[30px]" aria-hidden="true" />
              Resume/CV
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
