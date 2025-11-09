import postgres from "postgres";
import { env } from "@/env";
import type { InvoiceForm } from "@/types";

const sql = postgres(env.DATABASE_URL, { ssl: "require" });

export async function getInvoice(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error("Database Error:", error);

    throw new Error("Failed to fetch invoice.");
  }
}
