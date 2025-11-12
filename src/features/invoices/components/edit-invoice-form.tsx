"use client";

import { LucidePen } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useActionState, useId } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectOption } from "@/components/ui/native-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import type { SelectCustomer, SelectInvoice } from "@/db/schema";
import { updateInvoice } from "../actions/update-invoice";
import type { UpdateInvoiceActionState } from "../types";

const statusOptions: { [key in SelectInvoice["status"]]: string } = {
  pending: "Pending",
  paid: "Paid",
};

export function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: Pick<SelectInvoice, "id" | "amount" | "status"> & {
    customer: Pick<SelectCustomer, "id">;
  };
  customers: Pick<SelectCustomer, "id" | "name">[];
}) {
  const initialState: UpdateInvoiceActionState = { message: null, errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [formState, formAction, isPending] = useActionState(
    updateInvoiceWithId,
    initialState,
  );

  console.log(invoice.customer.id);

  const formId = useId();

  return (
    <Form action={formAction} aria-describedby={`${formId}-form-error`}>
      <FieldGroup>
        <Field
          data-disabled={isPending}
          data-invalid={Boolean(formState.errors?.customerId?.length)}
        >
          <FieldLabel htmlFor={`${formId}-customerId`}>
            Choose customer
          </FieldLabel>
          <Select
            name="customerId"
            id={`${formId}-customerId`}
            disabled={isPending}
            aria-invalid={Boolean(formState.errors?.customerId?.length)}
            defaultValue={invoice.customer.id}
          >
            <SelectOption value="">Select a customer</SelectOption>
            {customers.map((customer) => (
              <SelectOption key={customer.id} value={customer.id}>
                {customer.name}
              </SelectOption>
            ))}
          </Select>
          {formState.errors?.customerId ? (
            <FieldError>{formState.errors.customerId[0]}</FieldError>
          ) : null}
        </Field>
        <Field
          data-disabled={isPending}
          data-invalid={Boolean(formState.errors?.amount?.length)}
        >
          <FieldLabel htmlFor={`${formId}-amount`}>Amount</FieldLabel>
          <Input
            type="number"
            name="amount"
            id={`${formId}-amount`}
            disabled={isPending}
            aria-invalid={Boolean(formState.errors?.amount?.length)}
            step="0.01"
            placeholder="Enter USD amount"
            defaultValue={invoice.amount}
          />
          {formState.errors?.amount ? (
            <FieldError>{formState.errors.amount[0]}</FieldError>
          ) : null}
        </Field>
        <FieldSet
          data-disabled={isPending}
          data-invalid={Boolean(formState.errors?.status?.length)}
        >
          <FieldLabel>Set the invoice status</FieldLabel>
          <RadioGroup
            name="status"
            aria-invalid={Boolean(formState.errors?.status?.length)}
            defaultValue={invoice.status}
          >
            {Object.entries(statusOptions).map(([value, title]) => (
              <Field
                key={value}
                orientation="horizontal"
                data-disabled={isPending}
                data-invalid={Boolean(formState.errors?.status?.length)}
              >
                <RadioGroupItem
                  id={`${formId}-${value}-status`}
                  value={value}
                  aria-invalid={Boolean(formState.errors?.status?.length)}
                />
                <FieldLabel
                  htmlFor={`${formId}-${value}-status`}
                  className="font-normal"
                >
                  {title}
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
          {formState.errors?.status ? (
            <FieldError>{formState.errors.status[0]}</FieldError>
          ) : null}
        </FieldSet>
        <Field>
          {formState.message ? (
            <FieldError id={`${formId}-form-error`}>
              {formState.message}
            </FieldError>
          ) : null}
          <div className="flex justify-end gap-3">
            <Button type="submit" disabled={isPending} className="order-last">
              {isPending ? (
                <>
                  <Spinner />
                  Saving Invoice...
                </>
              ) : (
                <>
                  <LucidePen />
                  Edit Invocie
                </>
              )}
            </Button>
            <Button asChild variant="secondary">
              <Link href="/dashboard/invoices">Cancel</Link>
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </Form>
  );
}
