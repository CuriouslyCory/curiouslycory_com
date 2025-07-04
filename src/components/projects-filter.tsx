"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  tags: string[];
  url: string | null;
  githubUrl: string | null;
  category: string;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  authorId: string;
  author: {
    name: string | null;
    image: string | null;
  };
};

type ProjectsFilterProps = {
  projects: Project[];
  tags: string[];
};

/**
 * Client component for filtering and displaying projects with tag-based filtering
 * Uses a combobox for tag selection and displays filtered project cards
 */
export function ProjectsFilter({ projects, tags }: ProjectsFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Filter projects based on selected tag
  const filteredProjects = selectedTag
    ? projects.filter((project) => project.tags.includes(selectedTag))
    : projects;

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filter by tag:</span>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {selectedTag || "All Projects"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search tags..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No tag found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      value=""
                      onSelect={() => {
                        setSelectedTag("");
                        setOpen(false);
                      }}
                    >
                      All Projects
                      <Check
                        className={cn(
                          "ml-auto",
                          selectedTag === "" ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                    {tags.map((tag) => (
                      <CommandItem
                        key={tag}
                        value={tag}
                        onSelect={(currentValue) => {
                          setSelectedTag(
                            currentValue === selectedTag ? "" : currentValue,
                          );
                          setOpen(false);
                        }}
                      >
                        {tag}
                        <Check
                          className={cn(
                            "ml-auto",
                            selectedTag === tag ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        {selectedTag && (
          <div className="text-muted-foreground text-sm">
            Showing {filteredProjects.length} project
            {filteredProjects.length !== 1 ? "s" : ""} with &quot;
            {selectedTag}&quot;
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="bg-card border-border hover:border-primary/50 overflow-hidden border transition-all duration-300"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={`/images/projects/${project.image ?? "/placeholder.svg"}`}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-bold">
                {project.title}
              </CardTitle>
              <CardDescription className="mt-2 line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className={cn(
                      "bg-secondary/30 cursor-pointer transition-colors",
                      selectedTag === tag && "bg-primary/20 border-primary/50",
                    )}
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge variant="secondary" className="bg-secondary/30">
                    +{project.tags.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-6 pt-0">
              {project.githubUrl && (
                <Button asChild variant="outline" size="sm">
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Link>
                </Button>
              )}
              {project.url && (
                <Button asChild size="sm">
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Project
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground text-lg">
            No projects found with the tag &quot;{selectedTag}&quot;.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setSelectedTag("")}
          >
            Show all projects
          </Button>
        </div>
      )}
    </>
  );
}
