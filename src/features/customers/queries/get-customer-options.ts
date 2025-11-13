import { asc, eq } from "drizzle-orm";
import { db } from "@/db/connection";
import * as schema from "@/db/schema";
import { requireAuth } from "@/features/auth/queries/require-auth";

export async function getCustomerOptions() {
  const { userId } = await requireAuth();

  const customers = await db
    .select({
      id: schema.customers.id,
      name: schema.customers.name,
    })
    .from(schema.customers)
    .where(eq(schema.customers.userId, userId))
    .orderBy(asc(schema.customers.name));

  return customers;
}
