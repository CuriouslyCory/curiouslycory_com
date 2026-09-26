// Pre-converter build for the Claude Design sync (cfg.buildCmd). Run from the
// repo root: `node .design-sync/build.mjs`.
//
// This repo is a Next.js app, not a published package, so this assembles a
// package-shaped wrapper around src/components/ui in .design-sync/.cache/pkg/:
//   package.json      name + `types` so the converter finds the .d.ts tree
//   types/            tsc declarations (tsconfig.dts.json) + index.d.ts barrel
//   index.ts          JS entry re-exporting every ui module (esbuild bundles src)
//   ds-styles.css     tailwind.css compiled with the repo's Tailwind v4 plugin
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";

const UI_DIR = resolve("src/components/ui");
const PKG = resolve(".design-sync/.cache/pkg");
const TYPES = join(PKG, "types");

rmSync(PKG, { recursive: true, force: true });
mkdirSync(PKG, { recursive: true });

// 1. Declarations. tsc keeps `~/` path aliases verbatim; rewrite them to
// relative paths so the converter's ts-morph project (no `paths`) resolves them.
execFileSync(resolve("node_modules/.bin/tsc"), ["-p", ".design-sync/tsconfig.dts.json"], { stdio: "inherit" });
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]);
for (const f of walk(TYPES).filter((p) => p.endsWith(".d.ts"))) {
  const src = readFileSync(f, "utf8");
  const out = src.replace(/(["'])~\/([^"']+)\1/g, (_, q, p) => {
    let rel = relative(dirname(f), join(TYPES, p));
    if (!rel.startsWith(".")) rel = `./${rel}`;
    return `${q}${rel}${q}`;
  });
  if (out !== src) writeFileSync(f, out);
}

// 2. Barrels: one line per ui module, for both the types and the JS entry.
const modules = readdirSync(UI_DIR).filter((f) => f.endsWith(".tsx")).map((f) => f.slice(0, -4)).sort();
writeFileSync(join(TYPES, "index.d.ts"),
  modules.map((m) => `export * from "./components/ui/${m}";`).join("\n") + "\n");
writeFileSync(join(PKG, "index.ts"),
  modules.map((m) => `export * from ${JSON.stringify(join(UI_DIR, m))};`).join("\n") + "\n");

const { version } = JSON.parse(readFileSync("package.json", "utf8"));
writeFileSync(join(PKG, "package.json"), JSON.stringify({
  name: "curiouslycory.com",
  version,
  private: true,
  types: "types/index.d.ts",
}, null, 2) + "\n");

// 3. Stylesheet.
const from = resolve(".design-sync/tailwind.css");
const to = join(PKG, "ds-styles.css");
const result = await postcss([tailwind({ base: process.cwd(), optimize: { minify: true } })])
  .process(readFileSync(from, "utf8"), { from, to });
writeFileSync(to, result.css);

console.log(`pkg: ${modules.length} ui modules, ds-styles.css ${(result.css.length / 1024).toFixed(0)} KB`);
