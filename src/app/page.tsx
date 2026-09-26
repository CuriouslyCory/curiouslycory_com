import { Suspense } from "react";
import { type Metadata } from "next";

import { About } from "~/components/home/about";
import { ContactCta } from "~/components/home/contact-cta";
import {
  FeaturedProjects,
  FeaturedProjectsSkeleton,
} from "~/components/home/featured-projects";
import { Hero } from "~/components/home/hero";
import {
  LatestPosts,
  LatestPostsSkeleton,
} from "~/components/home/latest-posts";
import { StayInOrbit } from "~/components/home/stay-in-orbit";

// Projects and posts are read from the DB per request (same as /projects)
export const dynamic = "force-dynamic";

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
      <Hero />
      {/* DB-backed sections stream in behind the static hero */}
      <Suspense fallback={<FeaturedProjectsSkeleton />}>
        <FeaturedProjects />
      </Suspense>
      <Suspense fallback={<LatestPostsSkeleton />}>
        <LatestPosts />
      </Suspense>
      <About />
      <StayInOrbit />
      <ContactCta />
    </>
  );
}
