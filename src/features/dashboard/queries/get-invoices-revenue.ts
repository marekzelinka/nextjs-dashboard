import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db/connection";
import * as schema from "@/db/schema";
import { requireAuth } from "@/features/auth/queries/require-auth";

export async function getInvoicesRevenue({
  selectedYear,
}: {
  selectedYear: string;
}) {
  const { userId } = await requireAuth();

  const invoicesRevenue = await db
    .select({
      month: sql<string>`to_char(${schema.invoices.date}, 'Mon')`,
      revenue: sql<number>`sum(case when ${schema.invoices.status} = 'paid' then ${schema.invoices.amount} else 0 end)`,
    })
    .from(schema.invoices)
    .where(
      and(
        eq(schema.invoices.userId, userId),
        eq(
          sql<number>`extract(year from ${schema.invoices.date})`,
          Number(selectedYear),
        ),
      ),
    )
    .groupBy(sql<string>`to_char(${schema.invoices.date}, 'Mon')`);

  return invoicesRevenue;
}
