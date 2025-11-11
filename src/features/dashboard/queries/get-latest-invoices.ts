import { desc, eq } from "drizzle-orm";
import { db } from "@/db/connection";
import * as schema from "@/db/schema";
import { requireAuth } from "@/features/auth/queries/require-auth";
import { formatCurrency } from "@/utils/format-currency";

export async function getLatestInvoices() {
  const { userId } = await requireAuth();

  const invoices = await db.query.invoices.findMany({
    where: eq(schema.invoices.userId, userId),
    columns: {
      id: true,
      amount: true,
    },
    with: {
      customer: {
        columns: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
    orderBy: desc(schema.invoices.date),
    limit: 5,
  });

  const invoicesWithFormattedCurrency = invoices.map((invoice) => ({
    ...invoice,
    amount: formatCurrency(invoice.amount),
  }));

  return invoicesWithFormattedCurrency;
}
