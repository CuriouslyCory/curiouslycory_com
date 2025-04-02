/* 
---bm
title: Hello World - My First (new) Blog Post
excerpt: Just saying hi!
coverImage: /images/blog/hello-world.png
publishedAt: 2025-04-02
featured: true
published: true
tags: nextjs,typescript,tutorial
---
*/

import Image from "next/image";

export default async function HelloWorldPost() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-12 text-center">
        <Image
          src="/images/blog/hello-world.png"
          alt="Hello World"
          width={1000}
          height={1000}
          className="flex-1"
        />

        <p className="text-muted-foreground mt-4 text-xl">
          I&apos;m CuriouslyCory, a software developer with a passion for
          building products that reduce friction in people&apos;s lives.
        </p>
      </div>
    </div>
  );
}
