import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const metadata: Metadata = {
  title: "Projects | CuriouslyCory",
  description: "Explore my web development projects and applications",
};

// This would typically come from your data folder or a CMS
const projects = [
  {
    id: 1,
    title: "AI-Powered Telegram Bot",
    description:
      "A Telegram bot that leverages Google's Gemini LLM for intelligent conversations and tool-based capabilities.",
    image: "/placeholder.svg?height=300&width=600",
    tags: ["Next.js", "TypeScript", "Gemini", "Telegram API", "Fastify"],
    demoUrl: "https://telegram-bot.example.com",
    githubUrl: "https://github.com/username/telegram-bot",
    category: "ai",
    featured: true,
  },
  {
    id: 2,
    title: "Number Munchers Game",
    description:
      "A modern web remake of the classic educational math game to help children improve their math skills.",
    image: "/placeholder.svg?height=300&width=600",
    tags: ["React", "TypeScript", "Game Development", "Education"],
    demoUrl: "https://number-munchers.example.com",
    githubUrl: "https://github.com/username/number-munchers",
    category: "games",
    featured: true,
  },
  {
    id: 3,
    title: "Custom Blog Platform",
    description:
      "A fully customizable blog platform with database features, markdown support, and a clean UI.",
    image: "/placeholder.svg?height=300&width=600",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    demoUrl: "https://blog-platform.example.com",
    githubUrl: "https://github.com/username/blog-platform",
    category: "web",
    featured: true,
  },
  {
    id: 4,
    title: "NFT Marketplace",
    description:
      "A decentralized marketplace for creating, buying, and selling NFTs with wallet integration.",
    image: "/placeholder.svg?height=300&width=600",
    tags: ["React", "Solidity", "Ethers.js", "Hardhat", "IPFS"],
    demoUrl: "https://nft-marketplace.example.com",
    githubUrl: "https://github.com/username/nft-marketplace",
    category: "blockchain",
    featured: false,
  },
  {
    id: 5,
    title: "Developer Portfolio Template",
    description:
      "A customizable portfolio template for developers to showcase their work and skills.",
    image: "/placeholder.svg?height=300&width=600",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://portfolio-template.example.com",
    githubUrl: "https://github.com/username/portfolio-template",
    category: "web",
    featured: false,
  },
  {
    id: 6,
    title: "Real-time Chat Application",
    description:
      "A real-time chat application with rooms, direct messaging, and file sharing capabilities.",
    image: "/placeholder.svg?height=300&width=600",
    tags: ["Next.js", "TypeScript", "Socket.io", "Prisma", "PostgreSQL"],
    demoUrl: "https://chat-app.example.com",
    githubUrl: "https://github.com/username/chat-app",
    category: "web",
    featured: false,
  },
];

export default function ProjectsPage() {
  const categories = [
    { id: "all", name: "All Projects" },
    { id: "featured", name: "Featured" },
    { id: "web", name: "Web Apps" },
    { id: "ai", name: "AI Projects" },
    { id: "blockchain", name: "Blockchain" },
    { id: "games", name: "Games" },
  ];

  return (
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

        <Tabs defaultValue="all" className="w-full">
          <div className="mb-6 flex items-center justify-between">
            <TabsList className="bg-background border">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects
                  .filter((project) =>
                    category.id === "all"
                      ? true
                      : category.id === "featured"
                        ? project.featured
                        : project.category === category.id,
                  )
                  .map((project) => (
                    <Card
                      key={project.id}
                      className="bg-card border-border hover:border-primary/50 overflow-hidden border transition-all duration-300"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
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
                              className="bg-secondary/30"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 3 && (
                            <Badge
                              variant="secondary"
                              className="bg-secondary/30"
                            >
                              +{project.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between p-6 pt-0">
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
                        <Button asChild size="sm">
                          <Link
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Demo
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

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
              <div className="relative h-64 w-64">
                <Image
                  src="/placeholder.svg?height=256&width=256"
                  alt="Collaboration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
