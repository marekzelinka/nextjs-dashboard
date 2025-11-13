import type { Metadata } from "next";
import { Suspense } from "react";
import { DataPagination } from "@/components/data-pagination";
import { PageHeader } from "@/components/page-header";
import { SearchBox } from "@/components/search-box";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { CreateInvoiceButton } from "@/features/invoices/components/create-invoice-button";
import { InvoicesTable } from "@/features/invoices/components/invoices-table";
import { INVOICES_PER_PAGE } from "@/features/invoices/constants";
import { getInvoicePages } from "@/features/invoices/queries/get-invoice-pages";
import { InvoicesTableSkeleton } from "@/features/invoices/skeletons/invoices-table-skeleton";

export const metadata: Metadata = {
  title: "Invoices",
};

export default async function InvoicesPage({
  searchParams,
}: PageProps<"/dashboard/invoices">) {
  const { query, page } = await searchParams;

  const searchQuery = query?.toString() ?? "";
  const currentPage = Number(page) || 1;

  const totalPages = await getInvoicePages({
    query: searchQuery,
    limit: INVOICES_PER_PAGE,
  });

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { href: "/dashboard", title: "Dashboard" },
          { href: "/dashboard/invoices", title: "Invoices" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:gap-6">
        <div className="flex items-center justify-between gap-2">
          <SearchBox
            action="/dashboard/invoices"
            label="Filter by name or customer email"
            placeholder="Filter invoices..."
          />
          <CreateInvoiceButton />
        </div>
        {totalPages > 0 || searchQuery !== "" ? (
          <div className="flex flex-col gap-4">
            <InvoicesTableSkeleton />
            <Suspense
              key={searchQuery + currentPage}
              fallback={<InvoicesTableSkeleton />}
            >
              <InvoicesTable
                query={searchQuery}
                currentPage={currentPage}
                limit={INVOICES_PER_PAGE}
              />
            </Suspense>
            <div className="flex w-full justify-center">
              <DataPagination totalPages={totalPages} />
            </div>
          </div>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>No Invoices Yet</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t created any invoices yet.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>
    </>
  );
}
