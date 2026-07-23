---
name: create-blog-post
description: >-
  Create and publish a new blog post on this Next.js site. Scaffolds the post
  component from the template, fills in the ---bm metadata block, generates a
  cover image with gemini-3.1-flash-lite-image, writes the body, and verifies it
  renders and indexes for listing + search. Use this whenever the user wants to
  write, create, add, draft, or publish a blog post or article, mentions a new
  post under src/app/blog, needs a blog cover / feature / hero image, or asks how
  to get a post to show up in the blog listing and search. Trigger even when they
  don't say "skill" — e.g. "write up a post about X", "add a blog entry for my
  new project", "make a hero image for my post", "why isn't my post showing up in
  search".
---

# Create a Blog Post

## Mental model: rendering and indexing are decoupled

A blog post here is **not a markdown file** — it's a real Next.js page component
at `src/app/blog/<slug>/page.tsx` that can contain any JSX/React you like. Two
independent things run off that one file:

1. **Rendering** — Next serves the component at `/blog/<slug>`. Needs no database.
2. **Indexing** — `pnpm blog:index` reads the file's *source*, extracts a metadata
   block plus the prose/code from the JSX (via a TypeScript AST walk), and writes
   it to Postgres so the post appears in the **listing and search**.

The consequence to keep in mind: **a post can render perfectly yet be invisible
in `/blog` and search until it's been indexed.** Rendering and indexing never
block each other.

## The slug comes from the directory name

`src/app/blog/my-new-post/page.tsx` → slug `my-new-post` → URL `/blog/my-new-post`.
There is no `slug` field in the metadata; the directory *is* the slug. Use a short,
lowercase, hyphenated slug and reuse it verbatim for the image filename.

## Steps

### 1. Scaffold from the template

Copy the template rather than writing from scratch — it is the source of truth for
the exact metadata format and is deliberately excluded from indexing:

```bash
cp -r src/app/blog/template src/app/blog/my-new-post
```

### 2. Fill in the `---bm` metadata block

At the top of `page.tsx` is a block comment the indexer parses. The indexer's regex
only matches a block that **opens with `---bm`** — a plain `{/* --- ... --- */}`
JSX comment is silently skipped. Keep the `/* ---bm ... --- */` shape from the
template:

```
/*
---bm
title: My New Post
excerpt: One-line summary shown in listings and used for search ranking.
coverImage: /images/blog/my-new-post.png
publishedAt: 2026-07-24
featured: false
published: true
tags: nextjs,typescript
---
*/
```

Field notes:
- **`published: true`** — required for the post to appear. Every listing/search query
  filters `published = true`, and the schema defaults it to `false`, so a post that
  omits it indexes as a hidden draft. The template already includes it; keep it.
- **`coverImage`** — a `/images/blog/<slug>.<ext>` path (see step 3).
- **`tags`** — a single comma-separated string, not a YAML list.
- **`publishedAt`** — `YYYY-MM-DD`.
- **`featured`** — `true` surfaces it in featured slots; default `false`.

### 3. Update the `export const metadata` block

Below the comment is a real `export const metadata` object. This is separate from
the `---bm` block: it drives the `<head>` / OpenGraph / Twitter tags, not the
indexer. Update `title`, `description` (mirror the excerpt), and the `openGraph` /
`twitter` image URLs to point at the same cover image.

### 4. Generate the cover image

Use the bundled script to generate a cover with `gemini-3.1-flash-lite-image` and
save it straight to the right path. **Craft a strong prompt** — describe subject,
style, mood, palette, and composition; ask for no text/watermark; and keep it
consistent with an editorial blog-hero look. Example:

```bash
node .claude/skills/create-blog-post/scripts/generate-blog-image.mjs \
  --slug my-new-post \
  --prompt "Editorial flat-illustration hero image about <topic>. Bold, modern, clean composition with generous negative space, cohesive limited color palette, soft depth. No text, no watermark, no logos. 16:9 landscape."
```

The script saves to `public/images/blog/<slug>.<ext>` (the extension follows the
bytes the model actually returns — often `.jpg` for this lite model — unless you
force a path with `--out`), reads `GEMINI_API_KEY` (falling back to
`GOOGLE_API_KEY`) from the environment or a local `.env`, and **prints the exact
`coverImage` path to use**. Treat that printed path as authoritative: set the
`---bm` `coverImage` and the `export const metadata` OG/Twitter image URLs to
match it (so if it saved `.jpg`, update the `.png` placeholder from step 2). Pass
`--aspect ""` if the model rejects the aspect-ratio hint. If the user prefers their
own image, just drop it at `public/images/blog/<slug>.<ext>` and skip this.

### 5. Write the post body

Replace the template's example JSX with the real content — headings, prose,
`<CodeBlock>` snippets, and any interactive components. The indexer extracts all of
this (including code-block contents) into searchable text, so what you write is
what becomes findable. Match the tone and structure of the existing posts under
`src/app/blog/` rather than inventing a new layout.

