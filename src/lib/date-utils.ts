/**
 * Returns the full month name for a given month number (1-12)
 * @param month - Month number (1-12)
 * @returns Full month name
 */
export function getMonthName(month: number): string {
  return new Date(2000, month, 1).toLocaleString("default", {
    month: "long",
  });
}

/**
 * Dates are stored as UTC midnight, so format in UTC — otherwise a server
 * west of Greenwich renders every post a day early.
 */
const dayFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** e.g. "Jul 23, 2026" */
export function formatDay(date: Date): string {
  return dayFormatter.format(date);
}

/** e.g. "Jun 2026" */
export function formatMonth(date: Date): string {
  return monthFormatter.format(date);
}
