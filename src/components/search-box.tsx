"use client";

import { LucideSearch } from "lucide-react";
import type { Route } from "next";
import Form, { type FormProps } from "next/form";
import { useSearchParams } from "next/navigation";
import type { ChangeEvent, ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { useDebouncedCallback } from "use-debounce";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components//ui/input-group";
import { Spinner } from "@/components/ui/spinner";

export function SearchBox({
  action,
  name = "query",
  placeholder,
  defaultValue,
}: Pick<FormProps<Route>, "action"> &
  Pick<ComponentProps<"input">, "name" | "placeholder" | "defaultValue">) {
  const searchParams = useSearchParams();

  const handleChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.target.form?.requestSubmit();
    },
    300,
  );

  return (
    <Form action={action}>
      <InputGroup>
        <InputGroupInput
          type="search"
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          defaultValue={defaultValue ?? searchParams.get(name)?.toString()}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </Form>
  );
}

function SearchIcon() {
  const { pending } = useFormStatus();

  return pending ? <Spinner /> : <LucideSearch />;
}
