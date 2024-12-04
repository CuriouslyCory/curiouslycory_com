import { Astronaut } from "~/components/astronaut";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ChatBubble } from "~/components/ui/chat-bubble";

export default function Home() {
  return (
    <>
      <section className="text-center">
        <ChatBubble
          text="Hi, I'm CuriouslyCory. I like to build things."
          direction="bottom"
          className="inline-block md:hidden"
        />
        <ChatBubble
          text="Hi, I'm CuriouslyCory. I like to build things."
          direction="rightBottom"
          className="hidden md:inline-block"
        />

        <div className="inline-block w-72 align-top">
          <Astronaut />
        </div>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              I&apos;m a coding enthusiast who loves building web applications
              for teams big and small. One of my most exciting adventures was
              diving into the blockchain with sudoswap.xyz, an NFT marketplace
              that made some waves. I&apos;m pretty handy with TypeScript and
              frameworks like Next.js, React, and Angular. I&apos;ve also tried
              my hand at Golang, Python, PHP, and even tackled the complexities
              of ServiceNow.
            </p>
            <p>
              When I bump into a tricky technical problem, I might scratch my
              head at first, but soon I&apos;m diving deep, piecing together
              solutions like a tech detective. My journey into technology
              started way back in fourth grade with a chunky Apple IIe that
              sparked my curiosity.
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
    </>
  );
}
