import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/db/connection";
import * as schema from "@/db/schema";
import { requireAuth } from "@/features/auth/queries/require-auth";

export async function getFilteredInvoices({
  query,
  currentPage,
  limit,
}: {
  query: string;
  currentPage: number;
  limit: number;
}) {
  const { userId } = await requireAuth();

  const offset = (currentPage - 1) * limit;

  const invoices = await db
    .select({
      id: schema.invoices.id,
      amount: schema.invoices.amount,
      status: schema.invoices.status,
      date: schema.invoices.date,
      name: schema.customers.name,
      email: schema.customers.email,
      imageUrl: schema.customers.imageUrl,
    })
    .from(schema.invoices)
    .innerJoin(
      schema.customers,
      eq(schema.invoices.customerId, schema.customers.id),
    )
    .where(
      and(
        eq(schema.invoices.userId, userId),
        or(
          ilike(schema.customers.name, `%${query}%`),
          ilike(schema.customers.email, `%${query}%`),
          ilike(sql`cast(${schema.invoices.amount} as text)`, `%${query}%`),
          ilike(sql`cast(${schema.invoices.date} as text)`, `%${query}%`),
          ilike(sql`cast(${schema.invoices.status} as text)`, `%${query}%`),
        ),
      ),
    )
    .orderBy(desc(schema.invoices.date))
    .limit(limit)
    .offset(offset);

  const invoicesWithCustomerField = invoices.map(
    ({ name, email, imageUrl, ...invoice }) => ({
      ...invoice,
      customer: {
        name,
        email,
        imageUrl,
      },
    }),
  );

  return invoicesWithCustomerField;
}
