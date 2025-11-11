import { count, eq, sql } from "drizzle-orm";
import { db } from "@/db/connection";
import * as schema from "@/db/schema";
import { requireAuth } from "@/features/auth/queries/require-auth";
import { formatCurrency } from "@/utils/format-currency";

export async function getDashboardStats() {
  const { userId } = await requireAuth();

  const invoiceCountPromise = db
    .select({ count: count() })
    .from(schema.invoices)
    .where(eq(schema.invoices.userId, userId));
  const customerCountPromise = db
    .select({ count: count() })
    .from(schema.customers)
    .where(eq(schema.customers.userId, userId));
  const invoiceStatusPromise = db
    .select({
      paid: sql<number>`SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)`,
      pending: sql<number>`SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END)`,
    })
    .from(schema.invoices)
    .where(eq(schema.invoices.userId, userId));

  const [[invoiceCount], [customerCount], [invoiceStatus]] = await Promise.all([
    invoiceCountPromise,
    customerCountPromise,
    invoiceStatusPromise,
  ]);

  return {
    numberOfCustomers: customerCount.count,
    numberOfInvoices: invoiceCount.count,
    totalPaidInvoices: formatCurrency(invoiceStatus.paid),
    totalPendingInvoices: formatCurrency(invoiceStatus.pending),
  };
}
