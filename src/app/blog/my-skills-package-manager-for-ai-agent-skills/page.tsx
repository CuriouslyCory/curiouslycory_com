/*
---bm
title: Introducing my-skills — The Package Manager for AI Agent Skills
excerpt: A universal CLI and optional web dashboard for installing, managing, and sharing reusable skills across Claude Code, Cursor, Copilot, and 10+ AI coding agents.
coverImage: /images/blog/my-skills-package-manager-for-ai-agent-skills.jpg
publishedAt: 2026-03-19
featured: true
published: true
tags: ai,cli,developer-tools,open-source,typescript
---
*/

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import Link from "next/link";
import {
  FadeUp,
  StaggeredGrid,
  StaggeredItem,
  AgentChip,
  StepBadge,
  TerminalBlock,
  Herobadges,
  LiftCard,
} from "./animations";

export const metadata = {
  title: "Introducing my-skills — The Package Manager for AI Agent Skills",
  description:
    "A universal CLI and optional web dashboard for installing, managing, and sharing reusable skills across Claude Code, Cursor, Copilot, and 10+ AI coding agents.",
  openGraph: {
    images: [
      {
        url: "/images/blog/my-skills.webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Introducing my-skills — The Package Manager for AI Agent Skills",
    description:
      "A universal CLI and optional web dashboard for installing, managing, and sharing reusable skills across Claude Code, Cursor, Copilot, and 10+ AI coding agents.",
  },
};

export default async function MySkillsPost() {
  return (
    <div className="mx-auto max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="animate-fade-in from-primary to-secondary mb-6 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent">
          Introducing my-skills
        </h1>
        <p className="text-muted-foreground mb-8 text-xl">
          The package manager for AI agent skills — install, manage, and share
          reusable skills across every AI coding agent you use
        </p>
        <Herobadges
          badges={[
            "TypeScript",
            "Commander.js",
            "Next.js",
            "Drizzle ORM",
            "SQLite",
            "tRPC",
          ]}
        />
      </div>

      {/* Main Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {/* Introduction */}
        <FadeUp>
          <div className="mb-12">
            <p className="text-xl leading-relaxed">
              If you use AI coding agents, you&apos;ve probably built up a
              collection of skills — markdown files that give your agent
              superpowers for specific tasks like code review, PR creation, or
              feature development. But managing those skills is a mess. They live
              in scattered directories, you copy-paste them between projects, and
              sharing them with your team means committing files to every repo.
            </p>

            <p>
              I built <strong>my-skills</strong> to fix this. It&apos;s a single
              CLI that installs skills from any Git repository using a simple{" "}
              <code>owner/repo</code> shorthand, keeps them updated via
              content hashing, and works across 10+ AI coding agents — from
              Claude Code and Cursor to Copilot and Gemini CLI. Think of it
              as <code>npm</code> for AI agent skills.
            </p>
          </div>
        </FadeUp>

        <div className="border-border my-8 border-t" />

        {/* The Problem */}
        <FadeUp>
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold">
              The Problem with AI Skills Today
            </h2>

            <StaggeredGrid className="mb-8 grid gap-6 md:grid-cols-2">
              <StaggeredItem>
                <LiftCard>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Developer Pain Points
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li>
                          • Skills scattered across projects with no central
                          management
                        </li>
                        <li>
                          • Copy-pasting skill files between repos and machines
                        </li>
                        <li>
                          • No easy way to discover or share skills with
                          teammates
                        </li>
                        <li>
                          • Manual updates when skill authors improve their
                          prompts
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </LiftCard>
              </StaggeredItem>

              <StaggeredItem>
                <LiftCard>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        What&apos;s Missing Today
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li>
                          • A universal tool that works across all AI coding
                          agents
                        </li>
                        <li>
                          • Version tracking and integrity verification for
                          skills
                        </li>
                        <li>
                          • A manifest file that makes skill setups reproducible
                        </li>
                        <li>
                          • A visual interface for browsing and organizing skills
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </LiftCard>
              </StaggeredItem>
            </StaggeredGrid>
          </section>
        </FadeUp>

        <Separator className="my-8" />

        {/* How to Use my-skills */}
        <section className="mb-12">
          <FadeUp>
            <h2 className="mb-6 text-3xl font-bold">
              How to Use my-skills
            </h2>

            <p className="mb-8">
              my-skills is designed to meet you where you are. Start with the
              CLI for instant skill management, use the web dashboard for a
              visual workflow, or share skills across your team with Git repos
              and favorites.
            </p>
          </FadeUp>

          {/* CLI Only */}
          <FadeUp>
            <LiftCard className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <StepBadge step={1} />
                    CLI-Only — Drop-In Skill Management
                  </CardTitle>
                  <CardDescription>
                    Zero config, no database, works offline
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Install globally and start adding skills immediately.
                    my-skills tracks everything in a{" "}
                    <code>.my-skills.json</code> manifest file at the root of
                    your project — just like <code>package.json</code> tracks
                    your dependencies.
                  </p>
                  <TerminalBlock>
                    {`# Install globally
npm install -g my-skills

# Add a skill using owner/repo shorthand
ms add curiouslycory/my-skills/code-review

# Add all skills from a repo
ms add curiouslycory/my-skills --all

# Save a repo as a favorite for quick access
ms favorite add curiouslycory/my-skills

# Search installed + favorited skills
ms find "pr review"

# List installed skills
ms list

# Update all skills to latest versions
ms update

# Check for available updates without installing
ms check`}
                  </TerminalBlock>
                  <div className="space-y-2">
                    <div>
                      <strong>Best for:</strong> Solo developers who want fast,
                      no-friction skill management from the terminal
                    </div>
                    <div>
                      <strong>What you get:</strong> Git-based skill
                      installation via <code>owner/repo</code> shorthand,
                      SHA-256 content hashing for integrity, a lockfile-style
                      manifest, favorite repos for fast discovery, and
                      automatic agent detection
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LiftCard>
          </FadeUp>

          {/* Local WebUI */}
          <FadeUp delay={0.1}>
            <LiftCard className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <StepBadge step={2} />
                    Local WebUI — Visual Skill Management
                  </CardTitle>
                  <CardDescription>
                    SQLite-backed dashboard for browsing, favorites, and
                    compositions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Want more than a terminal? The local web dashboard gives you
                    a visual interface backed by a SQLite database on your
                    machine. Browse skill repositories, save favorites, edit
                    artifacts, and build compositions — all from your browser.
                  </p>
                  <div className="mb-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-semibold">Skill Discovery</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Search and browse skill repositories</li>
                        <li>• Preview skill content before installing</li>
                        <li>• Save favorites for quick access</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold">
                        Artifact Management
                      </h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Create and edit skills, agents, and prompts</li>
                        <li>• Organize by category</li>
                        <li>• Build compositions from multiple skills</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <strong>Best for:</strong> Developers who prefer a visual
                      workflow for organizing and curating their skill library
                    </div>
                    <div>
                      <strong>What you get:</strong> Everything from CLI mode
                      plus a full Next.js dashboard, SQLite persistence,
                      favorites, and a composition builder
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LiftCard>
          </FadeUp>

          {/* Sharing & Collaboration */}
          <FadeUp delay={0.2}>
            <LiftCard className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <StepBadge step={3} />
                    Share Skills via Git — Team Collaboration
                  </CardTitle>
                  <CardDescription>
                    Publish skills to any Git repo, share with favorites, and
                    keep teams in sync
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Skills live in Git repositories — just create a repo with{" "}
                    <code>SKILL.md</code> files and your whole team can install
                    from it. Scaffold new skills with <code>ms init</code>,
                    configure favorite repos so teammates don&apos;t need to
                    remember URLs, and let <code>ms update</code> keep everyone
                    on the latest version.
                  </p>
                  <TerminalBlock>
                    {`# Scaffold a new skill in your repo
ms init

# Your team installs from your shared repo
ms add myorg/our-skills/code-review

# Save it as a favorite so the whole team has quick access
ms favorite add myorg/our-skills

# Now anyone can discover and install from favorites
ms find "review"

# Commit .my-skills.json — teammates restore with one command
ms add`}
                  </TerminalBlock>
                  <div className="space-y-2">
                    <div>
                      <strong>Best for:</strong> Teams that want to standardize
                      on a shared set of AI skills and keep everyone in sync
                    </div>
                    <div>
                      <strong>What you get:</strong> Git-native skill sharing,
                      the <code>ms init</code> scaffolder for authoring new
                      skills, favorite repos for frictionless discovery, and a
                      manifest file that makes skill setups fully reproducible
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LiftCard>
          </FadeUp>
        </section>

        <Separator className="my-8" />

        {/* Universal Agent Support */}
        <FadeUp>
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold">
              Works with Every AI Coding Agent
            </h2>

            <p className="mb-6">
              my-skills uses a pluggable adapter system to install skills in the
              right format for each agent. When you run <code>ms add</code>, it
              detects which agents you have configured and installs the skill
              files where each agent expects to find them.
            </p>

            <StaggeredGrid className="not-prose mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {[
                "Claude Code",
                "Cursor",
                "Cline",
                "GitHub Copilot",
                "Codex",
                "Gemini CLI",
                "Warp",
                "Amp",
                "OpenCode",
                "Kimi Code",
              ].map((agent) => (
                <AgentChip key={agent} name={agent} />
              ))}
            </StaggeredGrid>

            <LiftCard>
              <Card>
                <CardHeader>
                  <CardTitle>The Adapter Architecture</CardTitle>
                  <CardDescription>
                    One install command, every agent gets the right format
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TerminalBlock>
                    {`# Skills are installed to .agents/skills/ and deployed
# to each agent's expected location automatically

ms add curiouslycory/my-skills/code-review
# → Claude Code: .claude/skills/code-review/ (symlink)
# → Cursor: .cursor/skills/code-review/ (symlink)
# → Copilot: .github/copilot-instructions.md (injected section)
# → Gemini: .gemini/skills/code-review/ (symlink)
# → ...and 6 more agents`}
                  </TerminalBlock>
                </CardContent>
              </Card>
            </LiftCard>
          </section>
        </FadeUp>

        <Separator className="my-8" />

        {/* Getting Started */}
        <FadeUp>
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold">
              Get Started in 30 Seconds
            </h2>

            <LiftCard className="mb-8">
              <Card>
                <CardContent className="pt-6">
                  <TerminalBlock>
                    {`# Install
npm install -g my-skills

# Add your first skill from a GitHub repo
ms add curiouslycory/my-skills/code-review

# See what's installed
ms list

# Save a repo as a favorite for easy discovery
ms favorite add curiouslycory/my-skills

# Search installed + favorited skills
ms find "feature development"

# Keep everything up to date
ms update`}
                  </TerminalBlock>
                </CardContent>
              </Card>
            </LiftCard>

            <p>
              The <code>.my-skills.json</code> manifest file tracks every
              installed skill with its source repository, content hash, and
              installation timestamp. Commit it to your repo and your teammates
              can reproduce your exact skill setup with a single command.
            </p>
          </section>
        </FadeUp>

        <Separator className="my-8" />

        {/* CTA */}
        <FadeUp>
          <section className="mb-12">
            <div className="text-center">
              <p className="mb-6 text-lg">
                my-skills is open source, MIT licensed, and ready to use today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link
                    href="https://github.com/CuriouslyCory/my-skills"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link
                    href="https://www.npmjs.com/package/my-skills"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on npm
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </FadeUp>
      </div>
    </div>
  );
}
