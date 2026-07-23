/**
 * Minimal LRU cache over a `Map`. `Map` iteration order is insertion order,
 * so the oldest (least-recently-used) entry is always the first key —
 * eviction is just deleting `keys().next().value`. `get` "touches" an entry
 * by deleting and re-inserting it so it moves to the most-recently-used
 * (last) position.
 *
 * No timers, no size estimation — just bounded by entry count. Intended for
 * small, cheap-to-recompute caches (e.g. embedding lookups within a single
 * warm process); not a general-purpose cache.
 */
export class LruCache<K, V> {
  private readonly map = new Map<K, V>();

  constructor(private readonly maxSize: number) {}

  get(key: K): V | undefined {
    if (!this.map.has(key)) return undefined;
    const value = this.map.get(key)!;
    // Bump recency: delete + re-insert moves the entry to the end.
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  set(key: K, value: V): void {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.maxSize) {
      const oldestKey = this.map.keys().next().value;
      if (oldestKey !== undefined) {
        this.map.delete(oldestKey);
      }
    }
    this.map.set(key, value);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  get size(): number {
    return this.map.size;
  }
}
