-- Publish the project through the existing migration workflow, without re-seeding
-- or changing the curated order of any existing projects.
DO $$
DECLARE
    author_id TEXT;
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM "Project"
        WHERE "title" = 'Dust Bunny'
           OR "githubUrl" = 'https://github.com/CuriouslyCory/dust-bunny'
    ) THEN
        SELECT "id" INTO author_id FROM "User"
        WHERE "email" = 'cory@curiouslycory.com';

        -- Match the seed's default author when migrating an empty database.
        IF author_id IS NULL THEN
            INSERT INTO "User" ("id", "name", "email")
            VALUES ('dust-bunny-author', 'Cory Sougstad', 'cory@curiouslycory.com')
            RETURNING "id" INTO author_id;
        END IF;

        INSERT INTO "Project" (
            "id", "title", "description", "image", "tags", "url", "githubUrl",
            "category", "featured", "published", "order", "updatedAt",
            "publishedAt", "authorId"
        ) VALUES (
            'dust-bunny',
            'Dust Bunny',
            'A Katamari-style browser roguelike. Roll, absorb debris, and grow from a speck under the couch to a dust bunny big enough to swallow a garbage truck.',
            'dust-bunny.webp',
            ARRAY['TypeScript', 'Three.js', 'Vite', 'WebGL'],
            'https://dustbunny.curiouslycory.com/',
            'https://github.com/CuriouslyCory/dust-bunny',
            'games', false, true,
            (SELECT COALESCE(MAX("order") + 1, 0) FROM "Project"),
            CURRENT_TIMESTAMP,
            '2026-10-21'::TIMESTAMP,
            author_id
        );
    END IF;
END $$;
