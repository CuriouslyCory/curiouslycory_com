// src/server/router/index.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { tempoRouter } from "./tempo";

export const appRouter = router({
  auth: authRouter,
  tempo: tempoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
