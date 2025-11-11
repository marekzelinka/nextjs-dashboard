"use client";

import { ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  AtSymbolIcon,
  CreditCardIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { signUp } from "../actions/sign-up";
import type { SignUpActionState } from "../types";

export function SignUpForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const initialState: SignUpActionState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(signUp, initialState);

  return (
    <Form
      action={formAction}
      className="space-y-3"
      aria-describedby="form-error"
    >
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pt-8 pb-4">
        <h1 className="mb-3 font-serif text-2xl">Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label
              className="mt-5 mb-3 block font-medium text-gray-900 text-xs"
              htmlFor="name"
            >
              Full name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                aria-describedby="name-error"
              />
              <CreditCardIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name?.map((error) => (
                <p className="mt-2 text-red-500 text-sm" key={error}>
                  {error}
                </p>
              ))}
            </div>
          </div>
          <div>
            <label
              className="mt-5 mb-3 block font-medium text-gray-900 text-xs"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                aria-describedby="email-error"
              />
              <AtSymbolIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email?.map((error) => (
                <p className="mt-2 text-red-500 text-sm" key={error}>
                  {error}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mt-5 mb-3 block font-medium text-gray-900 text-xs"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                aria-describedby="password-error"
              />
              <KeyIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="password-error" aria-live="polite" aria-atomic="true">
              {state.errors?.password?.map((error) => (
                <p className="mt-2 text-red-500 text-sm" key={error}>
                  {error}
                </p>
              ))}
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-red-500 text-sm">{state.message}</p>
          )}
        </div>
      </div>
    </Form>
  );
}
