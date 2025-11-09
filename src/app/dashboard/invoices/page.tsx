import type { Metadata } from "next";
import { Suspense } from "react";
import { Pagination } from "@/components/pagination";
import { SearchForm } from "@/components/search-form";
import { CreateInvoiceButton } from "@/features/invoices/components/create-invoice-button";
import { InvoicesTable } from "@/features/invoices/components/invoices-table";
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

  const totalPages = await getInvoicesPages(searchQuery);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-serif text-2xl">Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchForm
          action="/dashboard/invoices"
          placeholder="Search invoices..."
        />
        <CreateInvoiceButton />
      </div>
      <Suspense
        key={searchQuery + currentPage}
        fallback={<InvoicesTableSkeleton />}
      >
        <InvoicesTable query={searchQuery} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
