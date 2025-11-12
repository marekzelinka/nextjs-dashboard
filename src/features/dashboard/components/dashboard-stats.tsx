import {
  LucideBanknote,
  LucideClock3,
  LucideInbox,
  LucideUsers,
} from "lucide-react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { getDashboardStats } from "../queries/get-dashboard-stats";

export async function DashboardStats() {
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  } = await getDashboardStats();

  return (
    <div className="grid auto-rows-min gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatItem title="Collected" value={totalPaidInvoices} type="collected" />
      <StatItem title="Pending" value={totalPendingInvoices} type="pending" />
      <StatItem
        title="Total Invoices"
        value={numberOfInvoices}
        type="invoices"
      />
      <StatItem
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </div>
  );
}

const iconMap = {
  collected: LucideBanknote,
  pending: LucideClock3,
  invoices: LucideInbox,
  customers: LucideUsers,
};

function StatItem({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "invoices" | "customers" | "pending" | "collected";
}) {
  const Icon = iconMap[type];

  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <Icon />
      </ItemMedia>
      <ItemContent>
        <ItemDescription>{title}</ItemDescription>
        <ItemTitle className="font-semibold text-2xl tabular-nums xl:text-3xl">
          {value}
        </ItemTitle>
      </ItemContent>
    </Item>
  );
}
