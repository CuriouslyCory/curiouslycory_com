# PRD: Design Polish Overhaul

## Introduction

Polish curiouslycory.com from "charming first pass" to "developer portfolio that makes people want to hire you." The site already has exceptional personality — animated astronaut hero, bat-wing blog cards with a catching quest system, cursor follower, warm orange/cream palette. But it has broken blog typography, inconsistent heading hierarchy, samey card interactions, a one-line footer, and a homepage that reads as a stack of centered boxes. This overhaul keeps every whimsical element intact, fixes foundational issues, adds professional craft, and layers in hidden delight that rewards the curious.

Three design agents (UI Designer, Visual Storyteller, Whimsy Injector) reviewed and contributed to the plan. Their feedback is incorporated throughout.

## Goals

- Fix broken blog prose styling (10+ posts use `prose` classes with no plugin installed)
- Unify the color system (warm-tint all neutral tokens to match the cream/orange palette)
- Establish consistent typography hierarchy using existing font families
- Add mobile navigation (currently no hamburger menu — functional gap)
- Differentiate card interaction patterns by content type
- Redesign the homepage layout from centered stack to asymmetric composition
- Create a proper footer, branded loading state, and personality-driven contact form
- Add Easter eggs (404 page, Konami code, seasonal bats, telescope cursor)
- Pass `pnpm lint`, `pnpm typecheck`, and `pnpm build` after every story

## ⚠️ Sacred Elements — Do Not Break

These features are the site's most differentiating elements. Every story must explicitly protect them:

1. **Bat-wing quest system** — Files: `src/components/blog-post-bats.tsx`, quest/inventory pipeline. Cards fly across screen with flapping `animate-rotate-15` wings, get caught with net cursor, trigger RPG-style toast dialogue. New card hover styles must NOT apply to BlogPostBats cards.
2. **Astronaut + sun animation** — Files: `src/components/astronaut.tsx`, `.astronaut-sun-bg` in `src/styles/globals.css`. Uses `@property`-based CSS hue rotation with conic gradients. Do not modify.
3. **CursorFollower** — File: `src/components/cursor-follower.tsx`. Renders active inventory item at cursor via `translate3d` with `position: fixed`. Any page-level wrappers must not z-index-collide.
4. **ChatBubble system** — File: `src/components/ui/chat-bubble.tsx`. Has speech/whisper/thought/scream variants. Expand usage, do not change the component itself.

## User Stories

---

### US-001: Install @tailwindcss/typography and configure prose styling
**Description:** As a visitor reading blog posts, I want properly styled prose so paragraphs have spacing, lists have markers, blockquotes look distinct, and the text is readable.

**Acceptance Criteria:**
- [ ] Run `pnpm add @tailwindcss/typography`
- [ ] Add `@plugin '@tailwindcss/typography';` to `src/styles/globals.css` (after the existing `@plugin 'tailwindcss-animate';` on line 3)
- [ ] Add prose customization in `@layer base` in `src/styles/globals.css`:
  ```css
  .prose {
    --tw-prose-body: var(--foreground);
    --tw-prose-headings: var(--foreground);
    --tw-prose-links: var(--primary);
    --tw-prose-bold: var(--foreground);
    --tw-prose-bullets: var(--primary);
    --tw-prose-code: var(--foreground);
    max-width: 65ch;
  }
  .prose h2 { @apply font-oswald tracking-tight; }
  .prose a { @apply text-primary decoration-primary/40 underline-offset-2 hover:decoration-primary; }
  .prose code { @apply font-mono rounded bg-muted px-1.5 py-0.5 text-sm; }
  ```
