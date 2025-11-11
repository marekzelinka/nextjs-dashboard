import type { Metadata, Route } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getCustomers } from "@/features/customers/queries/get-customers";
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
    getCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${invoiceId}/edit` as Route,
            active: true,
          },
        ]}
      />
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  );
}
