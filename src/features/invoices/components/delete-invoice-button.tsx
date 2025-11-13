import { LucideTrash2 } from "lucide-react";
import Form from "next/form";
import { Button } from "@/components/ui/button";
import type { SelectInvoice } from "@/db/schema";
import { deleteInvoice } from "../actions/delete-invoice";

export function DeleteInvoiceButton({ id }: { id: SelectInvoice["id"] }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <Form action={deleteInvoiceWithId}>
      <Button type="submit" size="icon-sm" variant="outline">
        <span className="sr-only">Delete invoice</span>
        <LucideTrash2 />
      </Button>
    </Form>
  );
}
