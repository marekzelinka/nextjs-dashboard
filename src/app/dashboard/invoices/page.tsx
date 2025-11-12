import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import { Pagination } from "@/components/pagination";
import { SearchBox } from "@/components/search-box";
import { CreateInvoiceButton } from "@/features/invoices/components/create-invoice-button";
import { InvoicesTable } from "@/features/invoices/components/invoices-table";
import { INVOICES_PER_PAGE } from "@/features/invoices/constants";
import { getInvoicesPages } from "@/features/invoices/queries/get-invoices-pages";
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

  const totalPages = await getInvoicesPages({
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
            placeholder="Filter invoices..."
          />
          <CreateInvoiceButton />
        </div>
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
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
