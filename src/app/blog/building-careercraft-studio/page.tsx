import Image from "next/image";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { CodeBlock } from "~/components/ui/code-block";
import { Separator } from "~/components/ui/separator";
import {
  Sparkles,
  MessagesSquare,
  FileText,
  Target,
  Tags,
  ScanText,
  Link2,
  Waypoints,
  Database,
  PenLine,
  ScanSearch,
  Lightbulb,
  GitMerge,
  Check,
  CircleDashed,
  ShieldAlert,
  Mic,
  Info,
  ExternalLink,
  ArrowRight,
  Mail,
  type LucideIcon,
} from "lucide-react";

/*
---bm
title: "Building CareerCraft Studio: An AI Career Platform Built on Boring, Reliable Tools"
excerpt: "I built CareerCraft Studio to kill the spray-and-pray job hunt: a structured career profile that an AI agent team turns into tailored resumes, cover letters, and real compatibility analysis. Here's how it works — and the engineering decisions that made it buildable solo."
coverImage: /images/blog/careercraft-studio.webp
publishedAt: 2026-07-23
featured: true
published: true
tags: ai,langchain,langgraph,typescript,trpc,nextjs,pgvector,mcp,career-tech
---
*/

export const metadata = {
  title:
    "Building CareerCraft Studio: An AI Career Platform Built on Boring, Reliable Tools",
  description:
    "A developer's account of CareerCraft Studio: a LangGraph agent team, end-to-end type safety, pgvector skill matching, and an OAuth 2.1 MCP connector — the what, the why, and the high-level how.",
  openGraph: {
    images: [
      {
        url: "/images/blog/careercraft-studio.webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building CareerCraft Studio",
    description:
      "A LangGraph agent team, end-to-end type safety, pgvector skill matching, and an OAuth 2.1 MCP connector — the what, the why, and the high-level how.",
    images: ["/images/blog/careercraft-studio.webp"],
  },
};

/* ------------------------------------------------------------------ */
/* Small presentational sub-components (variety engine)               */
/* ------------------------------------------------------------------ */

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: MessagesSquare,
    title: "Conversational building",
    description:
      "Describe a job in a sentence and an agent turns it into structured work history — no forms required.",
  },
  {
    icon: FileText,
    title: "Tailored materials",
    description:
      "Resumes and cover letters generated for one specific posting, from a single structured profile.",
  },
  {
    icon: Target,
    title: "Real compatibility analysis",
    description:
      "See how your profile matches a posting, skill by skill — and where the genuine gaps are.",
  },
  {
    icon: ScanText,
    title: "Resume import",
    description:
      "Paste text or upload a PDF; it's parsed into the same normalized model everything else reads from.",
  },
  {
    icon: Tags,
    title: "Normalized skills",
    description:
      "Aliases resolve to one canonical skill, so matching a job is exact rather than fuzzy.",
  },
  {
    icon: Link2,
    title: "Save jobs from a URL",
    description:
      "Paste a posting's link and it's imported and analyzed server-side, safely.",
  },
];

