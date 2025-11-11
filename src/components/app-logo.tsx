import { LucideGlobe } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function AppLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 font-medium", className)}
    >
      <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <LucideGlobe className="size-4" />
      </div>
      Invoify
    </Link>
  );
}
