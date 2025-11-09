import postgres from "postgres";
import { env } from "@/env";
import type { CustomerField } from "@/types";

const sql = postgres(env.DATABASE_URL, { ssl: "require" });

export async function getCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return customers;
  } catch (error) {
    console.error("Database Error:", error);

    throw new Error("Failed to fetch all customers.");
  }
}
