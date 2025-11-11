"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";
import { db } from "@/db/connection";
import * as schema from "@/db/schema";
import { requireAuth } from "@/features/auth/queries/require-auth";
import type { UpdateInvoiceActionState } from "../types";
import { UpdateInvoiceFormValues } from "../validations";

export async function updateInvoice(
  id: string,
  _prevState: UpdateInvoiceActionState,
  formData: FormData,
) {
  const { userId } = await requireAuth();

  const validatedFields = UpdateInvoiceFormValues.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;

  try {
    await db
      .update(schema.invoices)
      .set({
        customerId,
        amount,
        status,
      })
      .where(
        and(eq(schema.invoices.id, id), eq(schema.invoices.userId, userId)),
      );
  } catch {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
