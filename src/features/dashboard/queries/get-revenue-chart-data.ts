import postgres from "postgres";
import { env } from "@/env";
import type { Revenue } from "@/types";

const sql = postgres(env.DATABASE_URL, { ssl: "require" });

export async function getRevenueChartData() {
  try {
    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    return data;
  } catch (error) {
    console.error("Database Error:", error);

    throw new Error("Failed to fetch revenue data.");
  }
}
