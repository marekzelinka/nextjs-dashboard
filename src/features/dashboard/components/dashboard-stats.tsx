import {
  BanknotesIcon,
  ClockIcon,
  InboxIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { getDashboardStats } from "../queries/get-dashboard-stats";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export async function DashboardStats() {
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  } = await getDashboardStats();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 font-medium text-sm">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center font-serif text-2xl">
        {value}
      </p>
    </div>
  );
}
