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
