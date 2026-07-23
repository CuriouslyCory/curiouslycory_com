#!/usr/bin/env node
// Flags HTML entities in a blog post's page.tsx.
//
// Why this exists: Next 16's SWC JSX transform mishandles the whitespace of a
// text node that contains a named HTML entity (`&mdash;`, `&ldquo;`, `&apos;`…).
// When such a node sits next to an inline element (<strong>/<em>/<code>), the
// space between them is silently DROPPED at build time — e.g. `titles</strong>and`
// instead of `titles</strong> and`. It's a compile-time deletion, so no CSS can
// fix it; the space is simply absent from the shipped HTML. Proven by reducing it
// to a minimal repro: swapping `&mdash;` for the literal `—` makes the space
// survive. So the reliable prevention is to keep HTML entities out of post JSX.
//
// The fix the author should apply:
//   • Typographic characters — use the literal Unicode glyph, not the entity:
//       &mdash;→—   &ndash;→–   &hellip;→…   &ldquo;→“  &rdquo;→”  &lsquo;→‘  &rsquo;/&apos;→’
//       &nbsp;→ a normal space (or a literal non-breaking space where truly needed)
//   • Reserved JSX characters (< > { } &) — use a JS string expression, not an
//     entity: write {"<slug>"} rather than &lt;slug&gt;. That renders the literal
//     character as its own node, with no entity to trip the transform.
//
// Prints each entity as file:line and exits 1 if any are found (0 when clean), so
// it can gate the skill's verification step. Read-only; never edits the post.

import { readFileSync } from "node:fs";

const files = process.argv.slice(2);
if (!files.length) {
  console.error("usage: check-post-typography.mjs <page.tsx> [more.tsx ...]");
  process.exit(2);
}

// Suggested literal replacements for the entities that show up in prose.
const SUGGEST = {
  "&mdash;": "—",
  "&ndash;": "–",
  "&hellip;": "…",
  "&ldquo;": "“",
  "&rdquo;": "”",
  "&lsquo;": "‘",
  "&rsquo;": "’",
  "&apos;": "’",
  "&quot;": "“ / ” (curly) — or {'\"'} inside a code sample",
  "&nbsp;": "a normal space",
  "&lt;": '{"<"} (string expression)',
  "&gt;": '{">"} (string expression)',
  "&amp;": '{"&"} (string expression)',
};

const ENTITY = /&(?:[a-zA-Z][a-zA-Z0-9]*|#\d+|#x[0-9a-fA-F]+);/g;

let total = 0;
for (const file of files) {
  let src;
  try {
    src = readFileSync(file, "utf8");
  } catch (err) {
    console.error(`Cannot read ${file}: ${err.message}`);
    process.exit(2);
  }
  const lines = src.split("\n");
  lines.forEach((line, i) => {
    for (const m of line.matchAll(ENTITY)) {
      const entity = m[0];
      const hint = SUGGEST[entity] ? ` → use ${SUGGEST[entity]}` : " → use the literal character or a {\"...\"} string expression";
      console.log(`${file}:${i + 1}  ${entity}${hint}`);
      total++;
    }
  });
}

if (total) {
  console.log(
    `\n${total} HTML entit${total === 1 ? "y" : "ies"} found. Next's JSX transform can drop spaces around ` +
      `entities next to inline elements, and it's not CSS-fixable. Replace them as suggested above.`,
  );
  process.exit(1);
}
console.log("No HTML entities found — typography is transform-safe.");
