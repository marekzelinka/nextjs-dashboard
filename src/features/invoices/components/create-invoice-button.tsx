import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CreateInvoiceButton() {
  return (
    <Button asChild>
      <Link href="/dashboard/invoices/create">Create Invoice</Link>
    </Button>
  );
}
