# CuriouslyCory's Developer/Personal Website

- Step 1: Clone the repository
- Step 2: Run `npm install`
- Step 3: ????
- Step 4: Profit

## Blog Feature

The website includes a custom blog system with the following features:

- **Custom Post Pages**: Each blog post is a custom Next.js page component with its own unique layout and features
- **Database Indexing**: Custom posts are still indexed in the database for search and listings
- **Automated Indexing**: Blog indexing is decoupled from the build and runs automatically via the blog-indexing GitHub Action on merge to `main`. `pnpm blog:index` still works for local/dev use to extract metadata and searchable body content from custom post components and update the database. If `OPENAI_API_KEY` is set, the same run also (re-)embeds each post for semantic search — indexing is skipped for posts whose content hasn't changed since the last run, so a normal re-run costs no API calls; set `FORCE_REEMBED=1` to force every post to re-embed regardless (useful after changing embedding logic). Editing a post's body requires re-running the indexer for the change to be searchable either way.
- **Rich Features**: Full support for pagination, tags, search, featured posts, and more
- **SEO Friendly**: Automatic metadata generation for each post

### GitHub Action & Repo Secrets

Indexing runs in the `Blog Indexing` GitHub Action (`.github/workflows/index-blog.yml`): it triggers on push to `main` when files under `src/app/blog/**`, `src/scripts/**`, or `prisma/**` change, and can also be run manually via `workflow_dispatch` with a `force` input that sets `FORCE_REEMBED` to re-embed every post. The workflow applies pending Prisma migrations (`pnpm db:migrate`) and then runs `pnpm blog:index`.

The workflow needs the following repo secrets, set under **Settings → Secrets and variables → Actions**:

| Secret | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Connection string used by `db:migrate` and `blog:index` |
| `OPENAI_API_KEY` | No | Enables semantic-search embedding during indexing; without it, indexing is FTS-only |
| `DEFAULT_AUTHOR_ID` | No | Fallback author ID for posts that don't specify one |

`OPENAI_API_KEY` must **also** be set in the Vercel project's environment variables — the GitHub secret only covers indexing, while query-time semantic search on `/blog?q=` runs in the deployed app.

### Search

`/blog?q=` searches post titles, excerpts, and body text using Postgres full-text search, and — when `OPENAI_API_KEY` is configured — blends in semantic (meaning-based) search so conceptual queries can find a relevant post even without matching keywords. The two result sets are merged into a single ranking; if no API key is set, or a query is too short, or the semantic lookup fails or times out, search transparently falls back to full-text search alone. Only published posts are matched, and only content as of the last time `pnpm blog:index` was run — if you edit a post's body, re-run the indexer for the change to show up in search results.

### How to Create a Blog Post

1. Create a new directory under `src/app/blog/your-post-slug/`
2. Create a `page.tsx` file in that directory with your custom content
3. Include a special comment with your post metadata:

```tsx
{/* 
  ---
  title: Your Post Title
  excerpt: Short description of your post
  coverImage: /images/blog/your-image.jpg
  publishedAt: 2023-12-15
  featured: true
  tags: tag1,tag2,tag3
  --- 
*/}
```

4. Merge to `main` and the blog-indexing GitHub Action will automatically index the new post (search and listings won't show it until then). The indexer extracts both metadata and searchable body content from the page component, so a merge that edits a post's body triggers re-indexing too. Before merging, run `pnpm blog:index` locally to verify the post extracts cleanly. Blog indexing is decoupled from the build. With `OPENAI_API_KEY` set, the same command also embeds the post for semantic search — the cost for a full blog's worth of posts is a few pennies at most, and unchanged posts are skipped automatically on re-runs (set `FORCE_REEMBED=1` to bypass that and re-embed everything).

## Development Commands

| Command             | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| `pnpm dev`           | Start the local dev server with Turbopack                    |
| `pnpm lint`           | Run ESLint                                                    |
| `pnpm typecheck`      | Run the TypeScript compiler in `--noEmit` mode                |
| `pnpm test`           | Run the Vitest test suite                                     |
| `pnpm build`          | Build for production (does not touch the database)            |
| `pnpm db:migrate`     | Apply Prisma migrations (`prisma migrate deploy`) — source of truth for schema changes; prefer this over `prisma db push` |
| `pnpm blog:index`     | Run the indexer: extract metadata and searchable body content from custom post components and update the database. Also (re-)embeds posts for semantic search when `OPENAI_API_KEY` is set, skipping any post whose content is unchanged since its last embed |

## Credits

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.
