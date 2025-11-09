export type CreateInvoiceActionState = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type UpdateInvoiceActionState = CreateInvoiceActionState;
