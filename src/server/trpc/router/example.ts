import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../../db/client";

export const exampleRouter = router({
  hello: publicProcedure
    .input(
      z
        .object({
          text: z.string().nullish(),
        })
        .nullish()
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure
    .input(z.object({ itemId: z.number() }))
    .query(async ({ input }) => {
      return await prisma.example.findMany();
    }),
});
