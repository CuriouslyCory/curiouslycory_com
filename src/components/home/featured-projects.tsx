import Image from "next/image";
import Link from "next/link";
import { unstable_rethrow } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { SectionHeading } from "~/components/home/section-heading";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { formatMonth } from "~/lib/date-utils";
import { api } from "~/trpc/server";

const PROJECT_COUNT = 4;
const MAX_TAGS = 4;

/** Words that should keep their acronym casing in a category label */
const ACRONYMS = new Set(["ai", "api", "cli", "ui"]);

/** "developer-tools" → "Developer tools", "ai-tools" → "AI tools" */
function categoryLabel(category: string): string {
  return category
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word, i) => {
      if (ACRONYMS.has(word.toLowerCase())) return word.toUpperCase();
      return i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    })
    .join(" ");
}

function ProjectsGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-6 md:grid-cols-2">{children}</div>;
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-8 pt-14 pb-24">
      <SectionHeading
        title="Featured Missions"
        subtitle="Recent launches, from dev tools to AI side quests."
        action={{ label: "Explore all projects", href: "/projects" }}
        className="mb-10"
      />
      {children}
    </section>
  );
}

export async function FeaturedProjects() {
  let projects;
  try {
    projects = await api.projects.getShowcase({ limit: PROJECT_COUNT });
  } catch (error) {
    // Let Next's own control-flow errors (dynamic bailout, redirects) through
    unstable_rethrow(error);
    // Degrade to hiding the section rather than taking down the homepage.
    console.error("Failed to load featured projects", error);
    return null;
  }
  if (projects.length === 0) return null;

  return (
    <Section>
      <ProjectsGrid>
        {projects.map((project) => {
          const launched = project.publishedAt ?? project.createdAt;
          const extraTags = project.tags.length - MAX_TAGS;
          return (
            <div
              key={project.id}
              className="h-full transition-transform duration-250 ease-out hover:-translate-y-1"
            >
              <Card className="h-full gap-5 overflow-hidden pt-0">
                <div className="bg-muted relative aspect-video overflow-hidden border-b">
                  {project.image && (
                    <Image
                      src={`/images/projects/${project.image}`}
                      alt=""
                      fill
                      sizes="(min-width: 1152px) 532px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <CardHeader className="gap-0">
                  <p className="text-muted-foreground mb-1.5 font-mono text-xs">
                    Launched {formatMonth(launched)} ·{" "}
                    {categoryLabel(project.category)}
                  </p>
                  <h3 className="font-oswald text-[22px] leading-[1.2] font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-[15px] leading-[1.55] text-pretty">
                    {project.description}
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul
                    className="flex flex-wrap gap-1.5"
                    aria-label="Tech stack"
                  >
                    {project.tags.slice(0, MAX_TAGS).map((tag) => (
                      <li key={tag}>
                        <Badge variant="outline">{tag}</Badge>
                      </li>
                    ))}
                    {extraTags > 0 && (
                      <li>
                        <Badge
                          variant="outline"
                          className="text-muted-foreground"
                          title={project.tags.slice(MAX_TAGS).join(", ")}
                        >
                          +{extraTags} more
                        </Badge>
                      </li>
                    )}
                  </ul>
                </CardContent>
                {(project.url ?? project.githubUrl) && (
                  <CardFooter className="gap-2">
                    {project.url && (
                      <Button asChild size="sm">
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Launch ${project.title}`}
                        >
                          <ExternalLink aria-hidden="true" />
                          Launch
                        </Link>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button asChild size="sm" variant="ghost">
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} source on GitHub`}
                        >
                          <FaGithub aria-hidden="true" />
                          Source
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                )}
              </Card>
            </div>
          );
        })}
      </ProjectsGrid>
    </Section>
  );
}

export function FeaturedProjectsSkeleton() {
  return (
    <Section>
      <ProjectsGrid>
        {Array.from({ length: PROJECT_COUNT }, (_, i) => (
          <Card key={i} className="gap-5 overflow-hidden pt-0">
            <Skeleton className="aspect-video rounded-none" />
            <div className="space-y-3 px-6">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-16 w-full" />
            </div>
          </Card>
        ))}
      </ProjectsGrid>
    </Section>
  );
}
