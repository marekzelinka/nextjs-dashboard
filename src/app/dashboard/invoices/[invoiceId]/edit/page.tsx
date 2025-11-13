import type { Metadata, Route } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { getCustomerOptions } from "@/features/customers/queries/get-customer-options";
import { EditInvoiceForm } from "@/features/invoices/components/edit-invoice-form";
import { getInvoice } from "@/features/invoices/queries/get-invoice";

export const metadata: Metadata = {
  title: "Edit Invoice",
};

export default async function EditInvoicePage({
  params,
}: PageProps<"/dashboard/invoices/[invoiceId]/edit">) {
  const { invoiceId } = await params;

  const [invoice, customers] = await Promise.all([
    getInvoice({ id: invoiceId }),
    getCustomerOptions(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { href: "/dashboard/invoices", title: "Invoices" },
          {
            href: `/dashboard/invoices/${invoiceId}/edit` as Route,
            title: "Edit Invoices",
          },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:gap-6">
        <div className="mx-auto w-full max-w-md">
          <EditInvoiceForm invoice={invoice} customers={customers} />
        </div>
      </div>
    </>
  );
}
