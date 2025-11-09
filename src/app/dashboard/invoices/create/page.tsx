import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getCustomers } from "@/features/customers/queries/get-customers";
import { CreateInvoiceForm } from "@/features/invoices/components/create-invoice-form";

export const metadata: Metadata = {
  title: "Create Invoice",
};

export default async function CreateInvoicePage() {
  const customers = await getCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Create Invoice",
            href: "/dashboard/invoices/create",
            active: true,
          },
        ]}
      />
      <CreateInvoiceForm customers={customers} />
    </main>
  );
}