function FeatureGrid() {
  return (
    <div className="my-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="bg-card hover:border-foreground/20 rounded-xl border p-5 shadow-xs transition-colors"
        >
          <div className="bg-muted text-foreground mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="mb-1 font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
}

type Specialist = {
  icon: LucideIcon;
  name: string;
  role: string;
};

const specialists: Specialist[] = [
  {
    icon: Database,
    name: "Data Manager",
    role: "Stores and retrieves profile data, parses pasted resumes, and merges duplicate achievements.",
  },
  {
    icon: FileText,
    name: "Resume Generator",
    role: "Produces resumes tailored to a specific posting.",
  },
  {
    icon: PenLine,
    name: "Cover Letter Generator",
    role: "Writes cover letters matched to the job at hand.",
  },
  {
    icon: ScanSearch,
    name: "Job Posting Manager",
    role: "Parses and stores postings, and compares their requirements against your skills.",
  },
  {
    icon: Lightbulb,
    name: "Profile Insights",
    role: "Answers questions about the data you've already stored.",
  },
];

function AgentDiagram() {
  return (
    <figure
      role="group"
      aria-label="A supervisor agent routing to five specialist agents"
      className="my-12"
    >
      <figcaption className="sr-only">
        A supervisor agent inspects each message and routes it to one of five
        specialists: Data Manager, Resume Generator, Cover Letter Generator, Job
        Posting Manager, and Profile Insights.
      </figcaption>

      {/* Supervisor node — the only gradient-ringed element in the diagram */}
      <div className="bg-card ring-primary/20 mx-auto max-w-sm rounded-xl border p-5 text-center shadow-xs ring-1">
        <div className="from-primary/15 to-secondary/15 mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br">
          <Waypoints className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="font-semibold">Supervisor</h3>
        <p className="text-muted-foreground text-sm">
          Reads intent, routes to one specialist
        </p>
      </div>

      {/* Central spine */}
      <div
        aria-hidden="true"
        className="mx-auto flex flex-col items-center py-2"
      >
        <div className="bg-border h-6 w-px" />
        <span className="text-muted-foreground font-mono text-xs">
          routes to ↓
        </span>
        <div className="bg-border h-6 w-px" />
      </div>

      {/* Specialist grid */}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {specialists.map(({ icon: Icon, name, role }) => (
          <li
            key={name}
            className="bg-card border-l-secondary/40 hover:border-foreground/20 rounded-xl border border-l-2 p-5 shadow-xs transition-colors"
          >
            <div className="bg-muted text-foreground mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {role}
            </p>
          </li>
        ))}
      </ul>
    </figure>
  );
}

function ConversationDemo() {
  return (
    <div className="bg-muted/40 my-12 space-y-4 rounded-xl border p-4 sm:p-6">
      {/* User message */}
      <div className="flex justify-end">
        <div className="bg-primary text-primary-foreground max-w-[85%] rounded-2xl rounded-br-sm px-4 py-2 text-sm">
          <span className="sr-only">You said: </span>
          Add my job at Tech Corp where I built React apps and led a team of 5.
        </div>
      </div>

      {/* Agent working label */}
      <div className="text-muted-foreground flex items-center gap-2 text-xs">
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Data Manager agent → extracted structured fields</span>
      </div>

      {/* Parsed result card */}
      <div className="bg-card rounded-xl border p-4">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
          <dt className="text-muted-foreground">Company</dt>
          <dd>Tech Corp</dd>
          <dt className="text-muted-foreground">Role</dt>
          <dd>Software Engineer</dd>
          <dt className="text-muted-foreground">Team size</dt>
          <dd>5</dd>
          <dt className="text-muted-foreground">Achievement</dt>
          <dd>Led a team of 5 building React applications</dd>
          <dt className="text-muted-foreground">Skills</dt>
          <dd className="flex flex-wrap gap-1">
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">Leadership</Badge>
          </dd>
        </dl>
      </div>
    </div>
  );
}

const skillMatches: { name: string; matched: boolean }[] = [
  { name: "TypeScript", matched: true },
  { name: "React", matched: true },
  { name: "PostgreSQL", matched: true },
  { name: "Kubernetes", matched: false },
];

function SkillConvergence() {
  return (
    <div className="my-12 space-y-8">
      {/* 5a — aliases converge to one canonical skill */}
      <figure aria-label="Three skill variants resolve to one canonical skill">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <div className="flex flex-col gap-2">
            {["React", "ReactJS", "React (hooks, context)"].map((s) => (
              <span
                key={s}
                className="bg-card text-muted-foreground rounded-full border px-3 py-1 text-center text-sm"
              >
                {s}
              </span>
            ))}
          </div>
          <GitMerge
            className="text-muted-foreground h-6 w-6 rotate-90 sm:rotate-0"
            aria-hidden="true"
          />
          <span className="border-primary/40 bg-primary/10 ring-primary/20 rounded-full border px-4 py-1.5 text-sm font-semibold ring-1">
            React ✓
          </span>
        </div>
        <figcaption className="text-muted-foreground mt-4 text-center text-xs">
          One canonical skill per meaning, matched by embeddings + pgvector
          cosine similarity — with curated overrides and a hash-memoized
          compatibility cache.
        </figcaption>
      </figure>

      {/* 5b — the payoff: exact match / gap */}
      <ul className="bg-card divide-y rounded-xl border">
        {skillMatches.map(({ name, matched }) => (
          <li key={name} className="flex items-center gap-3 p-3 text-sm">
            {matched ? (
              <Check className="text-secondary h-4 w-4" aria-hidden="true" />
            ) : (
              <CircleDashed
                className="text-muted-foreground h-4 w-4"
                aria-hidden="true"
              />
            )}
            <span>{name}</span>
            <span className="text-muted-foreground ml-auto text-xs">
              {matched ? "matched" : "gap"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type Pillar = {
  icon: LucideIcon;
  title: string;
  detail: string;
};

const pillars: Pillar[] = [
  {
    icon: ShieldAlert,
    title: "URL job import, safely",
    detail:
      "Paste a posting's link and a tiered extractor pulls it in — ATS adapters, then JSON-LD, then LLM-over-HTML, first hit wins. The outbound fetch is SSRF-hardened, and compatibility runs the moment it lands.",
  },
  {
    icon: Mic,
    title: "Interview prep",
    detail:
      "A conversational prep tool scoped to a specific posting — so the practice is about that job, not generic advice.",
  },
];

function PillarStrip() {
  return (
    <div className="my-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {pillars.map(({ icon: Icon, title, detail }) => (
        <div key={title} className="bg-card rounded-xl border p-6 shadow-xs">
          <div className="bg-muted text-foreground mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="mb-1 font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {detail}
          </p>
        </div>
      ))}
    </div>
  );
}

function Takeaway({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-secondary/40 text-muted-foreground my-6 border-l-2 pl-4 text-sm leading-relaxed">
      {children}
    </div>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <figure className="my-12">
      <blockquote className="border-primary/50 border-l-2 pl-6 font-serif text-2xl leading-snug font-medium sm:text-3xl">
        {children}
      </blockquote>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default async function CareerCraftStudioPost() {
  return (
    <article className="mx-auto max-w-4xl px-4">
      {/* Hero */}
      <div className="mb-12 text-center">
        <h1 className="animate-fade-in from-primary to-secondary mb-6 bg-gradient-to-r bg-clip-text font-serif text-5xl font-bold text-transparent">
          Building CareerCraft Studio
        </h1>
        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
          An AI career platform I built solo — a structured profile that an
          agent team turns into tailored resumes, cover letters, and real
          compatibility analysis. The what, the why, and the high-level how.
        </p>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">LangGraph</Badge>
          <Badge variant="secondary">pgvector</Badge>
          <Badge variant="secondary">tRPC</Badge>
          <Badge variant="secondary">MCP</Badge>
          <Badge variant="secondary">TypeScript</Badge>
        </div>
      </div>

      <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src="/images/blog/careercraft-studio.webp"
          alt="CareerCraft Studio — a structured career profile feeding an AI agent team that generates tailored resumes and compatibility analyses"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Intro */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="lead">
          Applying to jobs is a data-transformation problem that everyone solves
          by hand. You have one messy source of truth — your actual career — and
          every posting wants a slightly different projection of it. So you copy
          last month&rsquo;s resume, swap a few bullets, guess at the keywords
          the posting cares about, and fire it off. Repeat thirty times. The
          generic version underperforms and the tailored version costs an hour
          you don&rsquo;t have.
        </p>

        <p>
          I didn&rsquo;t want a resume builder. Those just give you a nicer text
          editor for the same manual work. I wanted the transformation itself to
          be the product: keep my career as structured data once, and generate
          the right projection of it for each posting on demand. That&rsquo;s
          CareerCraft Studio. It&rsquo;s live at{" "}
          <a
            href="https://careercraft.studio"
            target="_blank"
            rel="noopener noreferrer"
          >
            careercraft.studio
          </a>
          .
        </p>
      </div>

      <PullQuote>
        &ldquo;I didn&rsquo;t want a resume builder. Those just give you a nicer
        text editor for the same manual work.&rdquo;
      </PullQuote>

      {/* What it does */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>What it actually does</h2>
        <p>
          You build a structured professional profile — work history, skills,
          education, projects, achievements, links — and you save the jobs
          you&rsquo;re interested in. From that, the system generates tailored
          resumes, tailored cover letters, and a real compatibility analysis of
          your profile against a specific posting.
        </p>
      </div>

      <FeatureGrid />

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          The part that makes it feel different is how you build the profile. You
          can fill out forms if you want, but you can also just talk to it:{" "}
          <em>
            &ldquo;Add my job at Tech Corp where I led a team of five and shipped
            the billing rewrite.&rdquo;
          </em>{" "}
          An agent pulls the company, title, and achievement out of that sentence
          and writes it to the right tables. Or you paste in an old resume — or
          upload a PDF — and it gets parsed into the same structured shape.
          However the data gets in, it lands in one normalized model that
          everything else reads from.
        </p>
      </div>

      <ConversationDemo />

      {/* The stack + type safety */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>The stack, and why type safety is the point</h2>
        <p>
          The stack is deliberately boring where boring buys reliability, and
          modern where it buys leverage: <strong>Next.js 16</strong> (App
          Router) and <strong>React 19</strong> for the shell,{" "}
          <strong>tRPC v11</strong> for the API, <strong>Prisma 7</strong> /{" "}
          <strong>PostgreSQL</strong> (with pgvector) for persistence,{" "}
          <strong>NextAuth v5</strong> for auth, and{" "}
          <strong>LangChain v1 + LangGraph + Gemini</strong> for the agent layer.
          Stripe handles subscriptions and usage quotas, Upstash Redis handles
          rate limiting, and Vitest keeps it honest.
        </p>
        <p>
          The thesis holding this together: it&rsquo;s type-safe end to end, from
          the Postgres schema to the React Query hook. tRPC gives me one source
          of truth. Change a Prisma model and I get compile-time errors
          everywhere that change actually matters — not a runtime surprise in
          production three weeks later.
        </p>

        <CodeBlock language="typescript">
          {`// Illustrative — the real routers are split by domain.
// Change this Prisma-derived shape and every caller,
// including the React hook, fails to compile until it's fixed.
const { data } = api.compatibility.analyze.useQuery({ jobPostingId });

// data.overallScore is known to be a number — here and in the UI.
// A typo or wrong shape is a build error, not a 500 in production.`}
        </CodeBlock>

        <Takeaway>
          <strong className="text-foreground">Why it matters:</strong> that
          discipline matters <em>more</em> in an AI app, not less. LLM output is
          unpredictable by nature; the types are the guardrail around the
          unpredictable part. The model can return something weird, but it
          can&rsquo;t quietly hand malformed data to the rest of the system —
          the boundaries won&rsquo;t compile if the shapes don&rsquo;t line up.
        </Takeaway>
      </div>

      {/* The agent team */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>The agent team</h2>
        <p>
          The heart of the product is a team of specialized AI agents running on
          a LangGraph <code>StateGraph</code>. Instead of one monolithic prompt
          trying to do everything, a central <strong>Supervisor</strong> reads
          each request and routes it to the specialist that owns that job. The
          graph handles the messy parts — cyclical back-and-forth, handing state
          between agents, routing that depends on where the conversation already
          is.
        </p>
      </div>

      <AgentDiagram />

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          One detail I&rsquo;m quietly proud of: the entire agent roster is
          derived from a single manifest. The list of valid agents, the routing
          schema, the terminal tools — they&rsquo;re all projections of that one
          source, with a test that fails if they drift apart. You can&rsquo;t add
          an agent in one place and forget it in another, because there&rsquo;s
          only one place.
        </p>
      </div>

      {/* Hard problems */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>The hard problems worth explaining</h2>
        <h3>Skill matching that understands meaning</h3>
        <p>
          This is the piece I&rsquo;d show off first. Naive skill matching is
          string matching, and string matching is a lie: a posting asks for
          &ldquo;React,&rdquo; your profile says &ldquo;ReactJS&rdquo; or
          &ldquo;React (hooks, context),&rdquo; and a dumb system calls that a
          miss.
        </p>
      </div>

      <SkillConvergence />

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          CareerCraft treats skills as a{" "}
          <strong>global, deduplicated taxonomy</strong>. Every canonical skill
          carries a semantic embedding vector (<code>gemini-embedding-001</code>,
          768 dimensions), computed <strong>once</strong> and reused across every
          user and every posting. Matching runs as a pgvector cosine-similarity
          query, so related phrasings resolve to the same thing and a job asking
          for one skill can match a genuinely related one. Before it falls to
          vector similarity, it checks a curated <strong>override tier</strong>{" "}
          of hand-tuned edges — the cases where I know two skills are related and
          don&rsquo;t want to leave it to cosine distance.
        </p>

        <CodeBlock language="typescript">
          {`// Illustrative sketch of the matching tiers (not the real query).
async function matchSkill(required: SkillVector) {
  // 1. Curated overrides win — hand-tuned edges I don't leave to math.
  const override = curatedEdges.get(required.id);
  if (override) return override;

  // 2. Otherwise: pgvector cosine similarity over canonical skills.
  return db.skill.findClosest(required.embedding); // gemini-embedding-001, 768d
}`}
        </CodeBlock>

        <p>
          The compatibility analysis itself runs <strong>synchronously</strong>,
          and it&rsquo;s memoized by an <code>inputsHash</code> — a SHA-256 of the
          profile-and-requirements snapshot that fed it. If the hash matches, you
          get the cached report back at zero LLM cost. Change your profile or the
          posting, the hash changes, and it recomputes automatically.
        </p>
      </div>

      <PullQuote>
        &ldquo;Freshness is owned entirely by the hash. There&rsquo;s no
        &lsquo;is this stale?&rsquo; flag that can lie to you.&rdquo;
      </PullQuote>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          That&rsquo;s the part I like: the input defines the output. There&rsquo;s
          no background job to invalidate caches, no status column that can drift
          out of sync with reality. The report either exists for this exact input
          or it doesn&rsquo;t.
        </p>

        <h3>Turning a messy resume into structured data</h3>
        <p>
          Parsing is the other genuinely hard part. Unstructured resume text —
          pasted or uploaded — goes through LLM extraction and comes out as
          structured work history, education, achievements, skills, and links. If
          someone uploads a graphic-heavy PDF where the text isn&rsquo;t cleanly
          extractable, it falls back through a vision model to recover the text
          first.
        </p>

        <CodeBlock language="typescript">
          {`// Illustrative — parse once, then write in batched transactions.
const parsed = await llm.extractProfile(resumeText); // structured JSON

await db.$transaction([
  db.workHistory.createMany({ data: parsed.jobs }),
  db.education.createMany({ data: parsed.education }),
  db.skill.connectOrCreateMany(parsed.skills),
]); // hundreds of round-trips collapse into a handful`}
        </CodeBlock>

        <Takeaway>
          <strong className="text-foreground">Why it matters:</strong> a parsed
          resume touches a lot of related rows across a lot of tables. Batching
          the writes into transactions collapses hundreds of round-trips into
          dozens — and keeps the import atomic, so a half-parsed resume never
          leaves you with half a profile.
        </Takeaway>
      </div>

      {/* Testability aside */}
      <aside className="bg-muted/40 my-12 rounded-xl border p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <Info className="text-muted-foreground h-5 w-5" aria-hidden="true" />
          <h2 className="m-0 text-2xl font-bold">Keeping an AI app testable</h2>
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Here&rsquo;s the engineering decision I&rsquo;d most want another
            developer to steal. Domain logic lives in <strong>services</strong>,
            not in routers — routers are thin transport adapters that map domain
            errors to HTTP and otherwise get out of the way. And every LLM
            dependency is injected as a <strong>port</strong>: a small interface
            with a real Gemini adapter in production and a deterministic{" "}
            <strong>fake</strong> in tests.
          </p>

          <CodeBlock language="typescript">
            {`// The AI dependency is an interface, not a hard-coded model call.
interface SkillMerger {
  merge(a: Achievement[], b: Achievement[]): Promise<Achievement[]>;
}

// prod: a Gemini adapter.  tests: a deterministic fake — no network, no key.
const service = createWorkHistoryService({ merger });`}
          </CodeBlock>

          <p>
            That one choice is why the AI orchestration is unit-testable without a
            live model or a network call. I can test the merge logic, the routing,
            the ingestion pipeline — the actual behavior — deterministically, in
            milliseconds. AI-heavy apps have a strong gravitational pull toward
            becoming untestable, because &ldquo;call the model and hope&rdquo;
            leaks into everything. Injecting the model as a port is how you resist
            that. The unpredictable dependency lives behind an interface you
            control.
          </p>
        </div>
      </aside>

      {/* MCP connector */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>Bring your career data anywhere: the MCP connector</h2>
        <p>
          CareerCraft exposes a <strong>Model Context Protocol connector</strong>
          , which means an external AI assistant — Claude, say — can act on your
          career data <em>as you</em>: read your profile, generate a tailored
          resume, run a compatibility check, all from wherever you already are.
        </p>
        <p>
          I refused to cut corners on the auth for this, because &ldquo;let an
          external agent act as you&rdquo; is exactly where corners get people
          breached. It&rsquo;s real <strong>OAuth 2.1</strong>: dynamic client
          registration (RFC 7591), PKCE, single-use authorization codes that live
          for 60 seconds, and scoped, revocable bearer tokens. The raw token is
          never stored — only a SHA-256 hash of it. And every MCP tool call runs
          through the <strong>same per-user ownership guards as the app itself</strong>
          ; a caller factory reuses the exact protected procedures the
          first-party UI uses, so there&rsquo;s no shadow API with weaker checks.
        </p>

        <CodeBlock language="json">
          {`// An external assistant is granted a scoped, revocable token.
{
  "client": "claude.ai",
  "grant": "authorization_code + PKCE",
  "scopes": ["profile:read", "resume:write", "compatibility:run"],
  "stored": "SHA-256 hash only — never the raw token"
}`}
        </CodeBlock>

        <p>
          There are also <strong>macro tools</strong> that chain a whole workflow
          into one call. <code>tailor_my_application</code> runs compatibility,
          generates a tailored resume, generates a cover letter, and produces a
          PDF — one call, one coherent result. Metering is inherited from the
          sub-steps, so chaining a workflow never double-charges you.
        </p>

        <h2>Recent additions</h2>
        <p>
          Two capabilities I shipped recently round out the loop from
          &ldquo;find a job&rdquo; to &ldquo;walk into the interview.&rdquo;
        </p>
      </div>

      <PillarStrip />

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          On the URL importer specifically: the outbound fetch is hardened against
          SSRF — HTTPS-only, DNS resolved to an IP allowlist, IP pinning to defeat
          DNS-rebinding, re-validation on every redirect hop, and size/time caps.
          When it fails, it fails honestly — you get a real message, never a
          leaked raw error. And there&rsquo;s a real internal design system under
          all of it — tokens only, light and dark, motion that respects{" "}
          <code>prefers-reduced-motion</code> — because craftsmanship shows up in
          the parts nobody tweets about.
        </p>

        {/* Closing */}
        <h2>What I&rsquo;d tell another developer</h2>
        <p>
          The lesson isn&rsquo;t &ldquo;AI changes everything.&rdquo; It&rsquo;s
          the opposite. A real user problem plus boring, reliable tools is what
          made a sophisticated AI product buildable by one person. LangGraph gives
          me orchestration, but tRPC and Prisma and Postgres give me the
          guardrails that make the orchestration safe to change. Type safety,
          service boundaries, injected ports, hash-owned freshness — none of that
          is novel. It&rsquo;s just applied, consistently, to the specific ways an
          AI app tries to rot.
        </p>
      </div>

      <PullQuote>
        &ldquo;A real user problem plus boring, reliable tools is what made a
        sophisticated AI product buildable by one person.&rdquo;
      </PullQuote>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Start from the user&rsquo;s actual problem. Let unglamorous,
          well-understood tools carry the weight. Reserve the fancy parts for
          where they genuinely earn their keep. That&rsquo;s the whole playbook.
        </p>
      </div>

      <Separator className="my-12" />

      {/* CTA */}
      <div className="mb-16 text-center">
        <p className="text-muted-foreground mx-auto mb-6 max-w-xl">
          CareerCraft Studio is live. If you want to dig into the architecture —
          the agent graph, the MCP auth, the pgvector matching — I&rsquo;m happy
          to go deep.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link
              href="https://careercraft.studio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-5 w-5" />
              Try CareerCraft Studio
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">
              <Mail className="h-5 w-5" />
              Discuss the architecture
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
