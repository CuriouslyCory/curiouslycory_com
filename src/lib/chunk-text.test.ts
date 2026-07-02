import { describe, expect, it } from "vitest";
import { chunkText } from "./chunk-text";

describe("chunkText", () => {
  it("returns [] for empty input", () => {
    expect(chunkText("")).toEqual([]);
  });

  it("returns [] for whitespace-only input", () => {
    expect(chunkText("   \n\n  \t  ")).toEqual([]);
  });

  it("returns a single chunk when text is shorter than maxChars", () => {
    const text = "A short post body.";
    const chunks = chunkText(text, { maxChars: 1500, overlap: 200 });
    expect(chunks).toEqual([{ index: 0, content: text }]);
  });

  it("prefers a paragraph boundary when one exists near the ideal cut point", () => {
    const paraA = "a".repeat(90);
    const paraB = "b".repeat(90);
    const text = `${paraA}\n\n${paraB}`;
    const chunks = chunkText(text, { maxChars: 100, overlap: 10 });
    // The first chunk should end exactly at the paragraph break, not mid-run.
    expect(chunks[0]!.content).toBe(paraA);
    expect(chunks.some((c) => c.content.includes(paraB[0]!))).toBe(true);
  });

  it("falls back to sentence boundaries when there is no paragraph break", () => {
    const sentence = "This is one sentence. ";
    // Flat text (as produced by the real extractor): no newlines at all.
    const text = sentence.repeat(20).trim();
    const chunks = chunkText(text, { maxChars: 80, overlap: 10 });
    expect(chunks.length).toBeGreaterThan(1);
    // Every non-final chunk should end on a sentence boundary (period),
    // proving the split preferred ". " over a mid-word hard cut.
    for (const chunk of chunks.slice(0, -1)) {
      expect(chunk.content.endsWith(".")).toBe(true);
    }
  });

  it("falls back to whitespace boundaries when there is no sentence punctuation", () => {
    const text = Array.from({ length: 40 }, (_, i) => `word${i}`).join(" ");
    const chunks = chunkText(text, { maxChars: 50, overlap: 5 });
    expect(chunks.length).toBeGreaterThan(1);
    for (const chunk of chunks.slice(0, -1)) {
      expect(chunk.content.endsWith(" ")).toBe(false); // trimmed
      expect(/^word\d+$/.test(chunk.content.split(" ").pop()!)).toBe(true);
    }
  });

  it("hard-cuts when there is no boundary at all in the window", () => {
    const text = "x".repeat(500);
    const chunks = chunkText(text, { maxChars: 100, overlap: 10 });
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks.every((c) => c.content.length <= 100)).toBe(true);
    // Reassembling (accounting for overlap) should not lose any content —
    // every chunk is a run of "x" and nothing else appears.
    expect(chunks.every((c) => /^x+$/.test(c.content))).toBe(true);
  });

  it("produces overlapping content between consecutive chunks", () => {
    const text = "word ".repeat(200).trim();
    const chunks = chunkText(text, { maxChars: 100, overlap: 20 });
    expect(chunks.length).toBeGreaterThan(1);
    const first = chunks[0]!.content;
    const second = chunks[1]!.content;
    // The tail of the first chunk should reappear at the head of the next.
    const tail = first.slice(-10);
    expect(second.includes(tail.trim())).toBe(true);
  });

  it("clamps step to avoid an infinite loop when overlap >= maxChars", () => {
    const text = "x".repeat(1000);
    // overlap deliberately >= maxChars: step must clamp to 1 (not <=0).
    const chunks = chunkText(text, { maxChars: 50, overlap: 200 });
    expect(chunks.length).toBeGreaterThan(0);
    expect(chunks.length).toBeLessThan(1000); // terminates, doesn't spin
  });

  it("assigns sequential zero-indexed indices", () => {
    const text = "x".repeat(500);
    const chunks = chunkText(text, { maxChars: 100, overlap: 10 });
    expect(chunks.map((c) => c.index)).toEqual(
      chunks.map((_, i) => i),
    );
  });
});
