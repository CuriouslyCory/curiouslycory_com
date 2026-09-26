import { describe, expect, it } from "vitest";
import { formatDay, formatMonth } from "./date-utils";

describe("formatDay / formatMonth", () => {
  // Stored as UTC midnight: a local-time formatter west of Greenwich would
  // roll these back to the previous day (and Jun 1 back into May).
  const utcMidnight = new Date("2026-06-01T00:00:00.000Z");

  it("formats the calendar day in UTC", () => {
    expect(formatDay(utcMidnight)).toBe("Jun 1, 2026");
  });

  it("formats the month in UTC", () => {
    expect(formatMonth(utcMidnight)).toBe("Jun 2026");
  });
});
