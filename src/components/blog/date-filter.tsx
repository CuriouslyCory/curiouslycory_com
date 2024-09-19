"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { api } from "~/trpc/react";
import { getMonthName } from "~/lib/date-utils";

export function DateFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeYearItem, setActiveYearItem] = useState<string | undefined>(
    undefined,
  );

  const selectedYear = searchParams.get("year")
    ? Number(searchParams.get("year"))
    : undefined;
  const selectedMonth = searchParams.get("month")
    ? Number(searchParams.get("month"))
    : undefined;

  // Fetch date aggregations
  const { data: dateAggregations, isLoading } =
    api.blog.getDateAggregations.useQuery(undefined, {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  // Set active accordion item when year filter changes
  useEffect(() => {
    if (selectedYear) {
      setActiveYearItem(selectedYear.toString());
    } else {
      setActiveYearItem(undefined);
    }
  }, [selectedYear]);

  const applyDateFilter = (year: number, month?: number) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update year filter
    params.set("year", year.toString());

    // Update month filter if provided, otherwise remove it
    if (month !== undefined) {
      params.set("month", month.toString());
    } else {
      params.delete("month");
    }

    // Reset to page 1 when changing filters
    params.set("page", "1");

    router.push(`/blog?${params.toString()}`);
  };

  if (isLoading || !dateAggregations || dateAggregations.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <Accordion
        type="single"
        collapsible
        className=""
        value={activeYearItem}
        onValueChange={setActiveYearItem}
      >
        {dateAggregations.map((yearData) => (
          <AccordionItem key={yearData.year} value={yearData.year.toString()}>
            <AccordionTrigger
              onClick={(e) => {
                // Prevent accordion from toggling if we're selecting the year filter
                if (!selectedYear || selectedYear !== yearData.year) {
                  e.preventDefault();
                  applyDateFilter(yearData.year);
                }
              }}
              className={`${
                selectedYear === yearData.year ? "text-primary font-bold" : ""
              }`}
            >
              <span className="flex items-center gap-2">
                {yearData.year}
                <span className="text-muted-foreground text-xs">
                  ({yearData.count} posts)
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent>
              <div className="flex flex-col gap-2 pl-4">
                {yearData.months.map((monthData) => (
                  <button
                    key={monthData.month}
                    onClick={() =>
                      applyDateFilter(yearData.year, monthData.month)
                    }
                    className={`hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded px-2 py-1 text-left text-sm ${
                      selectedMonth === monthData.month &&
                      selectedYear === yearData.year
                        ? "bg-accent/50 font-medium"
                        : ""
                    }`}
                  >
                    <span>{getMonthName(monthData.month)}</span>
                    <span className="text-muted-foreground text-xs">
                      ({monthData.count})
                    </span>
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
