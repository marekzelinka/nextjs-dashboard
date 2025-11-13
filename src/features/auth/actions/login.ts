"use server";

import { APIError } from "better-auth";
import type { Route } from "next";
import { redirect } from "next/navigation";
import * as z from "zod";
import { auth } from "@/lib/auth";
import type { LoginActionState } from "../types";
import { LoginSchema } from "../validations";

export async function login(_prevState: LoginActionState, formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    callbackUrl: formData.get("callbackUrl"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Missing some fields. Failed to login.",
    };
  }

  const { email, password, callbackUrl } = validatedFields.data;

  try {
    await auth.api.signInEmail({
      body: { email, password },
    });
  } catch (error) {
    if (error instanceof APIError) {
      return {
        message: `${error.message}.`,
      };
    }

    return {
      message: "Database error: Failed to login.",
    };
  }

  redirect(callbackUrl as Route);
}
