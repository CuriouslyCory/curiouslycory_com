import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

// --- Prisma client setup (mirrors src/scripts/blog-indexer.ts) ---

let prisma: PrismaClient;
function getPrisma(): PrismaClient {
  if (!prisma) {
    let connectionString = process.env.DATABASE_URL;
    const needsSsl = connectionString?.includes("sslmode=");
    if (needsSsl && connectionString) {
      connectionString = connectionString.replace(/[?&]sslmode=[^&]*/g, "");
    }
    const adapter = new PrismaPg({
      connectionString,
      ...(needsSsl ? { ssl: { rejectUnauthorized: false } } : {}),
    });
    prisma = new PrismaClient({ adapter });
  }
  return prisma;
}

// --- Default author resolution (mirrors src/scripts/blog-indexer.ts) ---

async function getDefaultUser(): Promise<string> {
  const defaultUserId = process.env.DEFAULT_AUTHOR_ID;

  if (defaultUserId) {
    const user = await getPrisma().user.findUnique({
      where: { id: defaultUserId },
    });
    if (user) return user.id;
  }

  const defaultUser = await getPrisma().user.findFirst({
    where: { email: "cory@curiouslycory.com" },
  });
  if (defaultUser) return defaultUser.id;

  const newUser = await getPrisma().user.create({
    data: {
      name: "Cory Sougstad",
      email: "cory@curiouslycory.com",
    },
  });
  return newUser.id;
}

// --- Project seed data — add more entries to this array as needed ---

const projectSeeds = [
  {
    title: "my-skills",
    description:
      "A universal CLI and optional web dashboard for installing, managing, and sharing reusable skills across Claude Code, Cursor, Copilot, and 10+ AI coding agents.",
    longDescription: null,
    image: "my-skills.jpg",
    tags: [
      "TypeScript",
      "Commander.js",
      "Next.js",
      "Drizzle ORM",
      "SQLite",
      "tRPC",
    ],
    url: "https://www.npmjs.com/package/my-skills",
    githubUrl: "https://github.com/CuriouslyCory/my-skills",
    category: "developer-tools",
    featured: true,
    published: true,
    order: 0,
    publishedAt: new Date("2026-03-19"),
  },
];

// --- Main seed function ---

async function main() {
  const authorId = await getDefaultUser();
  console.log(`Using author ID: ${authorId}`);

  for (const project of projectSeeds) {
    const existing = await getPrisma().project.findFirst({
      where: { title: project.title },
    });

    if (existing) {
      await getPrisma().project.update({
        where: { id: existing.id },
        data: { ...project, authorId },
      });
      console.log(`Updated project: ${project.title}`);
    } else {
      await getPrisma().project.create({
        data: { ...project, authorId },
      });
      console.log(`Created project: ${project.title}`);
    }
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await getPrisma().$disconnect();
  });
