import * as z from "zod";

const InvoiceFormValuesSchema = z.object({
  id: z.string(),
  customerId: z.string().trim().min(1, { error: "Please select a customer." }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." })
    .transform((arg) => arg * 100),
  status: z.enum(["pending", "paid"], {
    error: "Please select an invoice status.",
  }),
  date: z.string(),
});

export const CreateInvoiceFormValues = InvoiceFormValuesSchema.omit({
  id: true,
  date: true,
});

export const UpdateInvoiceFormValues = InvoiceFormValuesSchema.omit({
  id: true,
  date: true,
});
