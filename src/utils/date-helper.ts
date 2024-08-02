export const getFirstDayOfMonth = (date: Date) => {
  date.setDate(1);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return new Date(date);
};

export const getLastDayOfMonth = (date: Date) => {
  date.setMonth(date.getMonth() + 1);
  date.setHours(23);
  date.setMinutes(59);
  date.setSeconds(59);
  date.setDate(0);
  return new Date(date);
};

export const getStandardDateFormat = (date: Date) =>
  date.toISOString().replace(/T/, " ").replace(/\..+/, "");

export const getStandardDate = (date: Date) => date.toISOString().split("T")[0];
