import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchForm } from "@/components/search-form";
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
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-serif text-2xl">Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchForm
          action="/dashboard/customers"
          placeholder="Search invoices..."
        />
      </div>
      <Suspense key={searchQuery} fallback={<CustomersTableSkeleton />}>
        <CustomersTable query={searchQuery} />
      </Suspense>
    </div>
  );
}
