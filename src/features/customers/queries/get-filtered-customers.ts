import { and, asc, count, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/db/connection";
import * as schema from "@/db/schema";
import { requireAuth } from "@/features/auth/queries/require-auth";
import { formatCurrency } from "@/utils/format-currency";

export async function getFilteredCustomers({ query }: { query: string }) {
  const { userId } = await requireAuth();

  const customers = await db
    .select({
      id: schema.customers.id,
      name: schema.customers.name,
      email: schema.customers.email,
      imageUrl: schema.customers.imageUrl,
      totalInvoices: count(schema.invoices.id),
      totalPending: sql<number>`sum(case when ${schema.invoices.status} = 'pending' then ${schema.invoices.amount} else 0 end)`,
      totalPaid: sql<number>`sum(case when ${schema.invoices.status} = 'paid' then ${schema.invoices.amount} else 0 end)`,
    })
    .from(schema.customers)
    .leftJoin(
      schema.invoices,
      eq(schema.customers.id, schema.invoices.customerId),
    )
    .where(
      and(
        eq(schema.customers.userId, userId),
        or(
          ilike(schema.customers.name, `%${query}%`),
          ilike(schema.customers.email, `%${query}%`),
        ),
      ),
    )
    .groupBy(
      schema.customers.id,
      schema.customers.name,
      schema.customers.email,
      schema.customers.imageUrl,
    )
    .orderBy(asc(schema.customers.name));

  const customersWithFormattedCurrency = customers.map((customer) => ({
    ...customer,
    totalPending: formatCurrency(customer.totalPending),
    totalPaid: formatCurrency(customer.totalPaid),
  }));

  return customersWithFormattedCurrency;
}
