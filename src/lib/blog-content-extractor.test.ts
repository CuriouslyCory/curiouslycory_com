import { describe, expect, it } from "vitest";
import { extractSearchableText } from "./blog-content-extractor";

describe("extractSearchableText", () => {
  it("joins prose across inline tags with single spaces, no jammed words", () => {
    // Modeled on the real `{" "}` spacer pattern from
    // introducing-infinite-docs/page.tsx: adjacent JSX text/expression nodes
    // must never collapse into a single run-on word.
    const source = `
      export default function Post() {
        return (
          <p>
            I built <strong>Infinite Docs</strong>{" "}
            and it descends into <em>its own</em> canvas.
          </p>
        );
      }
    `;
    const result = extractSearchableText(source);
    expect(result).toContain(
      "I built Infinite Docs and it descends into its own canvas.",
    );
    expect(result).not.toMatch(/Docsand/);
    expect(result).not.toMatch(/own\)canvas/);
  });

  it("forces a separator between adjacent literal chunks with no source whitespace between them", () => {
    // Deliberately zero whitespace in the source between two JSX-expression
    // children — this is the load-bearing case for `chunks.join(" ")`
    // (raw-concat would jam these into "AlphaBeta").
    const source = `
      export default function Post() {
        return <p>{"Alpha"}{"Beta"}</p>;
      }
    `;
    const result = extractSearchableText(source);
    expect(result).toBe("Alpha Beta");
    expect(result).not.toContain("AlphaBeta");
  });

  it("includes CodeBlock template-literal children verbatim", () => {
    const source = `
      export default function Post() {
        return (
          <CodeBlock language="typescript">
            {\`import Fastify from "fastify";
const app = Fastify();\`}
          </CodeBlock>
        );
      }
    `;
    const result = extractSearchableText(source);
    expect(result).toContain('import Fastify from "fastify";');
    expect(result).toContain("const app = Fastify();");
  });

  it("includes template expression literal segments but excludes interpolated code", () => {
    const source = `
      export default function Post() {
        const name = "World";
        return <p>{\`Hello \${name}, welcome\`}</p>;
      }
    `;
    const result = extractSearchableText(source);
    expect(result).toContain("Hello");
    expect(result).toContain("welcome");
    expect(result).not.toContain("${name}");
    expect(result).not.toContain("const name");
  });

  it("decodes named and numeric HTML entities, leaving unknown entities untouched", () => {
    const source = `
      export default function Post() {
        return <p>Rock&mdash;solid &apos;quotes&apos; &quot;and&quot; ok &amp; done &#8212; &#x2014; &notarealentity;</p>;
      }
    `;
    const result = extractSearchableText(source);
    expect(result).toContain("Rock—solid");
    expect(result).toContain("'quotes'");
    expect(result).toContain('"and"');
    expect(result).toContain("ok & done");
    expect(result).toContain("— —"); // decimal + hex &mdash; equivalents
    expect(result).toContain("&notarealentity;");
    expect(() => extractSearchableText(source)).not.toThrow();
  });

  it("includes alt/title attribute text in both string and expression form, excludes styling/URL attributes", () => {
    const source = `
      export default function Post() {
        return (
          <div className="hero-wrapper">
            <img src="/images/blog/pipeline.png" alt="A diagram of the pipeline" />
            <a href="https://example.com" title={"Diagram of the pipeline"}>link</a>
          </div>
        );
      }
    `;
    const result = extractSearchableText(source);
    expect(result).toContain("A diagram of the pipeline");
    expect(result).toContain("Diagram of the pipeline");
    expect(result).not.toContain("hero-wrapper");
    expect(result).not.toContain("/images/blog/pipeline.png");
    expect(result).not.toContain("https://example.com");
  });

  it("counts a brace-form allowed attribute exactly once (no double-processing)", () => {
    // Regression: a JsxAttribute's brace-form initializer was walked by both
    // the attribute branch and the generic expression branch, so `alt={"x"}`
    // yielded "x x".
    const source = `export default () => <img alt={"Alpha"} />;`;
    const result = extractSearchableText(source);
    expect(result).toBe("Alpha");
    expect(result).not.toContain("Alpha Alpha");
    // Exactly one occurrence.
    expect(result.match(/Alpha/g)?.length).toBe(1);
  });

  it("keeps brace-form excluded attributes excluded (allowlist not bypassed)", () => {
    // Regression: excluded attrs in brace form (className={`...`}, href={`...`})
    // leaked in via the generic expression branch, bypassing includeAttributes.
    const source = `export default () => <div className={\`hero\`}><a href={\`https://x.test/p\`}>go</a></div>;`;
    const result = extractSearchableText(source);
    expect(result).toBe("go");
    expect(result).not.toContain("hero");
    expect(result).not.toContain("x.test");
  });

  it("still recurses into nested JSX inside an attribute value, without re-collecting the attribute's own literals", () => {
    // prop={<Foo/>}: nested JSX text must still be collected, but the excluded
    // attribute name (`label`) itself must not leak.
    const source = `export default () => <Card label={<span>Inner prose</span>}>Body</Card>;`;
    const result = extractSearchableText(source);
    expect(result).toContain("Inner prose");
    expect(result).toContain("Body");
  });

  it("excludes the metadata export object and the ---bm frontmatter comment", () => {
    const source = `
      /*
      ---bm
      title: My Post
      excerpt: Some excerpt text that should not appear
      published: true
      ---
      */
      export const metadata = {
        title: "My Post",
        description: "Some excerpt text that should not appear",
      };

      export default function Post() {
        return <p>Actual body prose goes here.</p>;
      }
    `;
    const result = extractSearchableText(source);
    expect(result).toBe("Actual body prose goes here.");
    expect(result).not.toContain("My Post");
    expect(result).not.toContain("Some excerpt text");
  });

  it("returns an empty string for a source with no prose", () => {
    const source = `
      export const metadata = { title: "No Body" };
      export default function Post() {
        return null;
      }
    `;
    expect(extractSearchableText(source)).toBe("");
  });

  it("degrades to a string without throwing on malformed TSX", () => {
    const source = `
      export default function Post( {
        return (
          <p>Unterminated <strong>tag and mismatched braces {{{
        );
      }
    `;
    expect(() => extractSearchableText(source)).not.toThrow();
    expect(typeof extractSearchableText(source)).toBe("string");
  });
});
