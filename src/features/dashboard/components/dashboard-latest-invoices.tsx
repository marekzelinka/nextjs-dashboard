import { LucideRotateCcw } from "lucide-react";
import { Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { getLatestInvoices } from "../queries/get-latest-invoices";

export async function DashboardLatestInvoices() {
  const latestInvoices = await getLatestInvoices();

  return (
    <Card>
      <CardHeader>
        <CardTitle asChild>
          <h3>Latest Invoices</h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <ItemGroup className="-mt-4 flow-root">
          {latestInvoices.map((invoice, index) => (
            <Fragment key={invoice.id}>
              <Item role="listitem">
                <ItemMedia>
                  <Avatar>
                    <AvatarImage
                      src={invoice.customer.imageUrl}
                      className="grayscale"
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
                <ItemContent className="flex-none text-center">
                  <ItemDescription>{invoice.amount}</ItemDescription>
                </ItemContent>
              </Item>
              {index !== latestInvoices.length - 1 && <ItemSeparator />}
            </Fragment>
          ))}
        </ItemGroup>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <LucideRotateCcw className="size-4 text-muted-foreground" />
          <h4 className="text-muted-foreground text-sm">Updated just now</h4>
        </div>
      </CardFooter>
    </Card>
  );
}
