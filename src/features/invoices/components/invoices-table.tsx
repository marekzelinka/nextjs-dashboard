import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
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
import { DeleteInvoiceButton } from "./delete-invoice-button";
import { EditInvoiceButton } from "./edit-invoice-button";
import { InvoiceStatus } from "./invoice-status";

const tableColumns = [
  { header: "#", label: "Invoice id" },
  { header: "Customer" },
  { header: "Date" },
  { header: "Status" },
  { header: "Amount", className: "text-right" },
  { header: <span className="sr-only">"Actions"</span> },
];

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
    <>
      <div className="md:hidden">
        <ItemGroup className="gap-4">
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <Item key={invoice.id} role="listitem" variant="outline">
                <ItemMedia>
                  <Avatar className="size-10">
                    <AvatarImage src={invoice.customer.imageUrl} />
                    <AvatarFallback>
                      {invoice.customer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>
                    {invoice.customer.name}{" "}
                    <span className="font-normal text-muted-foreground">
                      {invoice.customer.email}
                    </span>
                  </ItemTitle>
                  <ItemDescription>
                    {formatDateToLocal(invoice.date)}
                  </ItemDescription>
                </ItemContent>
                <ItemContent>
                  <ItemDescription className="text-right text-foreground tabular-nums">
                    {formatCurrency(invoice.amount)}
                  </ItemDescription>
                  <ItemDescription className="text-right">
                    <InvoiceStatus status={invoice.status} />
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <EditInvoiceButton id={invoice.id} />
                  <DeleteInvoiceButton id={invoice.id} />
                </ItemActions>
              </Item>
            ))
          ) : (
            <Item
              role="listitem"
              variant="outline"
              className="h-24 text-center"
            >
              <ItemContent>No results.</ItemContent>
            </Item>
          )}
        </ItemGroup>
      </div>
      <div className="max-md:hidden">
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                {tableColumns.map((column, index) => (
                  <TableHead
                    key={index}
                    aria-label={column.label}
                    className={column.className}
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="tabular-nums">{invoice.id}</TableCell>
                    <TableCell>
                      <Item className="p-0">
                        <ItemMedia>
                          <Avatar className="size-10">
                            <AvatarImage src={invoice.customer.imageUrl} />
                            <AvatarFallback>
                              {invoice.customer.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>{invoice.customer.name}</ItemTitle>
                          <ItemDescription>
                            {invoice.customer.email}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                    </TableCell>
                    <TableCell>{formatDateToLocal(invoice.date)}</TableCell>
                    <TableCell>
                      <InvoiceStatus status={invoice.status} />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatCurrency(invoice.amount)}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <EditInvoiceButton id={invoice.id} />
                        <DeleteInvoiceButton id={invoice.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableColumns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
