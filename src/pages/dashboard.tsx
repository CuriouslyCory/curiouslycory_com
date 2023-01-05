import { useEffect, useState } from "react";
import { useWorkingDays } from "../hooks/use-working-days";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../utils/date-helper";
import { trpc } from "../utils/trpc";

const currentDate = new Date();

export const DashboardPage = () => {
  const [from, setFrom] = useState<Date>(currentDate);
  const [to, setTo] = useState<Date>(currentDate);
  const [secondsWorked, setSecondsWorked] = useState<number>(0);
  const [hoursWorked, setHoursWorked] = useState<number>(0);
  const totalWorkingDays = useWorkingDays({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: 1,
  });
  const remainingWorkingDays = useWorkingDays({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: new Date().getDate(),
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
    if (data?.results.length) {
      const seconds = data.results.reduce((acc, curr) => {
        return acc + curr.timeSpentSeconds;
      }, 0);
      setSecondsWorked(seconds);
      setHoursWorked(seconds / 60 / 60);
    }
  }, [data, setSecondsWorked, setHoursWorked]);

  return (
    <section className="max-w-xl flex flex-col justify-center items-center">
      <div className="block">
        <h1 className="text-left">My Dashboard</h1>
        {isLoading && <p>Loading...</p>}
        {secondsWorked > 0 && <p>Hours worked: {hoursWorked}</p>}
        {secondsWorked > 0 && <p>Hours required: {totalWorkingDays * 4}</p>}
        {secondsWorked > 0 && (
          <p>Hours remaining: {totalWorkingDays * 4 - hoursWorked}</p>
        )}
        {secondsWorked > 0 && (
          <p>
            Avg per day:{" "}
            {(totalWorkingDays * 4 - hoursWorked) / remainingWorkingDays}
          </p>
        )}
      </div>
    </section>
  );
};

export default DashboardPage;
