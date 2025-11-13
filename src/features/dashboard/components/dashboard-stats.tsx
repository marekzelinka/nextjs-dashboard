import {
  LucideBanknote,
  LucideClock3,
  type LucideIcon,
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
      <DashboardStat
        title="Collected"
        value={totalPaidInvoices}
        type="collected"
      />
      <DashboardStat
        title="Pending"
        value={totalPendingInvoices}
        type="pending"
      />
      <DashboardStat
        title="Total Invoices"
        value={numberOfInvoices}
        type="invoices"
      />
      <DashboardStat
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </div>
  );
}

type StatType = "invoices" | "customers" | "pending" | "collected";

const iconMap: { [key in StatType]: LucideIcon } = {
  collected: LucideBanknote,
  pending: LucideClock3,
  invoices: LucideInbox,
  customers: LucideUsers,
};

function DashboardStat({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: StatType;
}) {
  const Icon = iconMap[type];

  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <Icon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="text-muted-foreground">{title}</ItemTitle>
        <ItemDescription className="font-semibold text-2xl text-foreground tabular-nums xl:text-3xl">
          {value}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
