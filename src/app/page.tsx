import Link from "next/link";
import { type Metadata } from "next";

import { Astronaut } from "~/components/astronaut";
import { Button } from "~/components/ui/button";

import { ChatBubble } from "~/components/ui/chat-bubble";
import { FavoriteTech } from "~/components/favorite-tech";
import { MyLinks } from "~/components/my-links";

export const metadata: Metadata = {
  title: "CuriouslyCory | Web Developer",
  description: "Hi, I'm CuriouslyCory, and I like to build things.",
  openGraph: {
    title: "CuriouslyCory | Web Developer",
    description: "Hi, I'm CuriouslyCory, and I like to build things.",
    url: "https://curiouslycory.com",
    siteName: "CuriouslyCory.com",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "CuriouslyCory - Web Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CuriouslyCory | Web Developer",
    description: "Hi, I'm CuriouslyCory, and I like to build things.",
    images: ["/images/og-image.png"], // Same image as OG
  },
};

export default function Home() {
  return (
    <>
      <section className="py-20 md:py-28">
        {/* Mobile hero: ChatBubble + centered Astronaut */}
        <div className="text-center md:hidden">
          <ChatBubble
            text="Hi, I'm CuriouslyCory, and I like to build things."
            direction="bottom"
            className="inline-block"
          />
          <div className="inline-block w-72 overflow-hidden align-top">
            <Astronaut className="translate-y-1" />
          </div>
        </div>

        {/* Desktop hero: asymmetric two-column */}
        <div className="mx-auto hidden max-w-6xl items-end justify-between px-4 md:flex md:px-6 lg:px-8">
          <div className="max-w-lg">
            <h1 className="font-oswald text-4xl font-bold tracking-tight">
              Hi, I&apos;m{" "}
              <span className="text-primary">CuriouslyCory</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              I like to build things that people actually want to use.
            </p>
            <div className="mt-8 flex gap-x-4">
              <Button asChild size="lg">
                <Link href="/cv">View My Resume</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/blog">Read My Blog</Link>
              </Button>
            </div>
          </div>
          <div className="w-72 flex-shrink-0">
            <Astronaut className="translate-y-1" />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <div className="md:grid md:grid-cols-[280px_1fr] md:gap-12">
          <div>
            <h2 className="font-oswald text-2xl font-semibold tracking-tight">
              A little about me
            </h2>
            <div className="heading-accent"></div>
          </div>
          <div className="mt-6 space-y-4 md:mt-0">
            <p className="text-lg leading-relaxed">
              My main goal is to make websites that people actually want to use,
              not ones that make them want to pull their hair out. Using
              TypeScript and modern frameworks like Next.js, React, and Angular,
              I&apos;ll create applications that work the way people want them
              to, no instructions needed. Currently, I&apos;m proudly part of
              the talented team at{" "}
              <a href="#" className="text-orange-500 hover:underline">
                Sudorandom Labs
              </a>
              , and I&apos;ve previously enjoyed roles at{" "}
              <a href="#" className="text-orange-500 hover:underline">
                Lighthouse Global
              </a>
              ,{" "}
              <a href="#" className="text-orange-500 hover:underline">
                Insight Enterprises
              </a>
              , and{" "}
              <a href="#" className="text-orange-500 hover:underline">
                Responsive Data
              </a>
              .
            </p>
            <p className="text-lg leading-relaxed">
              Beyond the code editor, you&apos;ll find me scaling the peaks of
              complex UI challenges or exploring innovative backend
              architectures. When not coding, I&apos;m usually rock climbing,
              tinkering with generative AI projects, baking bread, or spending
              time with my son.
            </p>
          </div>
        </div>
      </section>
      <section className="flex justify-center gap-x-4 py-16 md:hidden md:py-24">
        <Button asChild size="lg">
          <Link href="/cv">View My Resume</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/blog">Read My Blog</Link>
        </Button>
      </section>
      <section className="flex flex-col gap-y-24 py-16 md:py-24">
        <MyLinks />
      </section>
      <div className="w-full bg-surface-elevated py-16 md:py-24">
        <section className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <FavoriteTech />
        </section>
      </div>
    </>
  );
}
