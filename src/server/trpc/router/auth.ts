import { publicProcedure, router, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(({ ctx }) => {
    return "He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever.";
  }),
});
