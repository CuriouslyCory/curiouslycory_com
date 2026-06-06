/*
---bm
title: Introducing Infinite Docs - Document Your Architecture as an Infinitely-Nestable Graph
excerpt: A drag-and-drop tool for documenting software architecture as an infinitely-nestable graph - alive as the system evolves, and readable and maintainable by AI agents over an authenticated MCP server.
coverImage: /images/blog/infinite-docs.png
publishedAt: 2026-06-05
published: true
featured: false
tags: nextjs,typescript,trpc,mcp,ai-agents,software-architecture
---
*/

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title:
    "Introducing Infinite Docs: Document Your Architecture as an Infinitely-Nestable Graph",
  description:
    "A drag-and-drop tool for documenting software architecture as an infinitely-nestable graph - alive as the system evolves, and readable and maintainable by AI agents over an authenticated MCP server.",
  openGraph: {
    images: [
      {
        url: "/images/blog/infinite-docs.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Introducing Infinite Docs",
    description:
      "Document your software architecture as an infinitely-nestable graph - alive as the system evolves, and maintainable by AI agents over MCP.",
    images: ["/images/blog/infinite-docs.png"],
  },
};

export default async function IntroducingInfiniteDocsPost() {
  return (
    <div className="mx-auto max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="animate-fade-in from-primary to-secondary mb-6 bg-gradient-to-r bg-clip-text font-serif text-5xl font-bold text-transparent">
          Introducing Infinite Docs
        </h1>
        <p className="text-muted-foreground mb-8 text-xl">
          Document your software architecture as an infinitely-nestable graph
          &mdash; one that stays alive as the system evolves, and that AI agents
          can read and maintain alongside you.
        </p>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">Next.js 16</Badge>
          <Badge variant="secondary">tRPC</Badge>
          <Badge variant="secondary">React Flow</Badge>
          <Badge variant="secondary">MCP</Badge>
          <Badge variant="secondary">PostgreSQL</Badge>
          <Badge variant="secondary">AI Agents</Badge>
        </div>
      </div>

      {/* Cover */}
      <Image
        src="/images/blog/infinite-docs.png"
        alt="The top-level canvas of an Infinite Docs project: Web Client and an AI Agent (MCP client) connecting through Vercel Edge to Discord OAuth and Neon Postgres."
        width={1680}
        height={1050}
        className="border-border mb-12 rounded-lg border shadow-md"
        priority
      />

      {/* Main Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-xl leading-relaxed">
            Every architecture diagram starts as a lie waiting to happen. You
            open a drawing tool, lay out the boxes and arrows, feel briefly
            organized &mdash; and then the system changes. A service moves, a
            queue appears, a database splits in two, and the diagram quietly
            rots in a wiki nobody opens. Six months later it&apos;s actively
            misleading.
          </p>

          <p>
            I built <strong>Infinite Docs</strong> because I was tired of that
            trade-off. It&apos;s a drag-and-drop tool for documenting software
            architecture as an <strong>infinitely-nestable graph</strong>: you
            place <strong>Components</strong> on a <strong>Canvas</strong> and
            link them with <strong>Connections</strong>. Opening a Component
            descends into <em>its own</em> interior Canvas, recursing to any
            depth &mdash; from top-level infrastructure (hosts, databases,
            external APIs) all the way down to internal services, modules, or a
            single database table. It&apos;s one place to model a system at any
            depth, keep it alive as the system evolves, and hand it to both
            people and agents as a first-class artifact.
          </p>

          <p>
            The cover image above isn&apos;t a mockup &mdash; it&apos;s Infinite
            Docs documenting <em>itself</em>, exported live from the running app.
          </p>
        </div>

        <div className="border-border my-8 border-t" />

        {/* The Problem */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">The False Choice</h2>

          <p className="mb-6">
            Existing tools force a choice no one should have to make. You can
            have the picture or you can have the detail, but not both &mdash; and
            neither talks to an LLM.
          </p>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Static diagrams (Visio, Lucid, draw.io)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Rot the moment the system changes</li>
                  <li>• Can&apos;t be drilled into &mdash; a box is just a box</li>
                  <li>• Carry no real documentation</li>
                  <li>• Don&apos;t feed cleanly into an LLM</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Text docs &amp; wikis (Notion, Confluence)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Capture detail but lose the spatial picture</li>
                  <li>
                    • You can&apos;t <em>see</em> how infra, services, and data
                    connect
                  </li>
                  <li>• Drift out of sync with no visible signal</li>
                  <li>• No way for an agent to maintain them as it works</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p>
            Infinite Docs collapses that choice. The spatial graph and the
            written detail live in the same artifact, and that artifact is built
            from the ground up to be read &mdash; and written &mdash; by AI
            agents.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Core Model */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            The Core Model: Components, Connections, and Descent
          </h2>

          <p className="mb-6">
            You work on a Canvas. You add Components from a searchable,
            affinity-ranked palette of 26 kinds &mdash; everything from a generic
            box down to a host, a database, a service, a function, or a single
            table. You drag them around, rename them inline, and draw Connections
            between them. Every Component carries its own markdown documentation,
            edited in a WYSIWYG editor that autosaves as you type.
          </p>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>A vocabulary on purpose</CardTitle>
                <CardDescription>
                  Human-facing words, data-model names
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <strong>Component</strong> &mdash; the unit you place, name,
                  document, and open
                </div>
                <div>
                  <strong>Connection</strong> &mdash; a typed link between two
                  Components
                </div>
                <div>
                  <strong>Canvas</strong> &mdash; the Components and Connections
                  under one parent
                </div>
                <div>
                  <strong>Descent</strong> &mdash; opening a Component to enter
                  its interior Canvas
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Derived, never stored</CardTitle>
                <CardDescription>
                  The thing you look at is always computed fresh
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-0">
                  A Canvas is a <em>derived</em> view &mdash; it&apos;s never
                  saved as a file. The graph stores only Components and their
                  Connections; every Canvas, breadcrumb, and boundary view is
                  computed at read time. There is no separate diagram to fall out
                  of sync, because there is no separate diagram.
                </p>
              </CardContent>
            </Card>
          </div>

          <p>
            That last point is the quiet superpower. When the only durable thing
            is the graph itself, &ldquo;the diagram is out of date&rdquo; stops
            being a category of problem.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Descent + Boundary Proxies */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Descend to Any Depth &mdash; Without Losing Context
          </h2>

          <p className="mb-6">
            Double-click a Component and you descend into its interior Canvas.
            The breadcrumb trail tracks exactly where you are, and you can keep
            going &mdash; infrastructure, to the app inside it, to the modules
            inside that, to a single table &mdash; as deep as the system goes.
          </p>

          <p className="mb-6">
            The hard part of nested diagrams has always been{" "}
            <strong>context loss</strong>: the moment you drill into a box, you
            lose sight of what it talks to on the outside. Infinite Docs solves
            this with <strong>boundary proxies</strong>. When a Connection
            crosses the edge of the Canvas you&apos;re looking at, the far end
            follows you inward as a read-only stand-in, so a dependency&apos;s
            other side stays visible without you ever leaving the scope
            you&apos;re documenting.
          </p>

          <Image
            src="/images/blog/infinite-docs-boundary-proxy.png"
            alt="Descended one level into the Vercel Edge component. The breadcrumb reads Infinite Docs 1.0 / Vercel Edge. Inside is a Next.js App component, and Neon Postgres reappears as a dashed read-only boundary proxy because the interior connects out to it."
            width={1680}
            height={1050}
            className="border-border my-8 rounded-lg border shadow-md"
          />

          <p>
            Here we&apos;ve descended into <strong>Vercel Edge</strong>. The
            breadcrumb shows the path; the solid <strong>Next.js App</strong>{" "}
            node has its own interior (note the descent badge); and{" "}
            <strong>Neon Postgres</strong> appears as a dashed, read-only{" "}
            <em>boundary proxy</em> &mdash; it lives a level up, but because the
            interior connects out to it, its far end rides along so you never
            lose the thread.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Built for agents */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Built for Agents, Not Just People
          </h2>

          <p className="mb-6">
            This is where Infinite Docs stops being &ldquo;a nicer diagram
            tool&rdquo; and becomes something new. The entire graph serializes to{" "}
            <strong>deterministic markdown</strong> &mdash; byte-stable output
            with stable <code>{"{#nodeId}"}</code> anchors &mdash; so an LLM can
            read your architecture as text and an agent can reference any
            Component by anchor. There&apos;s a &ldquo;Copy as markdown&rdquo;
            button right on the toolbar.
          </p>

          <p className="mb-6">
            Better still, an authenticated <strong>MCP server</strong> lets AI
            agents read <em>and maintain</em> the architecture as they work on
            the actual system it describes. You mint an API token on the{" "}
            <em>Connect an agent</em> page, paste one snippet, and your agent of
            choice &mdash; Claude Code, Codex, Cursor, and friends &mdash; is
            pointed at your graph.
          </p>

          <Image
            src="/images/blog/infinite-docs-connect-agent.png"
            alt="The Connect an agent page: generate an API token with an expiry, then pick a client (Claude Code, Codex CLI, Cursor, and more) to get a ready-to-paste MCP connection snippet."
            width={1680}
            height={724}
            className="border-border my-8 rounded-lg border shadow-md"
          />

          <p className="mb-6">
            Over that connection, agents get <strong>read resources</strong> and{" "}
            <strong>write tools</strong> over the same graph you edit by hand:
          </p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>The agent-facing surface</CardTitle>
              <CardDescription>
                Read the architecture, then change it &mdash; transactionally
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted mb-4 overflow-x-auto rounded-lg p-4">
                <code>{`# Read resources
architecture://index/{projectId}      # structural map: titles, kinds, anchors
architecture://project/{projectId}    # full graph with markdown docs
architecture://subtree/{projectId}/{nodeId}
architecture://trace/{traceId}

# Write tools
create_component / move_component / update_component_docs
create_connection / update_edge_interaction / delete_connection
apply_graph   # batch create/update components + connections in one call
apply_spec    # parse an OpenAPI or SQL-DDL spec and sync the graph`}</code>
              </pre>
              <div className="space-y-2">
                <div>
                  <strong>Same graph, same rules:</strong> agents see exactly
                  what you see, governed by exactly the same authorization.
                </div>
                <div>
                  <strong>Transactional:</strong> <code>apply_graph</code> lets
                  an agent construct or refactor a whole subtree in a single,
                  consistent call.
                </div>
                <div>
                  <strong>Discoverable:</strong> a live <code>llms.txt</code>{" "}
                  advertises the endpoint, auth, tools, and resources, and an
                  installable agent skill teaches the workflow.
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* Spec import + traces */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Spec Import &amp; Traces</h2>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Spec import that reconciles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-0">
                  Paste an <strong>OpenAPI</strong> or <strong>SQL-DDL</strong>{" "}
                  spec and Infinite Docs generates child Components and
                  materializes SQL foreign keys as Connections. Re-import the
                  updated spec later and it <em>reconciles</em> &mdash; new
                  tables appear, dropped ones disappear, changed ones refresh,
                  and the components you drew by hand are left untouched.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traces across layers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-0">
                  Define a couple of points on the graph and a named{" "}
                  <strong>Trace</strong> projects the path(s) between them across
                  every depth at once, auto-laid-out and read-only &mdash; ideal
                  for following a request flow or a dependency chain. Each Trace
                  is exportable as its own MCP resource.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Under the hood */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Under the Hood</h2>

          <p className="mb-6">
            Two front doors &mdash; a web app for people and an MCP server for
            agents &mdash; sound like two codebases worth of authorization bugs.
            They&apos;re not, because both are thin adapters over a{" "}
            <strong>single service layer</strong> with one signature:
          </p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>One deep module, two thin adapters</CardTitle>
              <CardDescription>
                The only home for business logic and authorization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted mb-4 overflow-x-auto rounded-lg p-4">
                <code>{`// Every piece of business logic lives here, and nowhere else:
(db, actor, input) => result

// tRPC adapter (web)        MCP adapter (agents)
//   resolve actor              resolve actor from API token
//   call the service     -->   call the SAME service
//   map errors to tRPC         map errors to MCP

// One authorization seam. A human and an agent that act
// as the same owner get identical reads, writes, and refusals.`}</code>
              </pre>
              <div className="space-y-2">
                <div>
                  <strong>No &ldquo;agent mode&rdquo;:</strong> there isn&apos;t a
                  second set of rules for AI to drift away from.
                </div>
                <div>
                  <strong>Testable by construction:</strong> the{" "}
                  <code>(db, actor, input)</code> seam is exercised by Vitest
                  against a real, isolated Postgres &mdash; no mocks, asserting
                  real behavior.
                </div>
              </div>
            </CardContent>
          </Card>

          <Image
            src="/images/blog/infinite-docs-architecture.png"
            alt="Three levels deep - Infinite Docs 1.0 / Vercel Edge / Next.js App - showing the tRPC API and MCP Server as sibling front doors alongside Web UI, NextAuth, and llms.txt, all connecting to Neon Postgres as a boundary proxy."
            width={1680}
            height={1050}
            className="border-border my-8 rounded-lg border shadow-md"
          />

          <p className="mb-6">
            Three levels into the dogfood graph above, you can see the shape of
            it: the <strong>tRPC API</strong> and the <strong>MCP Server</strong>{" "}
            sit side by side as front doors, with <code>llms.txt</code> and auth
            beside them, all resolving down to the same database. The picture the
            tool draws of itself <em>is</em> its architecture.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>The stack</CardTitle>
              <CardDescription>Modern, type-safe, T3 foundation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <strong>Next.js 16</strong> &mdash; App Router + RSC
                </div>
                <div>
                  <strong>tRPC v11</strong> &mdash; end-to-end type safety
                </div>
                <div>
                  <strong>Prisma 7</strong> &mdash; PostgreSQL
                </div>
                <div>
                  <strong>NextAuth v5</strong> &mdash; Discord OAuth
                </div>
                <div>
                  <strong>React Flow</strong> &mdash; the Canvas
                </div>
                <div>
                  <strong>Plate</strong> &mdash; the docs editor
                </div>
                <div>
                  <strong>mcp-handler</strong> &mdash; the agent-facing MCP server
                </div>
                <div>
                  <strong>Tailwind v4 + TypeScript</strong> &mdash; strict
                  throughout
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* What works today */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">What Works Today</h2>

          <p className="mb-6">
            Infinite Docs shipped its full initial roadmap &mdash; six milestones
            from the data model and service layer through nested canvases,
            markdown export, boundary proxies, the MCP server, and typed
            cross-scope connections &mdash; and has grown well past it since.
          </p>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Today you can</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Sign in, create, and open Projects</li>
                  <li>
                    • Add Components, drag, inline-rename, draw &amp; label
                    typed Connections
                  </li>
                  <li>• Descend into any Component with breadcrumb navigation</li>
                  <li>• Edit autosaving markdown docs on every Component</li>
                  <li>
                    • Export any Project or subtree as deterministic markdown
                  </li>
                  <li>• Delete with cascade and one-click undo</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Beyond the roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• A 26-kind taxonomy with an affinity-ranked palette</li>
                  <li>• Spec import (OpenAPI / SQL-DDL) with reconciliation</li>
                  <li>• Named Traces that project paths across layers</li>
                  <li>
                    • Batch MCP tools (<code>apply_graph</code>,{" "}
                    <code>apply_spec</code>)
                  </li>
                  <li>• Cross-project embedding and connections</li>
                  <li>• Capability-URL sharing and role-based invites</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p>
            Every edit is optimistic: it appears instantly and persists in the
            background, with rollback and a toast if anything fails. And the
            whole time, an agent can be reading and maintaining the same graph
            over MCP.
          </p>
        </section>

        <Separator className="my-8" />

        {/* CTA */}
        <section className="mb-12">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Why I think this matters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                We&apos;re heading into a world where agents do a growing share
                of the work on our systems &mdash; and an agent is only as good
                as its map of the territory. A rotting diagram in a wiki
                isn&apos;t a map an agent can use. A living, queryable,
                anchor-addressable graph is.
              </p>
              <p className="mb-0">
                Infinite Docs is my bet on what architecture documentation looks
                like when it has to serve people <em>and</em> agents equally
                well: spatial enough to understand at a glance, detailed enough
                to be true, and alive enough to stay that way.
              </p>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="mb-6 text-lg">
              Try it on your own architecture, or dig into how it&apos;s built.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link
                  href="https://infinite-docs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try Infinite Docs
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href="https://github.com/CuriouslyCory/infinite-docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
