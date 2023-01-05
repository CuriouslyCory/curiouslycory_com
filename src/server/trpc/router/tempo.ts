import { z } from "zod";
import { FetchWorklogsResponse } from "../../../types/worklogs";
import { getStandardDate } from "../../../utils/date-helper";
import { publicProcedure, router } from "../trpc";

export const tempoRouter = router({
  getWorklogs: publicProcedure
    .input(z.object({ to: z.date(), from: z.date() }))
    .query(async ({ input }) => {
      return fetchWorklogs(input.from, input.to);
    }),
});

const fetchWorklogs = (from: Date, to: Date) => {
  console.log("fetchWorklogs", from, to);
  const queryParams = new URLSearchParams();
  queryParams.set("from", getStandardDate(from) ?? "");
  queryParams.set("to", getStandardDate(to) ?? "");
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${process.env.TEMPO_API_TOKEN}`);
  headers.append("accept", "application/json");
  return fetch(`https://api.tempo.io/4/worklogs?${queryParams.toString()}`, {
    headers,
  }).then((response) => {
    return response.json() as Promise<FetchWorklogsResponse>;
  });
};
