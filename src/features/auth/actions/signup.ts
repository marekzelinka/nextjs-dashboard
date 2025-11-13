"use server";

import { APIError } from "better-auth";
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
      message: "Missing some fields. Failed to create account.",
    };
  }

  const { name, email, password, callbackUrl } = validatedFields.data;

  try {
    await auth.api.signUpEmail({
      body: { name, email, password },
    });
  } catch (error) {
    if (error instanceof APIError) {
      if (error.body?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
        return {
          errors: { email: [error.message] },
          message: "Missing some fields. Failed to create account.",
        };
      }

      return {
        message: `${error.message}.`,
      };
    }

    return {
      message: "Database error: Failed to create account.",
    };
  }

  redirect(callbackUrl as Route);
}
