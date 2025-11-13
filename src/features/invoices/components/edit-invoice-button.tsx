import { LucidePen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { SelectInvoice } from "@/db/schema";

export function EditInvoiceButton({ id }: { id: SelectInvoice["id"] }) {
  return (
    <Button asChild size="icon-sm" variant="outline">
      <Link href={`/dashboard/invoices/${id}/edit`}>
        <span className="sr-only">Edit invoice</span>
        <LucidePen />
      </Link>
    </Button>
  );
}
