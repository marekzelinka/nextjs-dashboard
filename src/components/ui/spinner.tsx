"use client";

import { LucideLoader2 } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Spinner({ className, ...props }: ComponentProps<"svg">) {
  return (
    <LucideLoader2
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}
