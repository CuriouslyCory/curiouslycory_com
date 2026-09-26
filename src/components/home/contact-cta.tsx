import Image from "next/image";
import Link from "next/link";
import { Download, Send } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

export function ContactCta() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="mx-auto max-w-6xl px-8 py-24"
    >
      <Card className="overflow-hidden py-0">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-8 p-10">
          <div className="flex flex-col gap-4">
            <h2
              id="contact-heading"
              className="font-oswald text-[clamp(30px,3vw,40px)] leading-[1.1] font-semibold tracking-tight"
            >
              Have a mission in mind?
            </h2>
            <p className="text-muted-foreground max-w-[460px] text-lg leading-relaxed">
              Whether it&apos;s a role, a contract, or a wild side project,
              I&apos;m always up for talking shop. Beam me a message and
              I&apos;ll get back to you.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact">
                  <Send aria-hidden="true" />
                  Send Transmission
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/cv">
                  <Download aria-hidden="true" />
                  Grab my CV
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative aspect-square w-full max-w-[280px]">
              <Image
                src="/images/collaboration-light.png"
                alt="Two astronauts collaborating"
                fill
                sizes="280px"
                className="object-contain dark:hidden"
              />
              <Image
                src="/images/collaboration-dark.png"
                alt="Two astronauts collaborating"
                fill
                sizes="280px"
                className="hidden object-contain dark:block"
              />
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
