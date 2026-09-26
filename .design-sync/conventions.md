# CuriouslyCory UI — conventions

shadcn/ui ("new-york") components styled with Tailwind v4 utility classes and semantic CSS-variable tokens. Every export lives on `window.CuriouslyCory`.

## Setup
- No provider is needed. `styles.css` already styles `<body>` with `bg-background text-foreground font-sans antialiased` and loads the brand fonts.
- **Dark mode:** put `class="dark"` on `<html>` or any ancestor. Every token below swaps automatically, so never hand-pick dark colors.
- **Exports are flat.** Use `DialogContent`, `CardHeader`, `SelectItem` (never `Dialog.Content`). Always compose sub-parts inside their root: `Card`, `Dialog`, `Drawer`, `Popover`, `DropdownMenu`, `Select`, `Tabs`, `Accordion`, `Table`, `Command`, `Pagination`, `Alert`, and `Form` (driven by `useForm` from the global).
- **Toasts:** render one `<Toaster position="bottom-right" richColors />` near the page root, then call `toast.success("…", { description })` or `toast.error("…")`.
- **Icons:** lucide icons are on the global (`Send`, `ArrowRight`, `ExternalLink`, `Download`, `Search`, `Sparkles`, `Moon`, `Sun`, `Menu`, `X`, `Check`, `ChevronDown`, and others). Inside `Button` they auto-size to 16px.

## Styling idiom: Tailwind utilities with semantic tokens
Only precompiled classes exist; there is no JIT. Arbitrary values such as `w-[300px]` won't resolve, so use `style={{…}}` for one-offs.

| Family | Classes |
|---|---|
| Surfaces | `bg-background`, `bg-card`, `bg-popover`, `bg-muted`, `bg-accent`, `bg-surface-elevated`, `bg-surface-sunken` |
| Brand | `bg-primary`/`text-primary` (orange), `bg-secondary`/`text-secondary` (sky), `bg-destructive`; opacity steps like `bg-primary/10`, `hover:bg-primary/90` |
| Text | `text-foreground`, `text-muted-foreground`, `text-card-foreground`, `text-primary-foreground` |
| Lines | `border`, `border-border`, `border-input`, `ring-ring`, `rounded-md`/`lg`/`xl`/`full` |
| Type | `font-sans` (Raleway, default), `font-oswald` (display headings), `font-serif` (Roboto Serif), `font-mono` (Oxygen Mono); `text-xs`…`text-6xl`, plus the fluid `text-display` and `text-heading` |
| Layout | `flex`, `grid`, `grid-cols-1..6/12`, `gap-*`, `p-*`/`m-*` (0–32), `max-w-sm..7xl`, `mx-auto`, with the `sm:`/`md:`/`lg:` prefixes |

- **Headings:** follow the site pattern `font-oswald text-2xl font-semibold tracking-tight`. Add `<div className="heading-accent" />` under a section title for the orange rule, or use `h-underline` for an orange underline.
- **Long-form text:** wrap it in `prose`.
- **Copy voice:** playful space/astronaut, e.g. "Send Transmission", "Stay in orbit", "Quest Log".

## Where the truth lives
- `styles.css` → `_ds_bundle.css` holds every available class and the `:root`/`.dark` token values.
- Each `components/general/<Name>/<Name>.prompt.md` has the component's props and verified examples; `<Name>.d.ts` is its API.

## Gotchas
- `CcLogo` has a light, hard-coded fill: put it only on dark surfaces (`bg-foreground`). Its `height`/`width` props take class strings, e.g. `height="h-10"`.
- `AccordionTrigger` renders no chevron by itself. Pass `<ChevronDown className="size-4 text-muted-foreground" />` after the label; it rotates when open.
- `Skeleton` is faint in light mode; add `className="bg-foreground/10"`.
- `CodeBlock` takes the code as `children` (a string) plus `language`. Keep its lines short.

## Example
```jsx
const { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter, Badge, Button, ExternalLink } = window.CuriouslyCory;

<section className="mx-auto max-w-5xl px-4 py-12">
  <h2 className="font-oswald text-2xl font-semibold tracking-tight">Projects</h2>
  <div className="heading-accent mb-8" />
  <div className="grid gap-6 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle className="font-oswald text-xl tracking-tight">CareerCraft Studio</CardTitle>
        <CardDescription>An AI career assistant that tailors resumes to each job posting.</CardDescription>
        <CardAction><Badge variant="secondary">Live</Badge></CardAction>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Badge variant="outline">Next.js</Badge>
        <Badge variant="outline">LangGraph</Badge>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm"><ExternalLink />Visit</Button>
        <Button size="sm" variant="ghost">Read the write-up</Button>
      </CardFooter>
    </Card>
  </div>
</section>
```