- [ ] Verify at least 3 blog posts render with visible paragraph spacing, styled lists, and styled blockquotes (check `/blog/custom-developer-blog`, `/blog/building-careercraft-studio`, `/blog/typescript-key-vs-optional`)
- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm build` succeeds

**Dependencies:** None — do this first.

---

### US-002: Fix text-4xl on FavoriteTech labels
**Description:** As a visitor, I want tech icon labels to be subordinate to the icons, not dominating them at 2.25rem.

**Acceptance Criteria:**
- [ ] In `src/components/favorite-tech.tsx` line 57, change `className="text-4xl"` to `className="text-sm font-medium"`
- [ ] Verify the 15 tech icons display with small labels below each icon
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds

**Dependencies:** None.

---

### US-003: Warm-tint neutral color tokens
**Description:** As a visitor, I want the site's cards, borders, and muted elements to feel cohesive with the warm cream background, not cold gray.

**Acceptance Criteria:**
- [ ] In `src/styles/globals.css`, update `:root` (light mode) CSS variables:
  - `--card`: change from `hsl(0, 0%, 100%)` to `hsl(36, 16%, 99%)`
  - `--card-foreground`: change from `hsl(0, 0%, 3.9%)` to `hsl(23, 8%, 8%)`
  - `--popover`: change to `hsl(36, 16%, 99%)`
  - `--popover-foreground`: change to `hsl(23, 8%, 8%)`
  - `--muted`: change from `hsl(0, 0%, 96.1%)` to `hsl(30, 10%, 95%)`
  - `--muted-foreground`: change from `hsl(0, 0%, 45.1%)` to `hsl(23, 4%, 45%)`
  - `--accent`: change from `hsl(0, 0%, 96.1%)` to `hsl(30, 10%, 95%)`
  - `--accent-foreground`: change from `hsl(0, 0%, 9%)` to `hsl(23, 6%, 12%)`
  - `--border`: change from `hsl(0, 0%, 89.8%)` to `hsl(30, 8%, 88%)`
  - `--input`: change to `hsl(30, 8%, 88%)`
- [ ] In `src/styles/globals.css`, update `.dark` CSS variables:
  - `--card`: change from `hsl(0, 0%, 4.9%)` to `hsl(240, 8%, 7%)`
  - `--card-foreground`: change from `hsl(0, 0%, 98%)` to `hsl(36, 18%, 95%)`
  - `--popover`: change from `hsl(0, 0%, 3.9%)` to `hsl(240, 8%, 7%)`
  - `--popover-foreground`: change to `hsl(36, 18%, 95%)`
  - `--muted`: change from `hsl(0, 0%, 14.9%)` to `hsl(240, 6%, 16%)`
  - `--muted-foreground`: change from `hsl(0, 0%, 63.9%)` to `hsl(36, 10%, 65%)`
  - `--accent`: change to `hsl(240, 6%, 16%)`
  - `--accent-foreground`: change to `hsl(36, 18%, 95%)`
  - `--border`: change from `hsl(0, 0%, 14.9%)` to `hsl(240, 6%, 18%)`
  - `--input`: change to `hsl(240, 6%, 18%)`
- [ ] Visually verify cards, borders, and muted text feel warm (not gray) in both light and dark mode
- [ ] `pnpm build` succeeds

**Dependencies:** None.

---

### US-004: Fix footer palette clash
**Description:** As a visitor, I want the footer color to harmonize with the warm site palette instead of clashing with cold sky-blue.

**Acceptance Criteria:**
- [ ] In `src/app/layout.tsx` line 79, change the footer's `bg-secondary` class to use a warm dark neutral (e.g., `bg-foreground text-background` to match the nav bar, or `bg-muted`)
- [ ] Footer text remains readable in both light and dark mode
- [ ] `pnpm build` succeeds

**Dependencies:** US-003 (warm-tinted tokens should be in place first for `bg-muted` to look right).

---

### US-005: Fix hardcoded resume colors
**Description:** As a visitor using dark mode, I want resume section titles to use theme tokens instead of hardcoded gray.

**Acceptance Criteria:**
- [ ] In `src/styles/globals.css`, replace the `.resume-section-title` rule (currently `@apply mb-2 pb-1 font-oswald text-2xl text-gray-800 dark:text-foreground;`) with:
  ```css
  .resume-section-title {
    @apply mb-3 pb-1 font-oswald text-xl font-semibold text-foreground border-b border-border;
  }
  ```
- [ ] Verify resume page headings render correctly in both light and dark mode at `/cv`
- [ ] `pnpm build` succeeds

**Dependencies:** None.

---

### US-006: Fix /blog trailing space bug
**Description:** As a visitor clicking "Read My Blog" on the homepage, I want to navigate to `/blog` not `/blog ` (with trailing space).

**Acceptance Criteria:**
- [ ] In `src/app/page.tsx` line 107-108, change `href="/blog "` to `href="/blog"`
- [ ] Verify the "Read My Blog" link navigates to `/blog` without a trailing space in the URL
- [ ] `pnpm build` succeeds

**Dependencies:** None.

---

### US-007: Refactor CTA buttons to use Button component
**Description:** As a developer, I want the homepage CTA buttons to use the design system Button component instead of hand-rolled inline styles with hardcoded colors.

**Acceptance Criteria:**
- [ ] In `src/app/page.tsx`, import `Button` from `~/components/ui/button`
- [ ] Replace the "View My Resume" `<Link>` (lines 100-105) with `<Button asChild size="lg"><Link href="/cv">View My Resume</Link></Button>`
- [ ] Replace the "Read My Blog" `<Link>` (lines 106-111) with `<Button asChild variant="outline" size="lg"><Link href="/blog">Read My Blog</Link></Button>`
- [ ] Remove all inline color classes (`bg-orange-500`, `border-gray-300`, `dark:border-gray-700`, `dark:hover:bg-gray-800`) from these links
- [ ] Both buttons render correctly in light and dark mode with proper hover states
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds

**Dependencies:** US-006 (fix the trailing space in the blog href at the same time).

---

### US-008: Mobile navigation drawer
**Description:** As a mobile visitor, I want a hamburger menu so I can navigate the site, since the nav links are currently hidden on small screens.

**Acceptance Criteria:**
- [ ] In `src/components/navigation.tsx`, add a hamburger menu icon (use `Menu` from `lucide-react`) visible only on mobile (`flex md:hidden`)
- [ ] Clicking the hamburger opens the existing `Drawer` component from `src/components/ui/drawer.tsx`
- [ ] Drawer contains all nav items from the `navItems` array, each as a link with `min-h-12` touch targets and `text-lg` font size
- [ ] Active route shows an orange left border (`border-l-2 border-primary`)
- [ ] Drawer closes automatically when a nav link is clicked (use `useEffect` watching `pathname`)
- [ ] Desktop navigation (`hidden md:flex`) remains unchanged
- [ ] The theme toggle is accessible in the mobile drawer
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds
- [ ] **Verify in browser:** test on 375px viewport width

**Dependencies:** None.

---

### US-009: Branded orbital loading spinner
**Description:** As a visitor seeing a loading state, I want a branded animation that matches the site's space theme instead of a generic gray spinner.

**Acceptance Criteria:**
- [ ] In `src/app/loading.tsx`, replace the current spinner with:
  - 3 orange dots (`bg-primary`) at 120° offset, each ~8px (`h-2 w-2 rounded-full`), orbiting a center point
  - Orbit period: 1.5-2s per revolution
  - Each dot has a subtle scale pulse (0.8 → 1.0) so they "breathe"
  - Uses Motion library (`motion/react`) for animations
- [ ] Add a `<p className="font-mono text-sm text-muted-foreground">` below the loader that randomly displays one of: "Calibrating star charts...", "Deploying bat signal...", "Asking the cat for directions..."
- [ ] No `border-gray-900` or `dark:border-white` hardcoded colors remain
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds

**Dependencies:** None.

---

### US-010: Consistent heading hierarchy with Oswald
**Description:** As a visitor, I want a consistent typographic hierarchy across all pages so the site feels intentionally designed, not ad-hoc.

**Acceptance Criteria:**
- [ ] All section H2 headings across the site use `font-oswald text-2xl font-semibold tracking-tight`
- [ ] Update these specific headings:
  - `src/app/page.tsx`: "A little about me" CardTitle
  - `src/components/favorite-tech.tsx`: "My Main Toolbox" h2
  - `src/components/my-links.tsx`: "My Links" h2
- [ ] For page-level H1 headings, test `font-oswald font-bold tracking-tight` at the display size. If it looks pinched/too condensed, keep Raleway bold for H1s. Update:
  - `src/app/blog/page.tsx` — page h1
  - `src/app/projects/page.tsx` — page h1
  - `src/app/contact/page.tsx` — page h1
- [ ] Card titles (inside `CardTitle` components) remain in Raleway (font-sans) — do not add font-oswald to these
- [ ] `pnpm build` succeeds
- [ ] **Verify in browser:** check homepage, blog listing, projects, and contact pages

**Dependencies:** None.

---

### US-011: Fluid type scale custom properties
**Description:** As a visitor on any device, I want heading sizes to scale smoothly instead of jumping abruptly at breakpoints.

**Acceptance Criteria:**
- [ ] In `src/styles/globals.css` inside the `@theme inline` block, add:
  ```css
  --text-display: clamp(2.25rem, 1.5rem + 3vw, 3rem);
  --text-heading: clamp(1.875rem, 1.5rem + 1.5vw, 2.25rem);
  ```
- [ ] Use `text-[length:var(--text-display)]` for hero/blog post titles where fluid sizing is appropriate
- [ ] Use `text-[length:var(--text-heading)]` for page-level H1 headings
- [ ] Verify smooth text scaling by resizing browser from 375px to 1280px — no abrupt jumps
- [ ] `pnpm build` succeeds

**Dependencies:** None.

---

### US-012: Refine heading accent bar
**Description:** As a visitor, I want heading accent bars to feel refined and reusable across the site.

**Acceptance Criteria:**
- [ ] In `src/styles/globals.css`, add in `@layer base`:
  ```css
  .heading-accent {
    @apply mt-2 h-0.5 w-12 rounded-full bg-primary;
  }
  ```
- [ ] In `src/app/page.tsx`, replace the existing `<div className="h-1 w-20 bg-orange-500"></div>` (line 61) with `<div className="heading-accent"></div>`
- [ ] Apply `.heading-accent` to other section headings where appropriate (FavoriteTech, MyLinks)
- [ ] `pnpm build` succeeds

**Dependencies:** None.

---

### US-013: Roboto Serif for blog titles and pull quotes
**Description:** As a blog reader, I want an editorial accent on blog post titles and blockquotes that differentiates the reading experience from the rest of the site.

**Acceptance Criteria:**
- [ ] Blog post hero titles (the H1 on individual blog post pages) get `font-serif` class added
- [ ] In `src/styles/globals.css`, add prose blockquote styling:
  ```css
  .prose blockquote { @apply font-serif italic; }
  ```
- [ ] Blog body text remains in Raleway (font-sans) — do NOT add `font-serif` to the `.prose` base rule
- [ ] Blog card excerpts in `src/components/blog/post-card.tsx` remain in Raleway
- [ ] Verify on at least 2 blog posts that titles show in Roboto Serif and body text stays in Raleway
- [ ] `pnpm build` succeeds

**Dependencies:** US-001 (typography plugin must be installed first).

---

### US-014: Focus-visible audit
**Description:** As a keyboard user, I want consistent visible focus indicators on all interactive elements.

**Acceptance Criteria:**
- [ ] Navigation links in `src/components/navigation.tsx` have `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` (or equivalent using the `--ring` token)
- [ ] Social link cards in `src/components/my-links.tsx` have visible focus indicators
- [ ] All homepage CTA buttons have visible focus (should come for free from Button component after US-007)
- [ ] Tab through the entire homepage and verify every interactive element has a visible focus ring
- [ ] `pnpm build` succeeds

**Dependencies:** US-007 (CTA buttons should use Button component first).

---

### US-015: Blog PostCard hover — lift effect
**Description:** As a visitor browsing blog posts, I want blog cards to feel like picking up a piece of paper — a subtle lift with deepening shadow.

**Acceptance Criteria:**
- [ ] In `src/components/blog/post-card.tsx`, wrap the Card in a `motion.div` (or make Card a motion component) with `whileHover={{ y: -4 }}` and `transition={{ type: "spring", stiffness: 300, damping: 25 }}`
- [ ] Add `group` class to the Card's Link wrapper
- [ ] Change image hover from `hover:scale-105` to `group-hover:scale-110` with `duration-700` (slower, triggered by card hover not image hover)
- [ ] Add `group-hover:text-primary transition-colors duration-300` to the CardTitle
- [ ] Use `transition-[box-shadow,border-color] duration-200` (NOT `transition-all`) for shadow changes
- [ ] **Critical:** Verify that `BlogPostBats` component's cards are NOT affected — those cards use their own `whileHover={{ scale: 1.05 }}` and must remain unchanged
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds

**Dependencies:** None.

---

### US-016: Project card hover — border glow
**Description:** As a visitor browsing projects, I want project cards to have a distinct glow interaction that feels different from blog cards.

**Acceptance Criteria:**
- [ ] In `src/components/projects-filter.tsx`, add to the project Card: `hover:shadow-[0_0_20px_-5px_var(--primary)]` and `transition-shadow duration-200`
- [ ] Add `group` class to the card wrapper
- [ ] Action buttons (Code, View Project) get: `opacity-70 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200`
- [ ] Stagger button appearance: second button gets `delay-75`
- [ ] `pnpm build` succeeds

**Dependencies:** None.

---

### US-017: Link card hover — bouncy spring
**Description:** As a visitor viewing social links, I want the link cards to have a playful, bouncy interaction that matches the site's whimsical personality.

**Acceptance Criteria:**
- [ ] In `src/components/my-links.tsx`, wrap each link card in a `motion.div` (import from `motion/react`)
- [ ] Add `whileHover={{ scale: 1.08, rotate: -2 }}` with `transition={{ type: "spring", stiffness: 400, damping: 15 }}`
- [ ] Add `hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]` to the link card className
- [ ] Remove any existing `hover:scale-105` from these cards (replaced by Motion hover)
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds

**Dependencies:** None.

---

### US-018: Interactive FavoriteTech section
**Description:** As a visitor, I want the tech toolbox to animate in on scroll and respond to hover, showcasing frontend craft.

**Acceptance Criteria:**
- [ ] Convert `src/components/favorite-tech.tsx` to a client component (`"use client"` directive)
- [ ] Import `motion` from `motion/react`
- [ ] Wrap each tech item in `motion.div` with:
  - `initial={{ opacity: 0, y: 20, scale: 0.9 }}`
  - `whileInView={{ opacity: 1, y: 0, scale: 1 }}`
  - `transition={{ duration: 0.4, delay: index * 0.05 }}` (total cascade ~0.75s for 15 items)
  - `viewport={{ once: true }}`
- [ ] Each tech item gets `whileHover={{ y: -8, scale: 1.05 }}` with `transition={{ type: "spring", stiffness: 400, damping: 20 }}`
- [ ] Add hover background pill: `hover:bg-primary/10 rounded-xl p-4 transition-colors duration-200`
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds

**Dependencies:** US-002 (fix text-4xl labels first).

---

### US-019: Subversive code block terminal bar
**Description:** As a blog reader, I want code blocks to have a terminal-style title bar where the red dot actually minimizes the block — a playful surprise.

**Acceptance Criteria:**
- [ ] In `src/components/ui/code-block.tsx`, add a title bar above the syntax highlighter:
  - Three dots: red (`bg-red-500/60`), yellow (`bg-yellow-500/60`), green (`bg-green-500/60`), each `h-2.5 w-2.5 rounded-full`
  - Language name displayed on the right in `text-xs text-muted-foreground font-mono`
  - Bar background: `bg-zinc-800 px-4 py-2 rounded-t-md` (adjust syntax highlighter to remove its own top border-radius)
- [ ] The red dot is a `<button>` with `aria-label="Collapse code block"`. Clicking it:
  - Collapses the code to a single bar showing `// collapsed — click to expand` in muted monospace
  - Uses Motion `AnimatePresence` for smooth height transition
  - Clicking the collapsed bar restores the code
