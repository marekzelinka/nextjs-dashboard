"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { env } from "@/env";

const sql = postgres(env.DATABASE_URL, { ssl: "require" });

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;

  revalidatePath("/dashboard/invoices");
}
