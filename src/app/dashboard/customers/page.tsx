import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import { SearchBox } from "@/components/search-box";
import { CustomersTable } from "@/features/customers/components/customers-table";
import { CustomersTableSkeleton } from "@/features/customers/skeletons/customers-table-skeleton";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function CustomersPage({
  searchParams,
}: PageProps<"/dashboard/customers">) {
  const { query } = await searchParams;

  const searchQuery = query?.toString() ?? "";

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { href: "/dashboard", title: "Dashboard" },
          { href: "/dashboard/customers", title: "Customers" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:gap-6">
        <div className="flex items-center justify-between gap-2 md:mt-8">
          <SearchBox
            action="/dashboard/customers"
            placeholder="Search invoices..."
          />
        </div>
        <Suspense key={searchQuery} fallback={<CustomersTableSkeleton />}>
          <CustomersTable query={searchQuery} />
        </Suspense>
      </div>
    </>
  );
}
