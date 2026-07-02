/**
 * DB-free, network-free extraction of searchable prose from a blog post's
 * `page.tsx` source, via the TypeScript AST (not string/regex scraping).
 *
 * Used by `src/scripts/blog-indexer.ts` to populate `Post.content`, which in
 * turn feeds the generated `tsvector` column powering full-text search.
 *
 * Design notes (see plans/43.md step 2 for the full rationale):
 * - Chunks are collected into an array and joined with a single space at the
 *   end — NEVER raw-concatenated. Two adjacent JSX text/expression nodes
 *   (e.g. `<strong>word</strong>{" "}next`) must not become "wordnext".
 * - Only text that a reader actually sees is collected: JSX text, string/
 *   template literal JSX expression children, and a configurable allowlist
 *   of JSX attributes (default `alt`/`title`). Plain string literals outside
 *   JSX-expression position (`export const metadata = {...}`, `className`,
 *   `href`, `src`) are deliberately excluded — this keeps title/excerpt from
 *   being double-counted and keeps styling/URLs out of the index. The
 *   `---bm` metadata comment is parser trivia and is never visited.
 */
import ts from "typescript";

export interface ExtractSearchableTextOptions {
  includeAttributes?: string[];
}

const DEFAULT_INCLUDE_ATTRIBUTES = ["alt", "title"];

// Named HTML entities confirmed present in this repo's blog posts
// (`&mdash;`, `&apos;`, `&quot;`), plus common companions. Unknown entities
// are intentionally left untouched rather than throwing.
const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  mdash: "—",
  ndash: "–",
  hellip: "…",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
};

const ENTITY_PATTERN = /&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z]+);/g;

function decodeHtmlEntities(input: string): string {
  return input.replace(ENTITY_PATTERN, (match, entity: string) => {
    if (entity.startsWith("#x") || entity.startsWith("#X")) {
      const codePoint = parseInt(entity.slice(2), 16);
      return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint);
    }
    if (entity.startsWith("#")) {
      const codePoint = parseInt(entity.slice(1), 10);
      return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint);
    }
    const decoded = NAMED_ENTITIES[entity];
    return decoded ?? match;
  });
}

/**
 * Pushes the literal text of a string/template-literal JSX expression child
 * into `chunks`. Interpolated `${...}` expression code is intentionally
 * skipped — only the surrounding literal text is searchable prose.
 *
 * This single path covers both `{" "}` whitespace spacers and `CodeBlock`'s
 * `` {`...`} `` template-literal children — no special-casing is needed for
 * either.
 */
function pushLiteralExpressionText(expr: ts.Expression, chunks: string[]): void {
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
    chunks.push(expr.text);
  } else if (ts.isTemplateExpression(expr)) {
    chunks.push(expr.head.text);
    for (const span of expr.templateSpans) {
      chunks.push(span.literal.text);
    }
  }
}

function getJsxAttributeName(name: ts.JsxAttributeName): string {
  return ts.isIdentifier(name) ? name.text : name.getText();
}

export function extractSearchableText(
  source: string,
  options?: ExtractSearchableTextOptions,
): string {
  const includeAttributes = options?.includeAttributes ?? DEFAULT_INCLUDE_ATTRIBUTES;
  const chunks: string[] = [];

  let sourceFile: ts.SourceFile;
  try {
    sourceFile = ts.createSourceFile(
      "post.tsx",
      source,
      ts.ScriptTarget.ES2022,
      /* setParentNodes */ true,
      ts.ScriptKind.TSX,
    );
  } catch {
    // ts.createSourceFile tolerates malformed input by design (it never
    // throws for syntax errors), but we guard defensively anyway so a
    // pathological input degrades to "" rather than crashing the indexer.
    return "";
  }

  function visit(node: ts.Node): void {
    if (ts.isJsxText(node)) {
      chunks.push(node.text);
    } else if (ts.isJsxExpression(node)) {
      if (node.expression) {
        pushLiteralExpressionText(node.expression, chunks);
      }
    } else if (ts.isJsxAttribute(node)) {
      const attrName = getJsxAttributeName(node.name);
      if (includeAttributes.includes(attrName) && node.initializer) {
        if (ts.isStringLiteral(node.initializer)) {
          chunks.push(node.initializer.text);
        } else if (
          ts.isJsxExpression(node.initializer) &&
          node.initializer.expression
        ) {
          pushLiteralExpressionText(node.initializer.expression, chunks);
        }
      }
    }

    // Always continue walking so nested JSX inside expressions (e.g.
    // `{condition && <p>...</p>}`) is still visited.
    ts.forEachChild(node, visit);
  }

  try {
    ts.forEachChild(sourceFile, visit);
  } catch {
    return "";
  }

  return decodeHtmlEntities(chunks.join(" "))
    .replace(/\s+/g, " ")
    .trim();
}
