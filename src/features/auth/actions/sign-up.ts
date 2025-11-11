"use server";

import { redirect } from "next/navigation";
import * as z from "zod";
import { auth } from "@/lib/auth";
import type { SignUpActionState } from "../types";
import { SignUpSchema } from "../validations";

export async function signUp(
  _prevState: SignUpActionState,
  formData: FormData,
) {
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Missing Fields. Failed to Sign Up.",
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    await auth.api.signUpEmail({
      body: { name, email, password },
    });
  } catch {
    return {
      message: "Database Error: Failed to Sign Up.",
    };
  }

  redirect("/dashboard");
}
