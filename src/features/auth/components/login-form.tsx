"use client";

import Form from "next/form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useId } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { login } from "../actions/login";
import type { LoginActionState } from "../types";

const initialLoginActionState: LoginActionState = { message: null, errors: {} };

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? undefined;

  const [formState, formAction, isPending] = useActionState(
    login,
    initialLoginActionState,
  );

  const formId = useId();

  return (
    <Form action={formAction} aria-describedby={`${formId}-form-error`}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <FieldGroup>
        <Field
          data-disabled={isPending}
          data-invalid={Boolean(formState.errors?.email?.length)}
        >
          <FieldLabel htmlFor={`${formId}-email`}>Email</FieldLabel>
          <Input
            type="email"
            name="email"
            id={`${formId}-email`}
            disabled={isPending}
            aria-invalid={Boolean(formState.errors?.email?.length)}
            autoComplete="email"
          />
          {formState.errors?.email ? (
            <FieldError>{formState.errors.email[0]}</FieldError>
          ) : null}
        </Field>
        <Field
          data-disabled={isPending}
          data-invalid={Boolean(formState.errors?.password?.length)}
        >
          <FieldLabel htmlFor={`${formId}-password`}>Password</FieldLabel>
          <Input
            type="password"
            name="password"
            id={`${formId}-password`}
            disabled={isPending}
            aria-invalid={Boolean(formState.errors?.password?.length)}
            autoComplete="current-password"
          />
          {formState.errors?.password ? (
            <FieldError>{formState.errors.password[0]}</FieldError>
          ) : null}
        </Field>
        <Field>
          {formState.message ? (
            <FieldError id={`${formId}-form-error`}>
              {formState.message}
            </FieldError>
          ) : null}
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Spinner />
                Logging In...
              </>
            ) : (
              "Login"
            )}
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href={`/sign-up?${searchParams}`}>Sign up</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </Form>
  );
}
