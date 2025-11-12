import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { DashboardInvoicesRevenueChart } from "@/features/dashboard/components/dashboard-invoices-revenue-chart";
import { DashboardLatestInvoices } from "@/features/dashboard/components/dashboard-latest-invoices";
import { DashboardStats } from "@/features/dashboard/components/dashboard-stats";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <>
      <PageHeader breadcrumbs={[{ href: "/dashboard", title: "Dashboard" }]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:gap-6">
        <DashboardStats />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <DashboardInvoicesRevenueChart />
          <DashboardLatestInvoices />
        </div>
      </div>
    </>
  );
}
