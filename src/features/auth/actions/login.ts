"use server";

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
      message: "Missing Fields. Failed to Login.",
    };
  }

  const { email, password, callbackUrl } = validatedFields.data;

  try {
    await auth.api.signInEmail({
      body: { email, password },
    });
  } catch {
    return {
      message: "Database Error: Failed to Login.",
    };
  }

  redirect(callbackUrl as Route);
}
