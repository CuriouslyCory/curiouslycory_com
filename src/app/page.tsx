import Link from "next/link";
import { Astronaut } from "~/components/astronaut";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ChatBubble } from "~/components/ui/chat-bubble";
import { SOCIALS } from "~/constants/socials";
import { Button } from "~/components/ui/button";
import { ScrollText } from "lucide-react";

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
            <CardTitle className="text-2xl font-bold">
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
                className="underline hover:text-blue-500"
              >
                Lighthouse Global
              </Link>
              ,{" "}
              <Link
                href="https://www.insight.com/"
                target="top"
                className="underline hover:text-blue-500"
              >
                Insight Enterprises
              </Link>
              , and{" "}
              <Link
                href="https://www.responsivedata.com/"
                target="top"
                className="underline hover:text-blue-500"
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
      <section className="mx-2 mt-16 max-w-3xl md:mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Want to know more?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Link href="/cv">
                <Button className="flex items-center gap-2">
                  <ScrollText /> Resume/CV
                </Button>
              </Link>
              {SOCIALS.map((link) => (
                <Link href={link.url} key={link.url}>
                  <Button className="flex items-center gap-2">
                    <link.icon /> {link.title}
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
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
    </>
  );
}
