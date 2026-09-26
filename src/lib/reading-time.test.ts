import { describe, expect, it } from "vitest";
import { readingTimeMinutes } from "./reading-time";

describe("readingTimeMinutes", () => {
  it("returns 1 for missing or empty content", () => {
    expect(readingTimeMinutes(null)).toBe(1);
    expect(readingTimeMinutes(undefined)).toBe(1);
    expect(readingTimeMinutes("   \n\t ")).toBe(1);
  });

  it("rounds partial minutes up", () => {
    expect(readingTimeMinutes("word ".repeat(225))).toBe(1);
    expect(readingTimeMinutes("word ".repeat(226))).toBe(2);
  });

  it("counts words across any whitespace", () => {
    const text = Array.from({ length: 900 }, () => "word").join("\n\n");
    expect(readingTimeMinutes(text)).toBe(4);
  });
});
