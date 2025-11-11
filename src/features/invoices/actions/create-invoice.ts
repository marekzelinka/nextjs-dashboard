"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";
import { db } from "@/db/connection";
import * as schema from "@/db/schema";
import { requireAuth } from "@/features/auth/queries/require-auth";
import type { CreateInvoiceActionState } from "../types";
import { CreateInvoiceFormValues } from "../validations";

export async function createInvoice(
  _prevState: CreateInvoiceActionState,
  formData: FormData,
) {
  const { userId } = await requireAuth();

  const validatedFields = CreateInvoiceFormValues.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  try {
    await db.insert(schema.invoices).values({
      userId,
      customerId,
      amount,
      status,
      date,
    });
  } catch {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
