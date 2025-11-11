import { and, count, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/db/connection";
import { customers, invoices } from "@/db/schema";
import { requireAuth } from "@/features/auth/queries/require-auth";

export async function getInvoicesPages({
  query,
  limit,
}: {
  query: string;
  limit: number;
}) {
  const { userId } = await requireAuth();

  const [invoiceCount] = await db
    .select({ count: count() })
    .from(invoices)
    .innerJoin(customers, eq(invoices.customerId, customers.id))
    .where(
      and(
        eq(invoices.userId, userId),
        or(
          ilike(customers.name, `%${query}%`),
          ilike(customers.email, `%${query}%`),
          ilike(sql`cast(${invoices.amount} as text)`, `%${query}%`),
          ilike(sql`cast(${invoices.date} as text)`, `%${query}%`),
          ilike(sql`cast(${invoices.status} as text)`, `%${query}%`),
        ),
      ),
    );

  const totalPages = Math.ceil(invoiceCount.count / limit);

  return totalPages;
}
