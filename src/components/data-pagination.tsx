"use client";

import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import type { Route } from "next";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components//ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { generatePagination } from "@/utils/pagination";

export function DataPagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}` as Route;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationArrow
            direction="left"
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />
        </PaginationItem>
        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
        <PaginationItem>
          <PaginationArrow
            direction="right"
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: Route;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  return position === "middle" ? (
    <PaginationEllipsis />
  ) : (
    <PaginationLink href={href} isActive={isActive}>
      {page}
    </PaginationLink>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: Route;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const Component = direction === "left" ? PaginationPrevious : PaginationNext;
  const children =
    direction === "left" ? (
      <>
        <LucideChevronLeft />
        <span className="hidden sm:block">Previous</span>
      </>
    ) : (
      <>
        <span className="hidden sm:block">Next</span>
        <LucideChevronRight />
      </>
    );

  return isDisabled ? (
    <Button type="button" disabled variant="ghost">
      {children}
    </Button>
  ) : (
    <Component href={href}>{children}</Component>
  );
}
