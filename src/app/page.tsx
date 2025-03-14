import Link from "next/link";
import { Astronaut } from "~/components/astronaut";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ChatBubble } from "~/components/ui/chat-bubble";
import { SOCIALS } from "~/constants/socials";
import { ScrollText } from "lucide-react";
import { FavoriteTech } from "~/components/favorite-tech";
import { type Metadata } from "next";

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
        url: "/images/og-image.png", // You'll need to create this image
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
      <section className="mx-2 max-w-3xl md:mx-auto">
        <Card className="p-2 md:p-6">
          <CardHeader>
            <CardTitle className="h-underline text-center text-2xl font-bold md:text-left">
              A little about me
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              I&apos;m a coding enthusiast who loves building web applications
              for teams big and small. Currently working with an amazing team at{" "}
              <Link
                href="https://sudoswap.xyz"
                target="top"
                className="underline hover:text-blue-500"
              >
                Sudorandom Labs
              </Link>
              . Alumni of{" "}
              <Link
                href="https://lighthouseglobal.com"
                target="top"
                className="underline"
              >
                Lighthouse Global
              </Link>
              ,{" "}
              <Link
                href="https://www.insight.com/"
                target="top"
                className="underline"
              >
                Insight Enterprises
              </Link>
              , and{" "}
              <Link
                href="https://www.responsivedata.com/"
                target="top"
                className="underline"
              >
                Responsive Data
              </Link>{" "}
              development teams. I spend most of my development time in
              TypeScript and frameworks like Next.js, React, and Angular.
              I&apos;m also pretty handy with Golang, Python, PHP, and even
              tackled the complexities of ServiceNow.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me scaling rock walls,
              tinkering with 3D printers, or jumping into creative projects just
              for fun. Oh, and I was baking sourdough bread long before it
              became the cool thing to do during quarantine!
            </p>
          </CardContent>
        </Card>
      </section>
      <div className="mt-24 flex flex-col gap-y-24">
        <div className="mb-10 w-full bg-foreground pb-10 pt-8 text-background dark:bg-gray-100/10 dark:text-foreground">
          <section className="container mx-2 flex flex-col gap-y-4 md:mx-auto">
            <h2 className="mb-2 text-center text-3xl font-bold">My Links</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-6 lg:grid-cols-8">
              <Link href="/cv">
                <div className="flex flex-col items-center gap-2 transition-all hover:scale-105 hover:text-orange-500">
                  <ScrollText className="h-12 w-12" />
                  <span>Resume/CV</span>
                </div>
              </Link>
              {SOCIALS.map((link) => (
                <Link href={link.url} key={link.url} target="top">
                  <div className="flex flex-col items-center gap-2 transition-colors hover:scale-105 hover:text-orange-500">
                    <link.icon className="h-12 w-12" />
                    <span className="text-center">{link.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
        <section className="mx-2 max-w-3xl md:mx-auto">
          <FavoriteTech />
        </section>

        {/* <section>
        <BskyFeed />
      </section> */}
        {/* <BlogPostBats /> */}
        {/* <section className="mx-auto mt-20 px-2 md:px-6">
        <h2 className="mb-4 text-3xl font-bold">Links</h2>
        <div className="flex flex-wrap gap-6">
          {SOCIALS.map((link) => (
            <Card key={link.url} className="max-w-md">
              <CardHeader>
                <CardTitle>{link.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section> */}
      </div>
    </>
  );
}
