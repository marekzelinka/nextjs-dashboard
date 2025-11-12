import { db } from "@/db/connection";
import { requireAuth } from "@/features/auth/queries/require-auth";

export async function getInvoice({ id }: { id: string }) {
  const { userId } = await requireAuth();

  const invoice = await db.query.invoices.findFirst({
    where: (invoices, { eq, and }) =>
      and(eq(invoices.id, id), eq(invoices.userId, userId)),
    columns: {
      id: true,
      amount: true,
      status: true,
    },
    with: {
      customer: {
        columns: {
          id: true,
        },
      },
    },
  });

  if (!invoice) {
    return null;
  }

  const invoiceWithFormattedAmount = {
    ...invoice,
    // Convert amount from cents to dollars
    amount: invoice.amount / 100,
  };

  return invoiceWithFormattedAmount;
}
