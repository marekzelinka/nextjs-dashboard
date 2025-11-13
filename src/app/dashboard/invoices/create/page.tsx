import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { getCustomerOptions } from "@/features/customers/queries/get-customer-options";
import { CreateInvoiceForm } from "@/features/invoices/components/create-invoice-form";

export const metadata: Metadata = {
  title: "Create Invoice",
};

export default async function CreateInvoicePage() {
  const customers = await getCustomerOptions();

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { href: "/dashboard/invoices", title: "Invoices" },
          { href: "/dashboard/invoices/create", title: "Create Invoice" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:gap-6">
        <div className="mx-auto w-full max-w-md">
          <CreateInvoiceForm customers={customers} />
        </div>
      </div>
    </>
  );
}
