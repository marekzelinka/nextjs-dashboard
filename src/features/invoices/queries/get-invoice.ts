import { db } from "@/db/connection";
import { requireAuth } from "@/features/auth/queries/require-auth";

export async function getInvoice({ id }: { id: string }) {
  const { userId } = await requireAuth();

  const invoices = await db.query.invoices.findFirst({
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

  if (!invoices) {
    return null;
  }

  const invoiceWithFormattedAmount = {
    ...invoices,
    // Convert amount from cents to dollars
    amount: invoices.amount / 100,
  };

  return invoiceWithFormattedAmount;
}