**Write typography as literal Unicode, not HTML entities.** Use `—` `–` `…` `“` `”`
`‘` `’` directly, never `&mdash;` `&ndash;` `&hellip;` `&ldquo;` `&apos;` etc. This
isn't just style: Next's SWC JSX transform mishandles the whitespace of any text
node containing a named HTML entity, and **silently drops the space** between that
node and an adjacent inline element — `<strong>titles</strong> and` ships as
`titles</strong>and`. It happens at build time, so the space is gone from the HTML
and **no CSS can bring it back**. Using the literal glyph avoids it entirely (and
reads better). For characters JSX reserves — `<` `>` `{` `}` `&` — use a string
expression like `{"<slug>"}` rather than an entity like `&lt;slug&gt;`; that renders
the literal character as its own node with nothing for the transform to trip over.
The `check-post-typography.mjs` script in step 6 enforces this so you don't have to
remember it.

### 6. Verify locally

Run the project's own definition of "done" plus a render + index check:

```bash
# Guard against the entity/whitespace transform bug (see step 5) — must be clean:
node .claude/skills/create-blog-post/scripts/check-post-typography.mjs \
  src/app/blog/my-new-post/page.tsx
pnpm lint
pnpm typecheck
pnpm build
pnpm dev            # then open http://localhost:3000/blog/my-new-post to confirm it renders
pnpm blog:index     # confirm it extracts + indexes without errors
```

The typography check exits non-zero and lists every HTML entity with its literal
replacement; fix them before moving on (an entity-free post can never hit the
dropped-space bug, so this is the one check that prevents it recurring).

⚠️ `pnpm blog:index` writes to whatever `DATABASE_URL` points at and, if
`OPENAI_API_KEY` is set, calls OpenAI for embeddings. Point it at a **dev/throwaway
database**, never production. (Re-indexing is cheap: a content-hash guard skips
re-embedding posts whose content hasn't changed, so a normal re-index costs no API
calls.)

### 7. Preview the post (always do this)

The author will **always** want to see the rendered post, so end the authoring
flow by handing them a working link. First check whether a dev server is already
running with the bundled status script — it prints exactly `up` or `down` (nothing
else), so you can branch on it deterministically instead of re-deriving a check and
parsing its output each time:

```bash
.claude/skills/create-blog-post/scripts/dev-server-status.sh
```

- **`up`** — a server is already running; don't start another. Go straight to the link.
- **`down`** — start the dev server in the background and wait for it to accept
  connections before handing over the link:

  ```bash
  pnpm dev > /tmp/next-dev.log 2>&1 &      # start it backgrounded
  until [ "$(.claude/skills/create-blog-post/scripts/dev-server-status.sh)" = up ]; do
    sleep 1
  done
  ```

Then give the author the direct URL to the new post:
`http://localhost:3000/blog/<slug>`. Leave the server running (don't kill one you
didn't start — the author is about to use it). The status script defaults to port
3000, which is what `pnpm dev` and `AUTH_URL` use here; pass a port argument if the
author runs the dev server elsewhere.

### 8. Publish

Commit on a branch, open a PR, and merge to `main`. The **`Blog Indexing` GitHub
Action** (`.github/workflows/index-blog.yml`) fires automatically on any push to
`main` touching `src/app/blog/**`, running `prisma migrate deploy` then
`pnpm blog:index` against production — so the post becomes listable and searchable
on the live site with no manual step. Editing a post's body later needs another
merge to re-index for search to reflect the change.

## How the post becomes searchable

Once indexed, a post is found three ways through the same `/blog?q=` box, fused via
Reciprocal Rank Fusion:
- **Full-text** — Postgres `tsvector`, weighted title > excerpt > body.
- **Semantic** — OpenAI embeddings, so a conceptual query with no shared keywords
  can still surface it (only when `OPENAI_API_KEY` is set; otherwise search degrades
  gracefully to full-text only).

## Quick checklist before you call it done

- [ ] Directory `src/app/blog/<slug>/` created from the template.
- [ ] `---bm` block: real title, excerpt, `coverImage`, `publishedAt`, `tags`, and
      `published: true`.
- [ ] `export const metadata` updated (title, description, OG/Twitter image).
- [ ] Cover image exists at `public/images/blog/<slug>.<ext>` and matches `coverImage`.
- [ ] Body content written; template placeholder JSX removed.
- [ ] Typography is literal Unicode (`—` `“` `”` `’` `…`), no HTML entities;
      `check-post-typography.mjs` passes clean.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm build` pass; `/blog/<slug>` renders.
- [ ] `pnpm blog:index` runs cleanly against a dev DB.
- [ ] Dev server checked/started and the author handed a `/blog/<slug>` preview link.
