/**
 * Merge several ranked id lists (e.g. full-text search + semantic search)
 * into a single ranked list via Reciprocal Rank Fusion.
 *
 * `score(id) = Σ 1 / (k + rank)` over every list the id appears in, using a
 * 1-indexed rank within each list. An id present in only one list still
 * accumulates a score from that list alone — this is what lets a
 * zero-keyword-overlap conceptual query surface a post purely via the
 * semantic list, with no FTS contribution at all.
 *
 * Results are sorted by score descending. `Array.prototype.sort` in V8 is a
 * stable sort, so ids with identical scores keep their first-encountered
 * relative order (the order they first appear across `lists`), making ties
 * deterministic without a secondary sort key.
 */

export interface RankedId {
  id: string;
}

export interface FusedResult {
  id: string;
  score: number;
}

export function reciprocalRankFusion(
  lists: RankedId[][],
  k = 60,
): FusedResult[] {
  const scores = new Map<string, number>();

  for (const list of lists) {
    list.forEach((item, i) => {
      const rank = i + 1; // 1-indexed
      const contribution = 1 / (k + rank);
      scores.set(item.id, (scores.get(item.id) ?? 0) + contribution);
    });
  }

  return [...scores.entries()]
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score);
}
