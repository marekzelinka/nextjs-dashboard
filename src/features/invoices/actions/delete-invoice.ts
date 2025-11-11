"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/connection";
import * as schema from "@/db/schema";
import { requireAuth } from "@/features/auth/queries/require-auth";

export async function deleteInvoice(id: string) {
  const { userId } = await requireAuth();

  await db
    .delete(schema.invoices)
    .where(and(eq(schema.invoices.id, id), eq(schema.invoices.userId, userId)));

  revalidatePath("/dashboard/invoices");
}
