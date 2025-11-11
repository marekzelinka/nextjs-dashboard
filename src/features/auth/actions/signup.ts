"use server";

import type { Route } from "next";
import { redirect } from "next/navigation";
import * as z from "zod";
import { auth } from "@/lib/auth";
import type { SignupActionState } from "../types";
import { SignupSchema } from "../validations";

export async function signup(
  _prevState: SignupActionState,
  formData: FormData,
) {
  const validatedFields = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    callbackUrl: formData.get("callbackUrl"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Missing Fields. Failed to Create Account.",
    };
  }

  const { name, email, password, callbackUrl } = validatedFields.data;

  try {
    await auth.api.signUpEmail({
      body: { name, email, password },
    });
  } catch {
    return {
      message: "Database Error: Failed to Create Account.",
    };
  }

  redirect(callbackUrl as Route);
}
