import { describe, expect, it } from "vitest";
import { reorderByRank } from "./reorder-by-rank";

describe("reorderByRank", () => {
  it("reorders arbitrary-order rows to match the ranked id order", () => {
    const rankedIds = [
      { id: "b", rank: 0.9 },
      { id: "a", rank: 0.5 },
      { id: "c", rank: 0.1 },
    ];
    // findMany returns rows in an unrelated order.
    const rows = [
      { id: "a", title: "A" },
      { id: "c", title: "C" },
      { id: "b", title: "B" },
    ];
    expect(reorderByRank(rows, rankedIds).map((r) => r.id)).toEqual([
      "b",
      "a",
      "c",
    ]);
  });

  it("drops nothing and duplicates nothing", () => {
    const rankedIds = [
      { id: "x", rank: 0.3 },
      { id: "y", rank: 0.2 },
    ];
    const rows = [
      { id: "y", title: "Y" },
      { id: "x", title: "X" },
    ];
    const result = reorderByRank(rows, rankedIds);
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.id).sort()).toEqual(["x", "y"]);
  });

  it("skips a ranked id that has no matching fetched row without throwing", () => {
    const rankedIds = [
      { id: "a", rank: 0.9 },
      { id: "missing", rank: 0.8 }, // no row fetched for this id
      { id: "b", rank: 0.7 },
    ];
    const rows = [
      { id: "b", title: "B" },
      { id: "a", title: "A" },
    ];
    let result: typeof rows = [];
    expect(() => {
      result = reorderByRank(rows, rankedIds);
    }).not.toThrow();
    // Only the two fetched rows come back, still in ranked order.
    expect(result.map((r) => r.id)).toEqual(["a", "b"]);
  });

  it("returns an empty array when given no rows", () => {
    expect(reorderByRank([], [{ id: "a", rank: 1 }])).toEqual([]);
  });
});
