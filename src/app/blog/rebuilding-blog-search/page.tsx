/*
---bm
title: "Rebuilding My Blog's Search: Full-Text + Semantic, Fused"
excerpt: "How I rebuilt search on this site — from a title-only match to hybrid full-text and semantic retrieval fused with Reciprocal Rank Fusion — shipped as four small, decoupled PRs."
coverImage: /images/blog/rebuilding-blog-search.jpg
publishedAt: 2026-07-23
featured: true
published: true
tags: nextjs,typescript,postgres,search,embeddings,pgvector,trpc,prisma
---
*/

import { Badge } from "~/components/ui/badge";
import { CodeBlock } from "~/components/ui/code-block";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Rebuilding My Blog's Search: Full-Text + Semantic, Fused",
  description:
    "How I rebuilt search on this site — from a title-only match to hybrid full-text and semantic retrieval fused with Reciprocal Rank Fusion — shipped as four small, decoupled PRs.",
  openGraph: {
    images: [
      {
        url: "/images/blog/rebuilding-blog-search.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rebuilding My Blog's Search: Full-Text + Semantic, Fused",
    description:
      "From title-only matching to hybrid full-text + semantic search, fused with Reciprocal Rank Fusion — the four-PR rebuild behind this site's /blog search box.",
    images: ["/images/blog/rebuilding-blog-search.jpg"],
  },
};

export default async function RebuildingBlogSearchPost() {
  return (
    <div className="mx-auto max-w-4xl">
      {/* Hero */}
      <div className="mb-12 text-center">
        <h1 className="animate-fade-in from-primary to-secondary mb-6 bg-gradient-to-r bg-clip-text font-serif text-5xl font-bold text-transparent">
          Rebuilding My Blog’s Search
        </h1>
        <p className="text-muted-foreground mb-8 text-xl">
          From a title-only <code>LIKE</code> to hybrid full-text{" "}
          <em>and</em> semantic retrieval, fused together — and the four
          small, decoupled PRs that got it there without ever touching
          production by hand.
        </p>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">Postgres FTS</Badge>
          <Badge variant="secondary">pgvector</Badge>
          <Badge variant="secondary">Embeddings</Badge>
          <Badge variant="secondary">RRF</Badge>
          <Badge variant="secondary">Next.js</Badge>
          <Badge variant="secondary">Prisma</Badge>
        </div>
      </div>

      <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src="/images/blog/rebuilding-blog-search.jpg"
          alt="Two streams — geometric keyword tokens and flowing semantic vectors — converging and fusing into a single ranked list of results"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="prose prose-lg dark:prose-invert mb-8 max-w-none">
        <h2>The search box was lying to you</h2>

        <p>
          For a long time the search box on <Link href="/blog">/blog</Link> did
          something embarrassingly shallow: it matched your query against post{" "}
          <strong>titles</strong> and nothing else. Search “capacitive
          sensor” and you’d find the post with those words in the
          headline. Search “detecting touch with electronics” —
          which is what that post is actually <em>about</em> — and you got
          nothing. The body text of every post was invisible to search.
        </p>

        <p>
          There was a good reason it was hard to fix, and it’s the most
          important thing to understand about how this blog works.
        </p>

        <h2>Posts here are React components, not markdown</h2>

        <p>
          Every post on this site is a real Next.js page component at{" "}
          <code>{"src/app/blog/<slug>/page.tsx"}</code>. There is no markdown
          file, no CMS, no frontmatter parser at request time. That’s what
          lets a post embed live, interactive React — but it also means
          there is no tidy body of text sitting in a database waiting to be
          searched. The “content” of a post is JSX, tangled up with{" "}
          <code>className</code>s, <code>href</code>s, and component props.
        </p>

        <p>
          So the rebuild had two jobs. First, get the actual prose{" "}
          <em>out</em> of those components and into Postgres. Then, make that
          text findable in a way that survives the gap between the words a
          reader types and the words I happened to write.
        </p>

        <h2>The mental model: rendering and indexing are decoupled</h2>

        <p>
          The core design decision — the one everything else hangs off of
          — is that <strong>rendering</strong> and{" "}
          <strong>indexing</strong> are two completely independent pipelines
          reading the same file:
        </p>

        <ul>
          <li>
            <strong>Rendering</strong> is just Next.js serving the component at{" "}
            <code>{"/blog/<slug>"}</code>. It needs no database.
          </li>
          <li>
            <strong>Indexing</strong> is a separate step (
            <code>pnpm blog:index</code>) that reads the file’s{" "}
            <em>source</em>, extracts the prose and metadata, and writes them to
            Postgres so the post shows up in listings and search.
          </li>
        </ul>

        <p>
          The practical consequence: a post can render perfectly and still be
          invisible to search until it’s been indexed. Keeping those two
          things uncoupled is what made the rest of the work safe to ship
          incrementally.
        </p>

        <h2>Shipped as four moves</h2>

        <p>
          Rather than one heroic branch, this went out as four small PRs, each
          one independently reviewable and each one leaving the site in a
          working state. That structure wasn’t incidental — it’s
          what kept a “rewrite the search engine” project from ever
          having a scary big-bang merge.
        </p>

        <h3>1. Unblock the build</h3>

        <p>
          Before any search work, there was a landmine: indexing was wired into
          the build. A <code>prebuild</code> hook ran the indexer on every{" "}
          <code>pnpm build</code>, which meant the build <em>wrote to
          production Postgres</em> and failed outright if the database was
          unreachable. You can’t safely iterate on an indexer that runs
          every time you compile.
        </p>

        <p>
          So the first PR did nothing user-facing at all. It removed the{" "}
          <code>prebuild</code> hook and made the two database-backed routes (the
          sitemap and the projects page) render dynamically instead of trying to
          hit the DB at build time. The acceptance test was blunt:{" "}
          <code>pnpm install</code>, <code>lint</code>, <code>typecheck</code>,
          and <code>build</code> all succeed with a deliberately bogus,
          unreachable <code>DATABASE_URL</code>. Boring, and load-bearing:
          everything after this depended on being able to build without a
          database.
        </p>

        <h3>2. Teach it to read posts</h3>

        <p>
          Now the real work: get searchable text out of a <code>.tsx</code>{" "}
          file. The tempting approach is a pile of regexes. That way lies
          madness — you’d scrape <code>className</code> soup and URLs
          into your search index and jam words together across tags.
        </p>

        <p>
          Instead, the extractor parses each post with the{" "}
          <strong>TypeScript compiler’s own AST</strong> and walks it,
          collecting only the text a reader actually sees: JSX text, string and
          template-literal children (which conveniently also captures the code
          inside <code>{"<CodeBlock>"}</code>), and a small allowlist of
          attributes like <code>alt</code> and <code>title</code>. Styling
          props, URLs, and the metadata block are deliberately left out.
        </p>

        <p>
          The extracted prose lands in a <code>Post.content</code> column, and
          the actual searching is done by Postgres full-text search over a{" "}
          <strong>
            generated <code>tsvector</code> column
          </strong>{" "}
          with a GIN index. It’s weighted — title beats excerpt beats
          body — and it’s <code>STORED</code>, so Postgres recomputes
          it automatically on every write. No triggers, no application-side
          vector maintenance, no chance of the text and its search vector
          drifting out of sync:
        </p>

        <CodeBlock language="sql">{`ALTER TABLE "Post" ADD COLUMN "searchVector" tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce("title",   '')), 'A') ||
    setweight(to_tsvector('english', coalesce("excerpt", '')), 'B') ||
    setweight(to_tsvector('english', coalesce("content", '')), 'C')
  ) STORED;

CREATE INDEX "Post_searchVector_idx" ON "Post" USING GIN ("searchVector");`}</CodeBlock>

        <p>
          The query side uses <code>websearch_to_tsquery</code> (so quotes and{" "}
          <code>or</code> behave the way people expect from a search box) with a
          fallback to <code>plainto_tsquery</code> when a query is nothing but
          stopwords or stray operators. Crucially, the search helper was written
          to return a <em>full ranked list of post IDs</em> rather than a
          pre-sliced page — because I already knew the next PR needed to
          fuse that list with a second one.
        </p>

        <h3>3. Give it understanding</h3>

        <p>
          Full-text search is great until the reader and the writer choose
          different words. “Detecting touch with electronics” shares
          almost no keywords with a post titled around “capacitive
          sensors,” yet they mean the same thing. That gap is exactly what
          embeddings close.
        </p>

        <p>
          At index time, each post’s content is chunked and embedded with
          OpenAI’s <code>text-embedding-3-small</code> (1536 dimensions),
          and the vectors are stored in a <code>PostChunk</code> table using{" "}
          <strong>pgvector</strong> with an HNSW index. At query time, the search
          query gets embedded too, and posts are ranked by their best-matching
          chunk’s cosine distance to it.
        </p>

        <p>
          Now there are two ranked lists for a query — one from full-text,
          one from semantic — and they disagree. Fusing them is the job of{" "}
          <strong>Reciprocal Rank Fusion</strong>, a delightfully simple idea:
          each list contributes a score of <code>1 / (k + rank)</code> for every
          item, the scores are summed, and everything re-sorts by the total.
          Items that rank well in <em>either</em> list bubble up; items both
          lists agree on rise fastest. A post that shares zero keywords with your
          query can still surface purely on the strength of the semantic list.
        </p>

        <CodeBlock language="typescript">{`// Two independent ranked lists -> one fused ranking (k = 60)
const ftsIds = await searchPostIds(db, q);          // Postgres full-text
let rankedIds = ftsIds;

if (q.trim().length >= 3) {
  const emb = await embedQuery(q, apiKey);          // never throws; null on failure
  if (emb) {
    const semantic = await searchPostIdsSemantic(db, emb);  // pgvector cosine
    rankedIds = reciprocalRankFusion([ftsIds, semantic]);   // RRF, JS-side
  }
}`}</CodeBlock>

        <p>
          The two constraints I cared most about here were <em>cost</em> and{" "}
          <em>resilience</em>:
        </p>

        <ul>
          <li>
            <strong>Re-indexing is free when nothing changed.</strong> Each set
            of chunks stores a hash of the content it was embedded from. On a
            re-run, a post whose content hash matches makes <strong>zero</strong>{" "}
            OpenAI calls. Editing one post re-embeds one post; there’s a{" "}
            <code>FORCE_REEMBED</code> escape hatch for the rare full rebuild.
          </li>
          <li>
            <strong>Semantic is strictly additive.</strong> No API key, a
            two-character query, a timeout, a rate limit, a missing pgvector
            extension — every one of those paths quietly degrades to
            full-text-only. The embedding calls are wrapped to never throw, so
            search can lose its semantic half and the box still works. That’s
            true in production too: the key is optional everywhere.
          </li>
        </ul>

        <h3>4. Make it automatic</h3>

        <p>
          The last piece closed the loop opened by the first. Indexing was
          decoupled from the build — good — but that left it as a
          manual step, and a manual step is a step you forget. So the site got
          its <em>first</em> GitHub Action: on any merge to <code>main</code>{" "}
          that touches the blog, it runs the migrations and re-indexes against
          production automatically.
        </p>

        <CodeBlock language="yaml">{`on:
  push:
    branches: [main]
    paths:
      - "src/app/blog/**"
      - "src/scripts/**"
      - "prisma/**"
  workflow_dispatch:
    inputs:
      force: { description: "Force re-embed all posts", type: boolean, default: false }`}</CodeBlock>

        <p>
          Because the indexer takes its API key as a plain argument rather than
          reaching into the app’s validated environment, the Action needs
          only a database URL and an optional OpenAI key — not the whole
          constellation of auth and OAuth secrets the app uses. And a couple of
          fast-follows hardened it: overlapping runs now <em>queue</em> instead
          of cancelling (interrupting a migration mid-apply is not a thing you
          want), and the checkout step drops its credentials since the workflow
          only ever reads.
        </p>

        <h2>How a query flows now</h2>

        <p>
          Put it all together and a single trip through the search box looks like
          this:
        </p>

        <ol>
          <li>
            Postgres full-text ranks every published post by weighted{" "}
            <code>tsvector</code> match.
          </li>
          <li>
            The query is embedded and pgvector ranks posts by nearest chunk
            — unless anything about that path is unavailable, in which case
            this step is simply skipped.
          </li>
          <li>Reciprocal Rank Fusion merges the two rankings into one.</li>
          <li>
            The fused ID list flows through the same tag / date / featured
            filters and pagination that already existed — the API’s
            output shape never changed, so the UI didn’t have to.
          </li>
        </ol>

        <h2>What I’d underline for anyone doing this</h2>

        <p>
          The engineering lesson isn’t really about search — it’s
          about <strong>seams</strong>. Decoupling indexing from the build first
          is what made it safe to swap the extraction, add a vector column, and
          bolt on CI as three independent, reversible steps. Every PR left the
          site shippable. The <code>Unsupported</code> Postgres columns (
          <code>tsvector</code>, <code>vector</code>) let Prisma own the schema
          while raw SQL owns the parts Prisma can’t model. And designing the
          full-text helper to return a <em>list</em> rather than a page — a
          full PR before there was any semantic search to fuse with — is
          what let the two ranking systems meet without a rewrite.
        </p>

        <p>
          Fittingly, this post is the feature exercising itself: it was written
          as a component, extracted by that AST walk, embedded, and indexed by
          the very Action described above. If you found it by searching for
          something that isn’t in the title — that’s the whole
          point.
        </p>
      </div>
    </div>
  );
}
