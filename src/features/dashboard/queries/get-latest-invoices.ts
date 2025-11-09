import postgres from "postgres";
import { env } from "@/env";
import type { LatestInvoiceRaw } from "@/types";
import { formatCurrency } from "@/utils/format-currency";

const sql = postgres(env.DATABASE_URL, { ssl: "require" });

export async function getLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw[]>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5
    `;

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));

    return latestInvoices;
  } catch (error) {
    console.error("Database Error:", error);

    throw new Error("Failed to fetch the latest invoices.");
  }
}
