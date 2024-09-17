"use client";

import { usePathname, useSearchParams } from "next/navigation";

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
};

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function createPageURL(pageNumber: number | string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  // Generate the array of page numbers to display
  const pages = generatePagination(currentPage, totalPages);

  return (
    <UIPagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={createPageURL(currentPage - 1)} />
          </PaginationItem>
        )}

        {pages.map((page, i) => {
          if (page === "...") {
            return (
              <PaginationItem key={`${page}-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={`${page}-${i}`}>
              <PaginationLink
                href={createPageURL(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={createPageURL(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </UIPagination>
  );
}

// Helper function to generate pagination numbers with ellipsis
function generatePagination(currentPage: number, totalPages: number) {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages
  if (currentPage < 4) {
    return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages
  if (currentPage > totalPages - 3) {
    return [
      1,
      2,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}
