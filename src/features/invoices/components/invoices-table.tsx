import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/format-currency";
import { formatDateToLocal } from "@/utils/format-date";
import { getFilteredInvoices } from "../queries/get-filtered-invoices";
import { DeleteInvoiceForm } from "./delete-invoice-form";
import { EditInvoiceButton } from "./edit-invoice-button";
import { InvoiceStatus } from "./invoice-status";

export async function InvoicesTable({
  query,
  currentPage,
  limit,
}: {
  query: string;
  currentPage: number;
  limit: number;
}) {
  const invoices = await getFilteredInvoices({ query, currentPage, limit });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Sttatus</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="sr-only">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium tabular-nums">
              {invoice.id}
            </TableCell>
            <TableCell>
              <Item>
                <ItemMedia>
                  <Avatar>
                    <AvatarImage
                      src={invoice.customer.imageUrl}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {invoice.customer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{invoice.customer.name}</ItemTitle>
                  <ItemDescription>{invoice.customer.email}</ItemDescription>
                </ItemContent>
              </Item>
            </TableCell>
            <TableCell>{formatDateToLocal(invoice.date)}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell className="text-right tabular-nums">
              {formatCurrency(invoice.amount)}
            </TableCell>

            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.customer.imageUrl}
                        alt=""
                        width={28}
                        height={28}
                        className="mr-2 rounded-full"
                      />
                      <p>{invoice.customer.name}</p>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {invoice.customer.email}
                    </p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="font-medium text-xl">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <EditInvoiceButton id={invoice.id} />
                    <DeleteInvoiceForm id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left font-normal text-sm">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pr-3 pl-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pr-3 pl-6">
                    <div className="flex items-center gap-3">
                      <Image
                        src={invoice.customer.imageUrl}
                        alt=""
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                      <p>{invoice.customer.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.customer.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3 pl-6">
                    <div className="flex justify-end gap-3">
                      <EditInvoiceButton id={invoice.id} />
                      <DeleteInvoiceForm id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
