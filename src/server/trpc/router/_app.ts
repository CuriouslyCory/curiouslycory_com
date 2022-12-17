// src/server/router/index.ts
import { router } from "../trpc";
import { contentfulRouter } from "./contentful";
import { authRouter } from "./auth";

export const appRouter = router({
  contentful: contentfulRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
