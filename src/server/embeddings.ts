import { createOpenAI } from "@ai-sdk/openai";
import { embed, embedMany, type EmbeddingModel } from "ai";
import { LruCache } from "~/lib/lru-cache";

// Deliberately NOT `import "server-only"` here: this module is imported both
// by the tRPC router (inside Next's webpack pipeline, where the marker
// works as intended) and directly by `src/scripts/blog-indexer.ts`, a plain
// tsx CLI script that runs outside webpack — `server-only`'s package export
// unconditionally throws in that context.

const MODEL_ID = "text-embedding-3-small";
const QUERY_TIMEOUT_MS = 2000;
const QUERY_CACHE_SIZE = 50;

// Module-level LRU: query -> embedding. Deliberately process-lifetime, not
// per-request — cheap wins on warm servers/dev, harmless (empty) on cold
// serverless starts.
const queryCache = new LruCache<string, number[]>(QUERY_CACHE_SIZE);

/**
 * Build an embedding model bound to `apiKey`, or `null` if no key is
 * present. Uses `createOpenAI` explicitly rather than the package's ambient
 * `openai` singleton so a client is only ever constructed here, lazily,
 * inside a function body — never at module import time. That's what keeps
 * "build with no OPENAI_API_KEY" and "importing this module never throws"
 * trivially true regardless of caller.
 */
function getEmbeddingModel(
  apiKey: string | undefined,
): EmbeddingModel | null {
  if (!apiKey) return null;
  const openai = createOpenAI({ apiKey });
  return openai.embedding(MODEL_ID);
}

/**
 * Embed a single search query for semantic search, with a small LRU cache
 * and a hard 2s timeout. Never throws: any failure (no key, timeout,
 * network error, rate limit) resolves to `null` so callers can degrade to
 * FTS-only search.
 */
export async function embedQuery(
  q: string,
  apiKey: string | undefined,
): Promise<number[] | null> {
  const cacheKey = q.trim().toLowerCase();

  const cached = queryCache.get(cacheKey);
  if (cached) return cached;

  try {
    // Inside try: getEmbeddingModel calls createOpenAI(...).embedding(...),
    // which doesn't throw synchronously in the pinned SDK today — but keeping
    // it here means the catch-all → null contract holds structurally even if
    // a future SDK bump (or a bad MODEL_ID) adds eager validation.
    const model = getEmbeddingModel(apiKey);
    if (!model) return null;

    const { embedding } = await embed({
      model,
      value: q,
      abortSignal: AbortSignal.timeout(QUERY_TIMEOUT_MS),
    });
    queryCache.set(cacheKey, embedding);
    return embedding;
  } catch {
    return null;
  }
}

/**
 * Embed a batch of post chunks for indexing. `embedMany` has no
 * partial-success mode — a failed batch throws as a whole — so this
 * resolves to `null` on any failure and the caller (the indexer) leaves the
 * post's existing chunks untouched and retries on the next run.
 */
export async function embedChunks(
  values: string[],
  apiKey: string | undefined,
): Promise<number[][] | null> {
  try {
    // Inside try for the same reason as embedQuery: guarantees the
    // never-throws → null contract even if model construction gains eager
    // validation in a future SDK version.
    const model = getEmbeddingModel(apiKey);
    if (!model) return null;

    const { embeddings } = await embedMany({ model, values });
    return embeddings;
  } catch {
    return null;
  }
}
