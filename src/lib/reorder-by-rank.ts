/**
 * Re-sort rows fetched by `findMany({ id: { in } })` (which does not preserve
 * the order of the `in` list) back into the order of a ranked id list.
 *
 * - Rows whose id is absent from `rankedIds` sort to the front (rank index 0),
 *   though in practice callers fetch only ids present in `rankedIds`.
 * - Ranked ids with no matching fetched row are simply skipped (never throws).
 * - Every input row is preserved exactly once (no drops, no duplicates).
 *
 * Kept as a standalone pure module so it is unit-testable without importing the
 * tRPC/db/env chain, and so #44's search layer can reuse it.
 */
export function reorderByRank<T extends { id: string }>(
  rows: T[],
  rankedIds: Array<{ id: string; rank: number }>,
): T[] {
  const order = new Map(rankedIds.map((r, index) => [r.id, index]));
  return [...rows].sort(
    (a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0),
  );
}
