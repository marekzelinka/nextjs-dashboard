import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tableColumns = [
  { header: "#", label: "Invoice id" },
  { header: "Customer" },
  { header: "Date" },
  { header: "Status" },
  { header: "Amount", className: "text-right" },
  { header: <span className="sr-only">"Actions"</span> },
];

export function InvoicesTableSkeleton() {
  return (
    <>
      <div className="md:hidden">
        <ItemGroup className="gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Item key={i} role="listitem" variant="outline">
              <ItemMedia>
                {/* invoice.customer.imageUrl  */}
                <Skeleton className="size-10 rounded-full" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  {/* invoice.customer.name */}
                  <Skeleton className="h-4 w-30" />
                  {/* invoice.customer.email */}
                  <Skeleton className="h-4 w-30" />
                </ItemTitle>
                <ItemDescription>
                  {/* invoice.date */}
                  <Skeleton className="h-4 w-30 bg-red-500" />
                </ItemDescription>
              </ItemContent>
              <ItemContent>
                <ItemDescription className="text-right text-foreground tabular-nums">
                  {/* invoice.amount */}
                  <Skeleton className="h-4 w-30" />
                </ItemDescription>
                <ItemDescription className="text-right">
                  {/* invoice.status */}
                  <Skeleton className="h-4 w-28" />
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                {/* EditInvoiceButton */}
                <Skeleton className="h-8 w-8" />
                {/* DeleteInvoiceButton */}
                <Skeleton className="h-8 w-8" />
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
              {Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="tabular-nums">
                    {/* invoice.id */}
                    <Skeleton className="h-4 w-3" />
                  </TableCell>
                  <TableCell>
                    <Item className="p-0">
                      <ItemMedia>
                        {/* invoice.customer.imageUrl  */}
                        <Skeleton className="size-10 rounded-full" />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>
                          {/* invoice.customer.name */}
                          <Skeleton className="h-4 w-30" />
                        </ItemTitle>
                        <ItemDescription>
                          {/* invoice.customer.email */}
                          <Skeleton className="h-4 w-30" />
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                  </TableCell>
                  <TableCell>
                    {/* invoice.date */}
                    <Skeleton className="h-4 w-30" />
                  </TableCell>
                  <TableCell>
                    {/* invoice.status */}
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {/* invoice.amount */}
                    <Skeleton className="h-4 w-30" />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      {/* EditInvoiceButton */}
                      <Skeleton className="h-8 w-8" />
                      {/* DeleteInvoiceButton */}
                      <Skeleton className="h-8 w-8" />
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
