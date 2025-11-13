import { LucideCheck, LucideClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SelectInvoice } from "@/db/schema";
import { cn } from "@/lib/utils";

export function InvoiceStatus({ status }: { status: SelectInvoice["status"] }) {
  return (
    <Badge
      className={cn({
        "bg-gray-100 text-gray-500": status === "pending",
        "bg-green-500 text-white": status === "paid",
      })}
    >
      {status === "pending" ? (
        <>
          Pending
          <LucideClock className="size-4" />
        </>
      ) : status === "paid" ? (
        <>
          Paid
          <LucideCheck className="size-4" />
        </>
      ) : null}
    </Badge>
  );
}
