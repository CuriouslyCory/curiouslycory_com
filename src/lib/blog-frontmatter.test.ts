import { describe, it, expect } from "vitest";
import { parsePostFrontmatter } from "./blog-frontmatter";

/** Wrap a raw frontmatter body in the `/* ---bm ... --- *​/` block a post uses. */
function page(frontmatter: string): string {
  return `/*\n---bm\n${frontmatter}\n---\n*/\nexport default function Post() {\n  return null;\n}\n`;
}

describe("parsePostFrontmatter", () => {
  it("parses a well-formed block", () => {
    const result = parsePostFrontmatter(
      page(
        [
          "title: Hello World",
          "excerpt: A short summary",
          "published: true",
          "featured: false",
          "tags: nextjs, typescript",
        ].join("\n"),
      ),
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.title).toBe("Hello World");
      expect(result.data.published).toBe(true);
      expect(result.data.tags).toEqual(["nextjs", "typescript"]);
    }
  });

  it("returns 'invalid' (not a thrown error) for an unquoted title with a colon", () => {
    // Regression: `Search: Full-Text` — YAML reads `: ` as a key/value
    // separator, so an unquoted value breaks parsing. This previously threw
    // and aborted the entire indexer run while the run still exited 0.
    const result = parsePostFrontmatter(
      page(
        "title: Rebuilding My Blog's Search: Full-Text + Semantic, Fused\npublished: true",
      ),
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("invalid");
  });

  it("parses cleanly when the colon-bearing title is quoted", () => {
    const result = parsePostFrontmatter(
      page(
        'title: "Rebuilding My Blog\'s Search: Full-Text + Semantic, Fused"\npublished: true',
      ),
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.title).toBe(
        "Rebuilding My Blog's Search: Full-Text + Semantic, Fused",
      );
    }
  });

  it("returns 'missing' when there is no ---bm block", () => {
    const result = parsePostFrontmatter(
      "export default function Post() {\n  return null;\n}\n",
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("missing");
  });

  it("defaults published to false when omitted", () => {
    const result = parsePostFrontmatter(page("title: Draft Post"));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.published).toBe(false);
  });
});
