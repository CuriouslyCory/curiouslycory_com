import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { api, HydrateClient } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { ProjectsFilter } from "~/components/projects-filter";

export const metadata: Metadata = {
  title: "Projects | CuriouslyCory",
  description: "Explore my web development projects and applications",
};

export default async function ProjectsPage() {
  // Fetch projects and tags from the database using TRPC server component
  const [projects, tags] = await Promise.all([
    api.projects.getAll(),
    api.projects.getTags(),
  ]);

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center px-4 py-12 md:px-6 lg:px-8">
        <div className="w-full max-w-7xl space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              My Projects
            </h1>
            <p className="text-muted-foreground max-w-3xl text-xl">
              A collection of web applications, tools, and experiments I&apos;ve
              built using modern technologies.
            </p>
          </div>

          <ProjectsFilter projects={projects} tags={tags} />

          <div className="bg-card border-border rounded-xl border p-8 md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Have a project in mind?</h2>
                <p className="text-muted-foreground">
                  I&apos;m always open to discussing new projects and
                  opportunities. Let&apos;s collaborate and build something
                  amazing together.
                </p>
                <Button asChild className="mt-4">
                  <Link href="/contact">
                    Get in touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="hidden justify-end md:flex">
                <div className="relative h-64 w-64 overflow-hidden rounded-lg">
                  <Image
                    src="/images/collaboration-light.png?height=256&width=256"
                    alt="Collaboration"
                    fill
                    className="object-contain dark:hidden"
                  />
                  <Image
                    src="/images/collaboration-dark.png?height=256&width=256"
                    alt="Collaboration"
                    fill
                    className="hidden object-contain dark:block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
