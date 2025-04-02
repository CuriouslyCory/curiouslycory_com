"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "~/components/ui/badge";
import { X } from "lucide-react";
import { getMonthName } from "~/lib/date-utils";

export function ActiveFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);

  const query = searchParams.get("q");
  const tag = searchParams.get("tag");
  const year = searchParams.get("year")
    ? Number(searchParams.get("year"))
    : undefined;
  const month = searchParams.get("month")
    ? Number(searchParams.get("month"))
    : undefined;

  // Return early if no active filters
  if (!query && !tag && !year && !month) {
    return null;
  }

  const removeFilter = (type: "query" | "tag" | "year" | "month") => {
    const params = new URLSearchParams(searchParams.toString());

    if (type === "query") {
      params.delete("q");
    } else if (type === "tag") {
      params.delete("tag");
    } else if (type === "year") {
      params.delete("year");
      params.delete("month"); // Also remove month when removing year
    } else if (type === "month") {
      params.delete("month");
    }

    // Reset to page 1 when changing filters
    params.set("page", "1");

    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <span className="text-muted-foreground text-sm">Active filters:</span>

      {query && (
        <Badge
          key="query"
          variant={hoveredFilter === "query" ? "destructive" : "secondary"}
          className="flex cursor-pointer items-center gap-1"
          onMouseEnter={() => setHoveredFilter("query")}
          onMouseLeave={() => setHoveredFilter(null)}
          onClick={() => removeFilter("query")}
        >
          <span>query: {query}</span>
          <X className="h-3 w-3" />
        </Badge>
      )}

      {tag && (
        <Badge
          key="tag"
          variant={hoveredFilter === "tag" ? "destructive" : "secondary"}
          className="flex cursor-pointer items-center gap-1"
          onMouseEnter={() => setHoveredFilter("tag")}
          onMouseLeave={() => setHoveredFilter(null)}
          onClick={() => removeFilter("tag")}
        >
          <span>#{tag}</span>
          <X className="h-3 w-3" />
        </Badge>
      )}

      {year && (
        <Badge
          key="year"
          variant={hoveredFilter === "year" ? "destructive" : "secondary"}
          className="flex cursor-pointer items-center gap-1"
          onMouseEnter={() => setHoveredFilter("year")}
          onMouseLeave={() => setHoveredFilter(null)}
          onClick={() => removeFilter("year")}
        >
          <span>{year}</span>
          <X className="h-3 w-3" />
        </Badge>
      )}

      {month && year && (
        <Badge
          key="month"
          variant={hoveredFilter === "month" ? "destructive" : "secondary"}
          className="flex cursor-pointer items-center gap-1"
          onMouseEnter={() => setHoveredFilter("month")}
          onMouseLeave={() => setHoveredFilter(null)}
          onClick={() => removeFilter("month")}
        >
          <span>{getMonthName(month)}</span>
          <X className="h-3 w-3" />
        </Badge>
      )}
    </div>
  );
}
