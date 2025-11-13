"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/error-page";

export default function InvoicesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorPage onReset={reset} />;
}
