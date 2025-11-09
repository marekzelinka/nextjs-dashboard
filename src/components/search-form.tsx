"use client";

import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { Route } from "next";
import Form, { type FormProps } from "next/form";
import { useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";
import { useFormStatus } from "react-dom";
import { useDebouncedCallback } from "use-debounce";

export function SearchForm({
  action,
  placeholder,
}: {
  action: FormProps<Route>["action"];
  placeholder: string;
}) {
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.target.form?.requestSubmit();
    },
    300,
  );

  return (
    <Form action={action} className="relative flex flex-1 shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="search"
        name="query"
        id="query"
        onChange={handleSearch}
        placeholder={placeholder}
        defaultValue={searchParams.get("query")?.toString()}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      />
      <SearchFormIcon className="-translate-y-1/2 absolute top-1/2 left-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
    </Form>
  );
}

function SearchFormIcon({ className }: { className?: string }) {
  const { pending } = useFormStatus();

  return pending ? (
    <ArrowPathIcon className={clsx(className, "animate-spin")} />
  ) : (
    <MagnifyingGlassIcon className={className} />
  );
}
