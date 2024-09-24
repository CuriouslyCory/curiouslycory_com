import Link from "next/link";
import { type Metadata } from "next";

import { Astronaut } from "~/components/astronaut";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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
      <section className="pt-10 text-center md:pt-16">
        <ChatBubble
          text="Hi, I'm CuriouslyCory, and I like to build things."
          direction="bottom"
          className="inline-block md:hidden"
        />
        <ChatBubble
          text="Hi, I'm CuriouslyCory, and I like to build things."
          direction="rightBottom"
          className="hidden md:inline-block"
        />

        <div className="inline-block w-72 overflow-hidden align-top">
          <Astronaut className="translate-y-1" />
        </div>
      </section>
      <section className="max-w-3xl px-2 md:mx-auto">
        <Card className="p-2 md:p-6">
          <CardHeader>
            <CardTitle className="mb-2 text-3xl font-bold">
              A little about me
              <div className="h-1 w-20 bg-orange-500"></div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              I&apos;m a code crafter who thrives on crafting smart, scalable
              solutions using TypeScript and modern frameworks like Next.js,
              React, and Angular. Currently, I&apos;m proudly part of the
              talented team at{" "}
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
            <p>
              Beyond the code editor, you&apos;ll find me scaling the peaks of
              complex UI challenges or exploring innovative backend
              architectures. When not coding, I&apos;m usually rock climbing,
              tinkering with generative AI projects, baking bread, or spending
              time with my son.
            </p>
          </CardContent>
        </Card>
      </section>
      <section className="mt-24 flex justify-center gap-x-4">
        <Link
          href="/cv"
          className="rounded-lg bg-orange-500 px-6 py-3 font-bold text-white transition-all hover:scale-105 hover:text-white"
        >
          View My Resume
        </Link>
        <Link
          href="/blog "
          className="rounded-lg border border-gray-300 px-6 py-3 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Read My Blog
        </Link>
      </section>
      <section className="mt-24 flex flex-col gap-y-24">
        <MyLinks />
      </section>
      <section className="mt-24 max-w-4xl px-2 md:mx-auto">
        <FavoriteTech />
      </section>
    </>
  );
}
