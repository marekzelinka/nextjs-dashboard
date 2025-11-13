import { LucideRotateCcw, LucideX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function ErrorPage({
  errorMessage = "An unexpected error has occurred. Please try again!",
  onReset,
}: {
  errorMessage?: string;
  onReset: () => void;
}) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-red-100 text-red-500">
          <LucideX />
        </EmptyMedia>
        <EmptyTitle>Something went wrong!</EmptyTitle>
        {errorMessage ? (
          <EmptyDescription>{errorMessage}</EmptyDescription>
        ) : null}
      </EmptyHeader>
      <EmptyContent>
        <Button type="button" onClick={onReset} size="sm">
          <LucideRotateCcw />
          Try Again
        </Button>
      </EmptyContent>
    </Empty>
  );
}