- [ ] Enable line numbers: change `showLineNumbers` to `true`
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds

**Dependencies:** None.

---

### US-020: Footer redesign
**Description:** As a visitor, I want a proper footer that closes the experience with identity, navigation, and a personality moment — not just a copyright line.

**Acceptance Criteria:**
- [ ] Create `src/components/footer.tsx` as a client component
- [ ] Import and reuse: `CcLogo` from `~/components/ui/cc-logo`, `SOCIALS` from `~/data/socials`, navigation items
- [ ] Layout: 3-column grid on desktop (`md:grid-cols-3`), stacked on mobile
  - Column 1: `<CcLogo />` + tagline "Building things that make people's lives easier."
  - Column 2: "Explore" heading + links to Home, Resume/CV, Projects, Blog, Contact
  - Column 3: "Find Me" heading + compact row of social icons from `SOCIALS` data with `hover:text-primary`
- [ ] Bottom bar: `© {year} CuriouslyCory` on left. On right, in `font-mono text-xs opacity-60`:
  - Light mode: `// end of transmission`
  - Dark mode: `// signing off for the night`
  - Use `useTheme()` from `next-themes` or a conditional class to switch
- [ ] Footer tagline has a typing animation (characters appear one-by-one) triggered by `whileInView`
- [ ] Gradient line at top of footer: `<div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />`
- [ ] In `src/app/layout.tsx`, replace the existing inline footer (lines 79-84) with `<Footer />`
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds
- [ ] **Verify in browser:** check both light and dark mode, verify tagline switches

