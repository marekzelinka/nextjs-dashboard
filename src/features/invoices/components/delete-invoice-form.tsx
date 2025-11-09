import { TrashIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import { deleteInvoice } from "../actions/delete-invoice";

export function DeleteInvoiceForm({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <Form action={deleteInvoiceWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </Form>
  );
}
