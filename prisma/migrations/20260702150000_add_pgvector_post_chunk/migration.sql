-- Enable pgvector. Requires the DB role to be owner/superuser or have the
-- extension pre-allow-listed as "trusted" (Neon/Supabase/Vercel Postgres all
-- allow `vector` as a trusted extension for non-superuser roles; a
-- self-managed Postgres role without CREATE privilege on extensions will
-- need a human/superuser to run this once before `migrate deploy`).
CREATE EXTENSION IF NOT EXISTS vector;

-- CreateTable
CREATE TABLE "PostChunk" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "contentHash" TEXT NOT NULL,
    "embedding" vector(1536) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostChunk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostChunk_postId_chunkIndex_key" ON "PostChunk"("postId", "chunkIndex");

-- CreateIndex
CREATE INDEX "PostChunk_postId_idx" ON "PostChunk"("postId");

-- CreateIndex
-- HNSW over cosine distance (matches the `<=>` operator used at query time
-- in src/server/api/routers/blog.ts). Not IVFFlat: HNSW has no build-order
-- dependency on data volume, which matters more than raw build speed at our
-- corpus size. NOTE: this index has no `schema.prisma` representation —
-- Prisma's `Unsupported("vector(1536)")` field type can't express index
-- method/ops-class, so `prisma migrate dev`'s diffing will never see it
-- (and would try to "fix" its absence by dropping it if diffing were ever
-- run against this table). Production only ever runs `migrate deploy`
-- (no diffing), so this is safe as long as that convention holds.
CREATE INDEX "PostChunk_embedding_hnsw_idx" ON "PostChunk" USING hnsw ("embedding" vector_cosine_ops);

-- AddForeignKey
ALTER TABLE "PostChunk" ADD CONSTRAINT "PostChunk_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
