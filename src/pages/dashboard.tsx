import { useEffect, useState } from "react";
import { useWorkingDays } from "../hooks/use-working-days";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../utils/date-helper";
import { trpc } from "../utils/trpc";

const currentDate = new Date();

export const DashboardPage = () => {
  const [from, setFrom] = useState<Date>(currentDate);
  const [to, setTo] = useState<Date>(currentDate);
  const [secondsWorked, setSecondsWorked] = useState<number>(0);
  const workingDays = useWorkingDays({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
  });

  const { data, isLoading } = trpc.tempo.getWorklogs.useQuery(
    { to: to ?? currentDate, from: from ?? currentDate },
    { enabled: !!from && !!to }
  );

  useEffect(() => {
    setFrom(getFirstDayOfMonth(currentDate));
    setTo(getLastDayOfMonth(currentDate));
  }, []);

  useEffect(() => {
    console.log("to", to);
    console.log("from", from);
  }, [to, from]);

  useEffect(() => {
    console.log("data", data);
    if (data?.results.length) {
      const seconds = data.results.reduce((acc, curr) => {
        return acc + curr.timeSpentSeconds;
      }, 0);
      setSecondsWorked(seconds);
    }
  }, [data]);

  return (
    <section className="max-w-xl flex flex-col justify-center items-center">
      <div className="block">
        <h1 className="text-left">My Dashboard</h1>
        {isLoading && <p>Loading...</p>}
        {secondsWorked > 0 && <p>Hours worked: {secondsWorked / 60 / 60}</p>}
        {secondsWorked > 0 && <p>Hours required: {workingDays * 4}</p>}
      </div>
    </section>
  );
};

export default DashboardPage;
