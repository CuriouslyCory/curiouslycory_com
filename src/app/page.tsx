import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Curiosity Unleashed</h1>
        <p className="mb-6 text-xl">
          Hi, I&apos;m CuriouslyCory. I like to build things.
        </p>
        <Image
          src="/images/headshot.webp"
          alt="Your Name"
          width={200}
          height={200}
          className="mx-auto mb-6 rounded-full"
        />
        <Button asChild>
          <a href="/contact">Get in Touch</a>
        </Button>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Cory is a renegade in the world of code, a digital craftsman
              who&apos;s built web applications for everyone from Fortune 100
              powerhouses to scrappy two-person teams. His crowning achievement?
              A wild venture into the uncharted waters of blockchain with
              &quot;sudoswap.xyz,&quot; an NFT marketplace that turned heads and
              ruffled feathers. Comfortable with Typescript and frameworks like
              NextJs, React, and Angular, Cory&apos;s toolkit extends far beyond
              the usual suspects—he&apos;s also dabbled in Golang, Python, PHP,
              and the ever-complex ServiceNow. When faced with a technical
              nightmare, his first instinct might be to metaphorically smash his
              head against the wall, but soon enough he&apos;s diving into deep
              research, stitching together the best solutions like a mad
              scientist. His obsession with tech started in the fourth grade
              when a clunky Apple IIe whispered promises of a world he
              couldn&apos;t resist. Off the clock, he scales rock walls, tinkers
              with 3D printers, and tackles creative projects like he&apos;s got
              something to prove. And if you think sourdough is just another
              quarantine cliché, Cory was perfecting his loaf game long before
              lockdowns made it cool.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
