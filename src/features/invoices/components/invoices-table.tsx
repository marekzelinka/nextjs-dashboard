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
          {invoices.map((invoice) => (
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
                <ItemTitle className="min-w-0 truncate">
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
          ))}
        </ItemGroup>
      </div>
      <div className="max-md:hidden">
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead aria-label="Invoice id">#</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
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
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