**Dependencies:** US-004 (footer palette fix should inform the new footer's color choices).

---

### US-021: Contact form personality
**Description:** As a potential collaborator visiting /contact, I want the form to feel like a conversation with the astronaut, not a cold HTML form.

**Acceptance Criteria:**
- [ ] In `src/app/contact/page.tsx`:
  - Import `ChatBubble` from `~/components/ui/chat-bubble` and `Card` from `~/components/ui/card`
  - Add a ChatBubble above the form with variant `"thought"` and text: "Want to build something together? I'm all ears. Well, all helmet."
  - Wrap the form in a `<Card className="p-6">`
  - Change `max-w-md` to `max-w-lg`
- [ ] Update form labels to space theme: "Callsign" (Name), "Frequency" (Email), "Your Message" (Message), "Send Transmission" (submit button)
- [ ] Add staggered entrance: wrap each form field group in `motion.div` with `initial={{ opacity: 0, x: -10 }}`, `animate={{ opacity: 1, x: 0 }}`, `transition={{ delay: index * 0.1 }}`
- [ ] On successful submission, show toast: "Transmission received. I'll respond at lightspeed. (Results may vary.)"
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds
- [ ] **Verify in browser:** check form renders with ChatBubble, space-themed labels, and staggered entrance

**Dependencies:** None.

---

### US-022: Expand ChatBubble variant usage
**Description:** As a visitor, I want the site to use its full ChatBubble vocabulary (thought, whisper, scream) so the astronaut has a richer voice.

**Acceptance Criteria:**
- [ ] In `src/app/page.tsx` about section: add a `ChatBubble` with variant `"thought"` for an aside: "When not coding, I'm usually rock climbing or baking bread."
- [ ] In the blog search empty state (find the empty results message in the blog listing): replace with `ChatBubble` variant `"whisper"` text: "No transmissions found on that frequency."
- [ ] Verify each ChatBubble variant renders with its correct styling (thought = dotted border trail, whisper = dashed border)
- [ ] `pnpm build` succeeds

**Dependencies:** None.

---

### US-023: Asymmetric homepage hero
**Description:** As a desktop visitor, I want the homepage hero to be an asymmetric two-column layout (text left, astronaut right) instead of a centered stack.

**Acceptance Criteria:**
- [ ] In `src/app/page.tsx`, restructure the hero section:
  - **Mobile** (`md:hidden`): Keep existing ChatBubble + centered Astronaut layout exactly as-is
  - **Desktop** (`hidden md:flex`): New layout with `md:flex md:items-end md:justify-between` inside `max-w-6xl mx-auto`:
    - Left: `<div className="max-w-lg">` containing H1 ("Hi, I'm **CuriouslyCory**" with `text-primary` on the name), subtitle "and I like to build things." in `text-xl text-muted-foreground`, and CTA buttons (from US-007)
    - Right: `<div className="w-72 flex-shrink-0">` containing `<Astronaut className="translate-y-1" />`
- [ ] The Astronaut component and its sun animation must render identically to before — only the layout wrapper changes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds
- [ ] **Verify in browser:** check at 375px (mobile should look unchanged), 768px, and 1280px

**Dependencies:** US-007 (CTA buttons should already use Button component).

---

### US-024: Editorial about section
**Description:** As a desktop visitor, I want the "About me" section to use an editorial two-column layout instead of being inside a card.

**Acceptance Criteria:**
- [ ] In `src/app/page.tsx`, replace the Card-wrapped about section with:
  - Desktop: `md:grid md:grid-cols-[280px_1fr] md:gap-12` — heading on left, body text on right
  - Mobile: stacked layout, heading then text
  - Remove the `Card`, `CardHeader`, `CardContent` wrappers
  - Keep the heading "A little about me" with the `.heading-accent` bar below it
- [ ] Body text paragraphs use `text-lg leading-relaxed` for better readability
- [ ] `pnpm build` succeeds
- [ ] **Verify in browser:** check mobile (stacked) and desktop (two-column)

**Dependencies:** US-012 (heading accent bar utility should exist).

---

### US-025: Section background differentiation + surface tokens
**Description:** As a visitor scrolling the homepage, I want alternating section treatments that create visual peaks and valleys instead of a uniform background.

**Acceptance Criteria:**
- [ ] In `src/styles/globals.css`, add surface tokens in `:root`:
  ```css
  --surface-elevated: hsl(36, 20%, 99%);
  --surface-sunken: hsl(30, 16%, 93%);
  ```
- [ ] Add dark mode surface tokens in `.dark`:
  ```css
  --surface-elevated: hsl(240, 8%, 13%);
  --surface-sunken: hsl(240, 10%, 7%);
  ```
- [ ] Register in `@theme inline`:
  ```css
  --color-surface-elevated: var(--surface-elevated);
  --color-surface-sunken: var(--surface-sunken);
  ```
- [ ] In `src/app/page.tsx`, apply section backgrounds:
  - FavoriteTech section: wrap in full-bleed `<div className="bg-surface-elevated">` with internal container
  - My Links section already has inverted bg — keep as-is
- [ ] `pnpm build` succeeds
- [ ] **Verify in browser:** check light and dark mode show subtle background differentiation

**Dependencies:** None.

---

### US-026: Standardize spacing rhythm
**Description:** As a visitor, I want consistent vertical rhythm between page sections instead of arbitrary spacing values.

**Acceptance Criteria:**
- [ ] In `src/app/page.tsx`, replace all `mt-24` spacers with standardized section padding:
  - Hero section: `py-20 md:py-28`
  - Between major sections: `py-16 md:py-24`
  - Container padding: `px-4 md:px-6 lg:px-8`
- [ ] Sections become self-contained `<section>` elements with their own padding instead of relying on margin between siblings
- [ ] `pnpm build` succeeds

**Dependencies:** US-023, US-024 (homepage layout should be restructured first).

---

### US-027: Blog editorial touches
**Description:** As a blog visitor, I want the blog listing page to have an editorial feel with a hero-sized featured post and sticky sidebar.

**Acceptance Criteria:**
- [ ] In `src/app/blog/page.tsx`:
  - The first featured post in the grid spans `md:col-span-2` for a larger card
  - The date filter sidebar gets `md:sticky md:top-20` so it stays visible while scrolling
  - On mobile, wrap the sidebar in a `<details><summary>Filter by date</summary>...</details>` so it's collapsible
- [ ] `pnpm build` succeeds
- [ ] **Verify in browser:** check that featured post is wider, sidebar sticks on scroll, and mobile filter collapses

**Dependencies:** None.

---

### US-028: Page transitions (experimental)
**Description:** As a visitor navigating between pages, I want subtle transitions instead of hard cuts.

**Acceptance Criteria:**
- [ ] Investigate whether Next.js 16 supports `viewTransition` in the experimental config
- [ ] If supported: add `::view-transition-old(root)` and `::view-transition-new(root)` CSS with `opacity` animation (200ms fade)
- [ ] If not supported: create a `src/components/page-transition.tsx` wrapper using Motion: `initial={{ opacity: 0, y: 8 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.3, ease: "easeOut" }}`
- [ ] **Critical:** transitions must NOT clip or re-layer the CursorFollower (`position: fixed`) or PlayerMenu
- [ ] Keep total transition duration under 300ms
- [ ] If View Transitions API is not stable in current Next.js version, use the Motion wrapper fallback — do NOT skip this story
- [ ] If the Motion wrapper approach proves unstable with RSC, document findings and implement a minimal CSS-only fade (`@starting-style` or keyframe-based) as a last resort
- [ ] `pnpm build` succeeds

**Dependencies:** None, but do this last in Tier 4.

---

### US-029: 404 page — "Lost in Space"
**Description:** As a visitor hitting a missing page, I want a charming 404 experience that uses the site's space theme.

**Acceptance Criteria:**
- [ ] Create `src/app/not-found.tsx`
- [ ] Reuse the `Astronaut` component from `src/components/astronaut.tsx`, rendered at a smaller size, with the existing `animate-float` animation but at a slower duration (6s instead of 3s) to suggest drifting
- [ ] Add a `ChatBubble` with variant `"whisper"`: "I think we took a wrong turn at the nebula."
- [ ] Add a "Take me home" `<Button asChild><Link href="/">Take me home</Link></Button>`
- [ ] Center everything vertically on the page with `min-h-[60vh]`
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds
- [ ] **Verify in browser:** navigate to a non-existent URL like `/doesnotexist`

**Dependencies:** None.

---

### US-030: Seasonal bat behavior (October)
**Description:** As a returning visitor in October, I want the bat-wing blog cards to go wild — more bats, faster spawning, orange-tinted wings.

**Acceptance Criteria:**
- [ ] In `src/components/blog-post-bats.tsx`, add a date check: `const isSpookyMonth = new Date().getMonth() === 9;`
- [ ] When `isSpookyMonth` is true:
  - Increase `MAX_WILD_BATS` (or equivalent constant) from its current value to double
  - Decrease `SPAWN_INTERVAL` (or equivalent) by half for faster spawning
  - Add an orange tint to bat wing elements (e.g., `className` conditional adding `text-orange-500` or a CSS filter)
- [ ] When `isSpookyMonth` is false, behavior is identical to current (no regression)
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds

**Dependencies:** None. Must not modify the core quest/catch mechanics.

---

### US-031: Konami Code — Zero Gravity Mode
**Description:** As a curious visitor, I want a hidden Easter egg where the Konami code makes the page float in zero gravity.

**Acceptance Criteria:**
- [ ] Add a global `keydown` listener (in a client component at the layout level, e.g., inside `PlayerProvider` or a new `EasterEggs` component)
- [ ] Track the Konami sequence: Up Up Down Down Left Right Left Right B A (ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, KeyB, KeyA)
- [ ] On completion:
  - Add a CSS class to `<body>` (e.g., `zero-gravity`)
  - In `globals.css`, `.zero-gravity section { animation: float 3s ease-in-out infinite; }` with randomized `animation-delay` via inline styles or CSS custom properties
  - Display a `ChatBubble` with variant `"speech"`: "Oops, gravity module offline."
- [ ] Zero-gravity mode **persists across page navigations** (store state in `localStorage` or a React context that survives route changes)
- [ ] Clicking the astronaut in zero-gravity mode restores normal gravity (removes the class and clears persisted state)
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds

**Dependencies:** None.

---

### US-032: Telescope cursor — constellation discovery
**Description:** As a curious visitor, I want a hidden telescope mode that reveals secret constellations scattered across the site.

**Acceptance Criteria:**
- [ ] Add "telescope" as a new inventory item in the quest/inventory system (wherever quest items are defined — look at how "net" and "tuna" are registered)
- [ ] Add a hidden activation trigger for the telescope (e.g., clicking a specific star in the astronaut's dark-mode background, or a subtle icon in the footer). **Note:** Full quest chain integration is deferred — for now, provide a standalone way to activate it
- [ ] When the telescope is the active cursor item in `CursorFollower`, render a radial gradient reveal mask (`radial-gradient(circle 80px, rgba(255,255,255,0.15), transparent)`) around the cursor position
- [ ] Scatter 3-5 hidden star clusters across the homepage as absolutely-positioned `<div>` elements with `opacity-0 pointer-events-none`. Each cluster is a small SVG group of dots forming a simple constellation shape
- [ ] Stars within the telescope's reveal radius become visible (transition from `opacity-0` to `opacity-100`)
- [ ] Each constellation has a tiny label that fades in (e.g., "Curiosia Major", "The Debugger")
- [ ] Stars and labels are invisible without the telescope active
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds

**Dependencies:** Requires understanding the existing quest/inventory system in `blog-post-bats.tsx` and `cursor-follower.tsx`. Quest chain integration deferred — implement standalone activation for now.

---

### US-033: Astronaut dark mode discoverability
**Description:** As a visitor, I want a subtle hint that the astronaut is clickable to toggle the theme, since this feature is currently undiscoverable.

**Acceptance Criteria:**
- [ ] In `src/components/astronaut.tsx`:
  - In dark mode, when the cursor approaches within ~100px of the astronaut, increase the star pulse animation speed (from `animate-pulse` to a faster custom animation, e.g., `animation-duration: 0.5s`)
  - On first visit (check `localStorage` for a flag like `astronaut-hint-shown`), add a brief visor glint: a white highlight that sweeps across the helmet visor once, 1s after page load
  - Set the localStorage flag after the glint so it only happens once
- [ ] The astronaut's existing theme toggle `onClick` behavior is unchanged
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds

**Dependencies:** None.

---

## Functional Requirements

- FR-1: Install `@tailwindcss/typography` and configure prose styles matching the brand palette
- FR-2: All color tokens must use warm-tinted HSL values (no pure gray `hsl(0, 0%, ...)` in themed tokens)
- FR-3: All heading elements must follow the Oswald (H2) / Raleway (card titles) hierarchy
- FR-4: Mobile navigation must be functional at 375px viewport width with 48px minimum touch targets
- FR-5: Blog PostCard, Project Card, and Link Card must have distinct hover interactions
- FR-6: BlogPostBats cards must be explicitly excluded from new hover styles
- FR-7: CursorFollower and PlayerMenu must remain functional and visible above all other elements
- FR-8: All interactive elements must have visible `:focus-visible` indicators
- FR-9: Footer must display `// end of transmission` in light mode and `// signing off for the night` in dark mode
- FR-10: Contact form must use space-themed microcopy
- FR-11: 404 page must use the Astronaut component
- FR-12: Konami code listener must not interfere with normal keyboard usage (form inputs, etc.)
- FR-13: `pnpm lint`, `pnpm typecheck`, and `pnpm build` must pass after every story

## Non-Goals (Out of Scope)

- No content rewrites (blog post text, about section copy beyond specified changes)
- No new blog features (comments, likes, RSS feed)
- No backend changes (database schema, API routes, tRPC routers)
- No authentication changes
- No SEO overhaul (beyond what comes naturally from better HTML structure)
- No performance optimization sprint (image compression, lazy loading, bundle analysis)
- No Tailwind v4 migration work (already on v4)
- No new pages beyond the 404 page

## Design Considerations

- **Existing components to reuse:** `CcLogo` (`src/components/ui/cc-logo.tsx`), `SOCIALS` (`src/data/socials.ts`), `navItems` (export from `src/components/navigation.tsx`), `ChatBubble` (`src/components/ui/chat-bubble.tsx`), `Button` (`src/components/ui/button.tsx`), `Card` (`src/components/ui/card.tsx`), `Drawer` (`src/components/ui/drawer.tsx`), `Badge` (`src/components/ui/badge.tsx`)
- **Animation library:** Use `motion/react` (already installed as `motion` v12.38.0) — NOT `framer-motion`
- **Color palette:** Warm cream (light bg), navy (dark bg), orange-500 (primary), sky-600 (secondary)
- **Fonts:** Raleway (body), Oswald (headings), Oxygen Mono (code), Roboto Serif (blog titles/quotes)

## Technical Considerations

- **Page transitions + RSC:** `AnimatePresence` conflicts with React Server Components streaming. CSS View Transitions API is the safer path. Mark as experimental.
- **Fixed-position elements:** CursorFollower and PlayerMenu use `position: fixed`. Any layout wrappers or page transitions must not create new stacking contexts that clip these.
- **Client vs Server components:** Converting `FavoriteTech` to a client component (for Motion) is fine — it has no server-side data fetching. Blog post pages are already server components with client component children.
- **Font loading:** All 4 font families are already loaded in `layout.tsx`. No additional font imports needed.

## Success Metrics

- All blog posts display properly styled prose (paragraphs, lists, blockquotes, code)
- Mobile navigation is functional at all viewport widths
- No pure gray color tokens remain in themed CSS variables
- 3+ distinct card hover patterns visible across the site
- Footer displays identity, navigation, and social links
- 404 page renders the astronaut with themed copy
- Konami code activates zero-gravity mode
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` all pass

## Resolved Questions

- **Telescope cursor quest chain:** WIP — the quest/inventory system integration is deferred. US-032 should be implemented as a standalone feature for now, with a hardcoded way to activate the telescope (e.g., a hidden trigger). Quest chain integration will come later.
- **Zero-gravity persistence:** Konami code zero-gravity mode persists across page navigations (use localStorage or React context).
- **Page transitions:** Do NOT skip if View Transitions API is unavailable. Fall back to Motion wrapper, then to CSS-only fade as last resort.

## Open Questions

- None currently blocking implementation.
