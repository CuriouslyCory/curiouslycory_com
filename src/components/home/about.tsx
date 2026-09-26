import Image from "next/image";

import { Badge } from "~/components/ui/badge";

const INTERESTS = ["Rock climbing", "Generative AI", "Sourdough", "Dad duty"];

function Company({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-orange-500">{children}</span>;
}

export function About() {
  return (
    <section
      aria-labelledby="about-heading"
      className="mx-auto max-w-5xl px-8 py-24"
    >
      <div className="flex flex-wrap items-start gap-x-16 gap-y-12">
        <div className="flex flex-[0_0_260px] flex-col gap-8">
          <div>
            <h2
              id="about-heading"
              className="font-oswald text-[clamp(30px,3vw,36px)] leading-[1.1] font-semibold tracking-tight"
            >
              A little about me
            </h2>
            <div className="heading-accent" />
          </div>
          <div className="relative size-52">
            {/* Orbit ring with a single satellite circling the headshot */}
            <div
              aria-hidden="true"
              className="border-primary/55 absolute -inset-3.5 rounded-full border-[1.5px] border-dashed"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-3.5 animate-[spin_14s_linear_infinite] motion-reduce:animate-none"
            >
              <span className="bg-primary absolute -top-[5px] left-1/2 -ml-[5px] size-2.5 rounded-full shadow-[0_0_0_4px_color-mix(in_srgb,var(--primary)_25%,transparent)]" />
            </div>
            <Image
              src="/images/headshot.webp"
              alt="Cory Sougstad"
              width={208}
              height={208}
              className="border-card relative size-52 rounded-full border-4 object-cover"
            />
          </div>
        </div>
        <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-[18px] text-lg leading-[1.7] text-pretty">
          <p>
            I make software that people actually want to use, not the kind that
            makes them want to pull their hair out. I work mostly in TypeScript
            with Next.js, React, and Angular, and lately I&apos;ve been wiring
            AI agents into real products. Right now I&apos;m leading engineering
            at <Company>Centauri Health Solutions</Company>. Before that I had
            great runs at <Company>Sudorandom Labs</Company>,{" "}
            <Company>Insight Enterprises</Company>, and{" "}
            <Company>Responsive Data</Company>.
          </p>
          <p>
            When I&apos;m not in the editor, I&apos;m usually scaling actual
            peaks instead of UI ones: rock climbing, tinkering with generative
            AI, baking bread, or hanging out with my son.
          </p>
          <ul className="mt-2 flex flex-wrap gap-2" aria-label="Interests">
            {INTERESTS.map((interest) => (
              <li key={interest}>
                <Badge variant="secondary">{interest}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
