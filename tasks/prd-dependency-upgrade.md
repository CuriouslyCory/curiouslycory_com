# PRD: Full Dependency Upgrade

## Introduction

Upgrade all project dependencies to their latest compatible versions. The project is a T3-stack personal site (Next.js 16, React 19, Tailwind v4, Prisma, tRPC, NextAuth) where Next.js, React, and Tailwind are already at target versions. The major migrations are: **Prisma 6 to 7.5**, **Zod 3 to 4**, and **next-auth v4 to Auth.js v5**, plus a bulk update of all remaining packages. A detailed Prisma migration guide exists at `prisma/upgrade-prompt.md`.

## Goals

- Upgrade Prisma from v6.11 to v7.5 with adapter-based client pattern
- Upgrade Zod from v3.24 to v4 across all usage sites
- Migrate next-auth v4 to Auth.js v5
- Update all remaining dependencies to latest compatible versions
- Convert blog-indexer.js to TypeScript
- Maintain zero type errors, lint errors, and successful builds throughout

## User Stories

### US-001: Bulk dependency update (non-breaking)
**Description:** As a developer, I want all minor/patch dependencies updated so the project stays current on bug fixes and security patches.

**Acceptance Criteria:**
- [ ] Run `pnpm update` to bump all deps within existing semver ranges
- [ ] Update `eslint-config-next` to latest (16.x to match Next 16)
- [ ] Update `@types/react` and `@types/react-dom` to latest 19.x (including pnpm overrides)
- [ ] Update all `@radix-ui/*`, `@tanstack/*`, `lucide-react`, `motion`, and other deps to latest
- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes

### US-002: Prisma schema and config migration
**Description:** As a developer, I want the Prisma schema and CLI configuration updated for v7 so the project uses the new generator and config format.

**Acceptance Criteria:**
- [ ] `prisma` and `@prisma/client` upgraded to ^7.5.0
- [ ] `@prisma/adapter-pg` installed as a dependency
- [ ] In `prisma/schema.prisma`: generator provider changed from `"prisma-client-js"` to `"prisma-client"`
- [ ] In `prisma/schema.prisma`: `output = "../src/generated/prisma"` added to generator block
- [ ] In `prisma/schema.prisma`: `url = env("DATABASE_URL")` removed from datasource block (keep `provider = "postgresql"`)
- [ ] `prisma.config.ts` created at repo root with `defineConfig` using `process.env.DATABASE_URL`
- [ ] `/src/generated` added to `.gitignore`
- [ ] `@prisma/client` and `@prisma/engines` removed from `pnpm.onlyBuiltDependencies` in `package.json`
- [ ] `~/generated/*` path alias added to `tsconfig.json`
- [ ] `pnpm prisma generate` succeeds and outputs to `src/generated/prisma/`
- [ ] `pnpm typecheck` passes

### US-003: Prisma client instantiation refactor
**Description:** As a developer, I want the PrismaClient to use the new v7 adapter pattern so database connections use Direct TCP.

**Acceptance Criteria:**
- [ ] `src/server/db.ts` updated: imports `PrismaClient` from `~/generated/prisma/client.js`, creates `PrismaPg` adapter with `env.DATABASE_URL`, passes adapter to `PrismaClient` constructor
- [ ] `src/server/api/routers/blog.ts` updated: `type Prisma` import changed from `@prisma/client` to `~/generated/prisma/client.js`
- [ ] `@auth/prisma-adapter` upgraded to latest version for Prisma v7 compatibility
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` passes (includes `blog:index` via prebuild)

### US-004: Convert blog-indexer to TypeScript with Prisma v7
**Description:** As a developer, I want the blog-indexer script converted to TypeScript and updated for Prisma v7 so it uses the same adapter pattern and benefits from type safety.

**Acceptance Criteria:**
- [ ] `tsx` added as a devDependency
- [ ] `src/scripts/blog-indexer.js` renamed to `src/scripts/blog-indexer.ts` with proper types
- [ ] `src/scripts/index-blog.js` renamed to `src/scripts/index-blog.ts`
- [ ] Blog indexer uses `PrismaClient` from `~/generated/prisma/client.js` with `PrismaPg` adapter
- [ ] `package.json` script `blog:index` updated to use `tsx` (e.g., `tsx src/scripts/index-blog.ts`)
- [ ] `pnpm blog:index` runs successfully
- [ ] `pnpm typecheck` passes

### US-005: Zod 3 to 4 migration
**Description:** As a developer, I want Zod upgraded to v4 so the project uses the latest schema validation library with Standard Schema support.

**Acceptance Criteria:**
- [ ] `zod` upgraded to ^4.0.0
- [ ] `@t3-oss/env-nextjs` upgraded to latest (Zod 4 compatible)
- [ ] `@hookform/resolvers` upgraded to latest (Zod 4 compatible via Standard Schema)
- [ ] `@trpc/server`, `@trpc/client`, `@trpc/react-query` upgraded to latest (Standard Schema support)
- [ ] In `src/env.js`: `z.preprocess()` replaced with `z.unknown().transform().pipe()` pattern
- [ ] Verify `src/data/blog-schema.ts` compiles (uses `z.object`, `z.infer`, `.optional()`, `.nullable()`, `.default()`)
- [ ] Verify `src/server/api/routers/twitch.ts` compiles (uses `.parse()`, `z.infer`)
- [ ] Verify `src/server/api/trpc.ts` compiles (`ZodError` import and `.flatten()` still work)
- [ ] Verify `src/components/blog/blog-search.tsx` compiles (`zodResolver` from `@hookform/resolvers/zod`)
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` passes

### US-006: Migrate next-auth v4 to Auth.js v5
**Description:** As a developer, I want to migrate from next-auth v4 to Auth.js v5 for the latest auth features and Next.js 16 compatibility.

