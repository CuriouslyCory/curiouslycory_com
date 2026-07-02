import { describe, expect, it } from "vitest";
import { LruCache } from "./lru-cache";

describe("LruCache", () => {
  it("stores and retrieves a value", () => {
    const cache = new LruCache<string, number>(3);
    cache.set("a", 1);
    expect(cache.get("a")).toBe(1);
  });

  it("returns undefined for a missing key", () => {
    const cache = new LruCache<string, number>(3);
    expect(cache.get("missing")).toBeUndefined();
  });

  it("evicts the least-recently-used entry when over capacity", () => {
    const cache = new LruCache<string, number>(2);
    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("c", 3); // "a" is the oldest, unused since insert -> evicted
    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBe(2);
    expect(cache.get("c")).toBe(3);
  });

  it("get() bumps recency so a recently-read entry survives eviction", () => {
    const cache = new LruCache<string, number>(2);
    cache.set("a", 1);
    cache.set("b", 2);
    cache.get("a"); // touch "a" -> "b" is now the oldest
    cache.set("c", 3); // should evict "b", not "a"
    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBeUndefined();
    expect(cache.get("c")).toBe(3);
  });

  it("overwriting an existing key updates its value and recency without growing size", () => {
    const cache = new LruCache<string, number>(2);
    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("a", 99); // update + bump "a" -> "b" is now oldest
    expect(cache.size).toBe(2);
    cache.set("c", 3); // evicts "b"
    expect(cache.get("a")).toBe(99);
    expect(cache.get("b")).toBeUndefined();
  });

  it("has() reports membership without affecting recency", () => {
    const cache = new LruCache<string, number>(2);
    cache.set("a", 1);
    cache.set("b", 2);
    expect(cache.has("a")).toBe(true);
    cache.has("a"); // must NOT bump recency
    cache.set("c", 3); // "a" is still oldest -> evicted
    expect(cache.get("a")).toBeUndefined();
  });

  it("tracks size", () => {
    const cache = new LruCache<string, number>(5);
    expect(cache.size).toBe(0);
    cache.set("a", 1);
    cache.set("b", 2);
    expect(cache.size).toBe(2);
  });
});
