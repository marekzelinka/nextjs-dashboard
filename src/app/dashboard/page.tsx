import type { Metadata } from "next";
import { DashboardLatestInvoices } from "@/features/dashboard/components/dashboard-invoices";
import { DashboardInvoicesRevenueChart } from "@/features/dashboard/components/dashboard-invoices-revenue-chart";
import { DashboardStats } from "@/features/dashboard/components/dashboard-stats";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <main>
      <h1 className="mb-4 font-serif text-xl md:text-2xl">Dashboard</h1>
      <DashboardStats />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <DashboardInvoicesRevenueChart />
        <DashboardLatestInvoices />
      </div>
    </main>
  );
}
