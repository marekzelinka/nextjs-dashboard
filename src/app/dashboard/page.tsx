import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { DashboardLatestInvoices } from "@/features/dashboard/components/dashboard-invoices";
import { DashboardInvoicesRevenueChart } from "@/features/dashboard/components/dashboard-invoices-revenue-chart";
import { DashboardStats } from "@/features/dashboard/components/dashboard-stats";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <>
      <PageHeading title="Dashboard" />
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-4 py-10">
        <DashboardStats />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <DashboardInvoicesRevenueChart />
          <DashboardLatestInvoices />
        </div>
      </div>
    </>
  );
}
