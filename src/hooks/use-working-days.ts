import { useState, useEffect } from "react";

type UseWorkingDaysParams = {
  year: number;
  month: number;
};

export const useWorkingDays = ({ year, month }: UseWorkingDaysParams) => {
  const [weekdays, setWeekdays] = useState(0);

  useEffect(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let numWeekdays = 0;
    for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
      if (d.getDay() >= 1 && d.getDay() <= 5) {
        numWeekdays += 1;
      }
    }
    setWeekdays(numWeekdays);
  }, [year, month]);

  return weekdays;
};
