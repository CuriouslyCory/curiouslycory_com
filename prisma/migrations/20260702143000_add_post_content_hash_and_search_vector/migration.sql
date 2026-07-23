-- AlterTable
ALTER TABLE "Post" ADD COLUMN "contentHash" TEXT;

-- Explicit ::regconfig cast: to_tsvector(text) is STABLE and rejected in a generated
-- column; to_tsvector(regconfig, text) is IMMUTABLE. STORED = auto-recomputed on write.
ALTER TABLE "Post" ADD COLUMN "searchVector" tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english'::regconfig, coalesce("title", '')), 'A') ||
    setweight(to_tsvector('english'::regconfig, coalesce("excerpt", '')), 'B') ||
    setweight(to_tsvector('english'::regconfig, coalesce("content", '')), 'C')
  ) STORED;

-- CreateIndex
CREATE INDEX "Post_searchVector_idx" ON "Post" USING GIN ("searchVector");
