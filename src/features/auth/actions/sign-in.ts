"use server";

import { redirect } from "next/navigation";
import * as z from "zod";
import { auth } from "@/lib/auth";
import type { SignInActionState } from "../types";
import { SignInSchema } from "../validations";

export async function signIn(
  _prevState: SignInActionState,
  formData: FormData,
) {
  const validatedFields = SignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Missing Fields. Failed to Sign In.",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await auth.api.signInEmail({
      body: { email, password },
    });
  } catch {
    return {
      message: "Database Error: Failed to Sign In.",
    };
  }

  redirect("/dashboard");
}
