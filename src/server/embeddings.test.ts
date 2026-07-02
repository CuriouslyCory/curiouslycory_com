import { describe, expect, it } from "vitest";
import { embedChunks, embedQuery } from "./embeddings";

// These assert the "never throws → null" contract on the no-key path, which
// (after the review fix) routes through the same try block as the network
// call. A construction-failure path can't be exercised without heavy SDK
// mocking — createOpenAI doesn't validate synchronously in the pinned
// version — so that scenario is guaranteed structurally (getEmbeddingModel
// now lives inside the try) rather than by test.
describe("embeddings non-throwing contract", () => {
  it("embedQuery resolves null (no throw) when no api key is provided", async () => {
    await expect(embedQuery("anything", undefined)).resolves.toBeNull();
  });

  it("embedQuery resolves null (no throw) for an empty api key", async () => {
    await expect(embedQuery("anything", "")).resolves.toBeNull();
  });

  it("embedChunks resolves null (no throw) when no api key is provided", async () => {
    await expect(embedChunks(["a", "b"], undefined)).resolves.toBeNull();
  });

  it("embedChunks resolves null (no throw) for an empty api key", async () => {
    await expect(embedChunks(["a"], "")).resolves.toBeNull();
  });
});
