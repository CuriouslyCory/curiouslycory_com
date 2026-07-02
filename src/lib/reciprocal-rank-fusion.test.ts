import { describe, expect, it } from "vitest";
import { reciprocalRankFusion } from "./reciprocal-rank-fusion";

describe("reciprocalRankFusion", () => {
  it("scores an id present in only one list (disjoint lists)", () => {
    // This is the mechanism that lets a zero-keyword-overlap conceptual
    // query surface a post: it has no FTS hit at all, only a semantic one.
    const fts = [{ id: "a" }, { id: "b" }];
    const semantic = [{ id: "c" }];
    const fused = reciprocalRankFusion([fts, semantic]);
    const c = fused.find((r) => r.id === "c");
    expect(c).toBeDefined();
    expect(c!.score).toBeCloseTo(1 / (60 + 1), 10);
  });

  it("uses k=60 by default: score = sum of 1/(k+rank) across lists", () => {
    const listA = [{ id: "x" }]; // rank 1
    const listB = [{ id: "y" }, { id: "x" }]; // rank 2 for x
    const fused = reciprocalRankFusion([listA, listB]);
    const x = fused.find((r) => r.id === "x")!;
    expect(x.score).toBeCloseTo(1 / 61 + 1 / 62, 10);
  });

  it("respects a custom k", () => {
    const fused = reciprocalRankFusion([[{ id: "a" }]], 10);
    expect(fused[0]!.score).toBeCloseTo(1 / 11, 10);
  });

  it("sorts fused results by score descending", () => {
    // "top" is rank 1 in both lists; "bottom" is rank 2 in both — top must
    // score strictly higher and sort first.
    const listA = [{ id: "top" }, { id: "bottom" }];
    const listB = [{ id: "top" }, { id: "bottom" }];
    const fused = reciprocalRankFusion([listA, listB]);
    expect(fused.map((r) => r.id)).toEqual(["top", "bottom"]);
    expect(fused[0]!.score).toBeGreaterThan(fused[1]!.score);
  });

  it("breaks ties deterministically via stable sort (first-encountered order)", () => {
    // "a" and "b" both appear only at rank 1 of their own single-item list,
    // so they tie exactly. Insertion order into the score map follows the
    // order lists are processed, so "a" (from list 1) must precede "b"
    // (from list 2) in the output every time.
    const fused = reciprocalRankFusion([[{ id: "a" }], [{ id: "b" }]]);
    expect(fused.map((r) => r.id)).toEqual(["a", "b"]);

    // Re-running with the same input produces the same order (determinism).
    const fusedAgain = reciprocalRankFusion([[{ id: "a" }], [{ id: "b" }]]);
    expect(fusedAgain.map((r) => r.id)).toEqual(["a", "b"]);
  });

  it("handles an empty lists array", () => {
    expect(reciprocalRankFusion([])).toEqual([]);
  });

  it("handles all-empty inner lists", () => {
    expect(reciprocalRankFusion([[], []])).toEqual([]);
  });

  it("accumulates scores across three lists", () => {
    const fused = reciprocalRankFusion([
      [{ id: "a" }],
      [{ id: "a" }],
      [{ id: "a" }],
    ]);
    expect(fused[0]!.score).toBeCloseTo(3 / 61, 10);
  });
});
