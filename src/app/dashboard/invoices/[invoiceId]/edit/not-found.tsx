import { LucideArrowLeft } from "lucide-react";
import Link from "next/link";
import { NotFoundPage } from "@/components/not-found-page";
import { Button } from "@/components/ui/button";

export default function EditInvoiceNotFound() {
  return (
    <NotFoundPage
      title="Invoice Not Found"
      description="Could not find the requested invoice."
    >
      <Button asChild size="sm">
        <Link href="/dashboard/invoices">
          <LucideArrowLeft />
          Go to Invoices
        </Link>
      </Button>
    </NotFoundPage>
  );
}
