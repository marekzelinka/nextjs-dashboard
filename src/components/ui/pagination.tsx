"use client";

import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideMoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Pagination({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

export function PaginationContent({
  className,
  ...props
}: ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

export function PaginationItem({ ...props }: ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

export function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: {
  isActive?: boolean;
} & Pick<ComponentProps<typeof Button>, "size"> &
  ComponentProps<typeof Link>) {
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

export function PaginationPrevious({
  className,
  children,
  ...props
}: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      {children ?? (
        <>
          <LucideChevronLeft />
          <span className="hidden sm:block">Previous</span>
        </>
      )}
    </PaginationLink>
  );
}

export function PaginationNext({
  className,
  children,
  ...props
}: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      {children ?? (
        <>
          <LucideChevronRight />
          <span className="hidden sm:block">Next</span>
        </>
      )}
    </PaginationLink>
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <LucideMoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}
