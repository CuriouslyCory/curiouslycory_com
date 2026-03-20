import { PrismaClient } from "~/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { env } from "~/env";

const createPrismaClient = () => {
  let connectionString: string = env.DATABASE_URL;
  const needsSsl = connectionString.includes("sslmode=");
  if (needsSsl) {
    connectionString = connectionString.replace(/[?&]sslmode=[^&]*/g, "");
  }
  const adapter = new PrismaPg({
    connectionString,
    ...(needsSsl ? { ssl: { rejectUnauthorized: false } } : {}),
  });
  return new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
