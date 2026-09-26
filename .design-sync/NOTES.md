# design-sync notes (curiouslycory.com → Claude Design)

## How this repo is wired
- This is a Next.js app, not a published package: no `dist/`, no Storybook. `node .design-sync/build.mjs` (cfg.buildCmd) assembles a package-shaped wrapper in `.design-sync/.cache/pkg/` — `tsc` declarations for `src/components/ui/*.tsx` (via `.design-sync/tsconfig.dts.json`, with `~/` aliases rewritten to relative paths), an `index.ts` barrel as the esbuild entry (cfg.entry), and `ds-styles.css`. **Run it before every converter run** — the converter reads only the wrapper.
- Because PKG_DIR is the wrapper dir, package-relative config paths start with `../../../` (srcDir, tsconfig) or `../../` (extraFonts, extraEntries). cfg.entry is cwd-relative.
- CSS: `.design-sync/tailwind.css` imports `src/styles/globals.css` and is compiled by the repo's own `@tailwindcss/postcss` (minified). Tailwind v4 only emits scanned classes, so it `@source`s `src/` and `.design-sync/previews/` plus explicit `@source inline(...)` lists so the design agent's own layout classes resolve. A class used in a new preview only exists after `build.mjs` re-runs — subagents can't run it, so the orchestrator rebuilds between waves. Responsive variants of spacing/sizing are limited to `md:` to keep the CSS ~270 KB.
- It also defines the `--font-raleway/--font-oswald/--font-oxygen-mono/--font-roboto-serif` variables (next/font injects them on `<body>` in layout.tsx) and applies layout.tsx's body classes (`bg-background text-foreground font-sans antialiased`).
- Fonts: next/font Google families don't exist outside Next, so Latin subsets are vendored in `.design-sync/fonts/` (all SIL OFL) and wired via cfg.extraFonts. Refresh by re-fetching the Google Fonts css2 URL if layout.tsx's families change.
- Sub-parts (DialogContent, CardHeader, SelectItem…) are excluded as cards via `componentSrcMap: null` — they stay exported on `window.CuriouslyCory` and appear in the parent's authored examples. Grouping them via compounds isn't possible (shadcn exports are flat; the converter's compound path would also emit wrong `Parent.Sub` guidance), and doc-stub regrouping would drop the `## Examples` section from `.prompt.md`.
- `.design-sync/extra-exports.ts` (cfg.extraEntries) adds the lucide icons the site imports, sonner's `toast`, and react-hook-form's `useForm` to the global — the design agent can only import from the bundle global, so `<Form>` and `<Toaster>` are unusable without them.
- `eslint.config.js` ignores `.ds-sync`, `ds-bundle`, `.design-sync/.cache`, `.design-sync/previews` — previews import `"curiouslycory.com"`, which only resolves inside the converter's preview build. `tsconfig.json` excludes `ds-bundle` (its `**/*.js` + `checkJs` would typecheck the 2 MB bundle); dot-dirs are already skipped by tsconfig globs, so `.design-sync/extra-exports.ts` is listed in `include` explicitly for typed linting.
- The site's own Tailwind build auto-scans non-gitignored files, so classes used only in `.design-sync/previews/*.tsx` also land in the site CSS (a handful of utilities — harmless).
- Playwright: the machine's cached chromium is build 1208 → `playwright@1.58.2` installed into `.ds-sync/`.

## Re-sync commands (from repo root)
1. Stage scripts: `mkdir -p .ds-sync && cp -r <skill>/package-build.mjs <skill>/package-validate.mjs <skill>/package-capture.mjs <skill>/resync.mjs <skill>/lib <skill>/storybook .ds-sync/`, then `(cd .ds-sync && npm i esbuild ts-morph @types/react playwright@<version matching ~/.cache/ms-playwright chromium>)`.
2. `node .design-sync/build.mjs` (always — the converter reads only the generated wrapper).
3. Save the project's `_ds_sync.json` to `.design-sync/.cache/remote-sync.json`.
4. `node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json` (no `--entry` flag — cfg.entry covers it).

## Known render warns
- `[FONT_MISSING] "Cambria"` — it's a trailing system fallback in Tailwind's default serif stack after `Roboto Serif`, which ships. Nothing renders in Cambria.
- `[GRID_OVERFLOW]` on Command/Pagination is resolved by `cardMode: "column"`; overlays (Dialog, Drawer, DropdownMenu, Popover, Select, Toaster) are single-mode 900x600 with an explicit `primaryStory` (the site's own composition, or the open state).

## Preview authoring gotchas (from the first sync's waves)
- Overlays render open via `defaultOpen` on the Radix/vaul root. DropdownMenu stories use `modal={false}` so open menus in separate stories don't block each other through body pointer-events/aria-hidden (two open menus in the SAME story still close each other — see Dark-mode stories); Popover-with-inputs uses `onOpenAutoFocus={(e) => e.preventDefault()}` to avoid selected-text captures.
- Toaster: the card template's single-story root has `transform: translateZ(0)`, which becomes the containing block for sonner's inline `position: fixed` toaster — stories give the wrapper `minHeight: 552`. Each story uses its own `<Toaster id>` + `toast(..., { toasterId, id, duration: Infinity })` so toasts don't pile up across cells. Never name an export `Error` (shadows the global).
- Form: `useForm` comes from the bundle global; `form.setError` in a `useEffect` shows FormMessage states statically.
- Command: pass `value` to `CommandInput` to render the `CommandEmpty` state statically.
- ChatBubble is `inline-block` but still stretches in grid/flex — wrap in `justify-items-start` / `flex`.
- CodeBlock's real props are `children: string` + `language`; long lines break mid-word (`break-all`), so keep sample lines short.
- CcLogo is hard-coded to a light fill — only place it on dark surfaces (`bg-foreground`); its `height`/`width` props take Tailwind class strings (`"h-10"`).

## Dark-mode stories (added in the second sync)
- Every component has a `Dark` export (Card and DropdownMenu have a second one). Inline components wrap the composition in `<div className="dark bg-background text-foreground rounded-lg p-6">` — the `dark` variant is `&:is(.dark *)`, so it applies to descendants. Overlays (Dialog, Drawer, DropdownMenu, Popover, Select, Toaster) portal to `<body>`, so their Dark stories add `dark` to `<html>` in a `useEffect` (with cleanup) like next-themes does, and wrap the story in `bg-background text-foreground min-h-screen p-6` because the card template paints its own light background. Safe only in single-mode cards (one story per page).
- Changing a preview clears ALL its grades — regrade every cell, not just Dark.
- Two `defaultOpen` DropdownMenus in one story close each other (the second takes focus → the first closes → focus returns → the second closes), even with `modal={false}`. One open menu per story.
- Sonner's `<Toaster>` takes its theme from next-themes' `useTheme()`, not the `dark` class. Without a ThemeProvider (Claude Design, previews) it falls back to "system", so dark stories pass `theme="dark"` — the value the site's provider supplies.
- `.dark` must carry `color-scheme: dark` (next-themes sets it inline on the live site, but nothing else would).
- ChatBubble grids need `items-start` or bubbles stretch to the row's tallest; leave ~3.5rem below bottom-trailing thought bubbles.

## Component-source defects surfaced by the sync
Fixed in the same PR as the first sync (#57): Accordion now renders its chevron and has `accordion-down/up` keyframes in globals.css; Skeleton uses `bg-foreground/10` (was `bg-accent`, invisible on light surfaces); ChatBubble thought dots trail away along each speech tail's axis and anchor, largest first (top/bottom and the bottom corners stack vertically; left/right/rightBottom run horizontally), and the `top` speech tail now points up (it pointed right). `/contact` got `mb-10` (was `mb-8`) so the downward trail clears the form card.
- Still open: sonner toasts use sonner's system font stack, not Raleway (same on the live site). `TwitchLiveStatus.tsx` hand-rolls a `bg-gray-200` pulse that could be `<Skeleton>` (and is wrong in dark mode).

## Skipped states
- Interaction-only states (hover, focus rings), Skeleton/Badge pulse animations, Select with a scrolling list (doesn't fit 900x600).

## Re-sync risks
- `componentSrcMap` nulls enumerate current sub-part names; a new sub-part export added to `src/components/ui/*` will show up as a new floor card until it's nulled (or given a preview if it's a real root).
- `.design-sync/extra-exports.ts` hand-lists the lucide icons the site imported at sync time; new icons used in src won't reach the design agent until added.
- The Tailwind `@source inline(...)` vocabulary in `tailwind.css` is hand-curated; a class the design agent uses that isn't listed (or in src/previews) renders unstyled silently. Arbitrary values (`w-[300px]`) only exist if some source file uses them.
- Vendored fonts are pinned Google Fonts files; if layout.tsx changes families/weights, re-fetch.
- Toaster previews depend on the card template's `translateZ(0)` behaviour (the `minHeight: 552` workaround); if the converter's card template changes, re-check the Toaster sheet.
- The `.d.ts` contracts come from `tsc` declarations of src — a tsc upgrade or tsconfig change can alter them.
- `[RENDER] root empty` can flake when validate runs concurrently with a heavy capture (seen once on Accordion/Card/CcLogo/Form with 46–86 KB screenshots and no errors); re-run validate alone before chasing it.
- CcLogo is `fill-current stroke-current` since the dark-mode pass: any wrapper must set a text color (`bg-foreground text-background` for the site's bars) or the logo inherits the page text color and can vanish.
