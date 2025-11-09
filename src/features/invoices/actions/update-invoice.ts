"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import * as z from "zod";
import { env } from "@/env";
import type { UpdateInvoiceActionState } from "../types";
import { UpdateInvoiceFormValues } from "../validations";

const sql = postgres(env.DATABASE_URL, { ssl: "require" });

export async function updateInvoice(
  id: string,
  _prevState: UpdateInvoiceActionState,
  formData: FormData,
) {
  // Validate form using Zod
  const validatedFields = UpdateInvoiceFormValues.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amount}, status = ${status}
      WHERE id = ${id}
    `;
  } catch {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