**Acceptance Criteria:**
- [ ] `next-auth` upgraded to v5 (latest beta/stable)
- [ ] `@auth/prisma-adapter` upgraded to latest compatible with Auth.js v5 + Prisma v7
- [ ] `src/server/auth.ts` rewritten: export `auth`, `handlers`, `signIn`, `signOut` from `NextAuth()` config using Auth.js v5 API
- [ ] Auth.js v5 config uses `PrismaAdapter` with the `db` instance from `~/server/db`
- [ ] Discord provider updated to Auth.js v5 import path (`@auth/core/providers/discord` or `next-auth/providers/discord` v5)
- [ ] Session callback preserved: `user.id` added to session object
- [ ] Module augmentation updated to Auth.js v5 types (if needed)
- [ ] `src/app/api/auth/[...nextauth]/route.ts` updated to use exported `handlers` (GET, POST) from auth config
- [ ] `src/server/api/trpc.ts` updated: `getServerAuthSession()` replaced with `auth()` call from Auth.js v5
- [ ] `src/env.js` updated: `NEXTAUTH_SECRET` renamed to `AUTH_SECRET` if required by v5, `NEXTAUTH_URL` handling updated
- [ ] `.env.example` updated with new env var names if changed
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` passes

### US-007: Final verification and cleanup
**Description:** As a developer, I want to verify the entire upgrade works end-to-end with no regressions.

**Acceptance Criteria:**
- [ ] `pnpm prisma generate` succeeds
- [ ] `pnpm typecheck` passes with zero errors
- [ ] `pnpm lint` passes with zero errors
- [ ] `pnpm build` succeeds (includes blog:index prebuild step)
- [ ] `pnpm dev` boots without errors
- [ ] tRPC queries function correctly (blog routes, twitch routes)

## Functional Requirements

- FR-1: Prisma v7 client must use `@prisma/adapter-pg` with Direct TCP connection (no Accelerate)
- FR-2: Prisma generated client output to `src/generated/prisma/` with tsconfig path alias `~/generated/*`
- FR-3: `prisma.config.ts` at repo root must read `DATABASE_URL` from `process.env` (Prisma CLI reads .env automatically)
- FR-4: Zod 4's `z.preprocess()` removal requires migration to `z.unknown().transform().pipe()` in `src/env.js`
- FR-5: All Zod schemas must work with tRPC input validation via Standard Schema interface
- FR-6: Auth.js v5 must export `auth()` function replacing `getServerSession(authOptions)` pattern
- FR-7: Auth.js v5 route handler must export `{ GET, POST }` from `handlers`
- FR-8: Blog indexer script must run as TypeScript via `tsx` with same Prisma adapter pattern
- FR-9: All existing Prisma schema models (Post, Tag, Account, Session, User, VerificationToken, SharedCode, Project) must remain unchanged
- FR-10: `postinstall` script must continue to run `prisma generate` for deployment compatibility

## Non-Goals

- No database schema/migration changes (models stay the same)
- No new features or functionality added
- No UI changes
- No changes to deployment infrastructure (Vercel)
- No addition of Prisma Accelerate
- No addition of new auth providers
- No conversion of NextAuth v4 database sessions to JWT (keep database strategy)

## Technical Considerations

- **Dependency compatibility chain:** Prisma v7 should be done before Zod 4, since both touch `src/server/db.ts` and related files. Auth.js v5 depends on the Prisma adapter working with v7.
- **Blog indexer runs outside Next.js:** The blog indexer is a standalone Node script run at build time (`prebuild`). It needs its own dotenv loading and Prisma adapter setup. Converting to TS with `tsx` resolves path alias issues.
- **`@t3-oss/env-nextjs` Zod 4 support:** This package must support Zod 4. If the latest version doesn't, this blocks the Zod upgrade.
- **Auth.js v5 stability:** Auth.js v5 may still be in beta. Use the latest available release that supports Next.js 16.
- **Prisma v7 pure JS client:** v7 no longer ships binary engines. Remove `@prisma/client` and `@prisma/engines` from `pnpm.onlyBuiltDependencies`.
- **Existing files to modify:**
  - `package.json` — dependency versions, scripts, pnpm config
  - `prisma/schema.prisma` — generator provider, output, remove url
  - `prisma.config.ts` — **NEW** file
  - `tsconfig.json` — add path alias
  - `.gitignore` — add `/src/generated`
  - `src/server/db.ts` — import path, adapter pattern
  - `src/server/auth.ts` — Auth.js v5 rewrite
  - `src/server/api/trpc.ts` — auth() call, ZodError compat
  - `src/server/api/routers/blog.ts` — Prisma import path
  - `src/app/api/auth/[...nextauth]/route.ts` — handlers export
  - `src/env.js` — z.preprocess() removal, env var names
  - `src/scripts/blog-indexer.js` → `blog-indexer.ts` — TS conversion + adapter
  - `src/scripts/index-blog.js` → `index-blog.ts` — TS conversion
  - `.env.example` — auth env var names

## Success Metrics

- Zero type errors after full upgrade
- Zero lint errors after full upgrade
- Successful production build (`pnpm build`)
- All existing functionality preserved (blog indexing, auth, tRPC, theming)

## Open Questions

- Auth.js v5 stable release status — may need to use beta. Check latest npm version at implementation time.
- `@t3-oss/env-nextjs` Zod 4 compatibility — verify at implementation time. If not supported, may need to use Zod 4's `zod/v3` compat layer for this one package.
- Whether `@auth/prisma-adapter` latest works seamlessly with both Auth.js v5 AND Prisma v7 generated client — verify at implementation time.
