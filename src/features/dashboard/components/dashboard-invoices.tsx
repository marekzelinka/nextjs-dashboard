import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { getLatestInvoices } from "../queries/get-latest-invoices";

export async function DashboardLatestInvoices() {
  const latestInvoices = await getLatestInvoices();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 font-serif text-xl md:text-2xl">Latest Invoices</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex flex-row items-center justify-between not-last:border-b border-b-gray-200 py-4"
            >
              <div className="flex items-center">
                <Image
                  src={invoice.image_url}
                  alt=""
                  width={32}
                  height={32}
                  className="mr-4 rounded-full"
                />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-sm md:text-base">
                    {invoice.name}
                  </p>
                  <p className="hidden text-gray-500 text-sm sm:block">
                    {invoice.email}
                  </p>
                </div>
              </div>
              <p className="truncate font-medium font-serif text-sm md:text-base">
                {invoice.amount}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pt-6 pb-2">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-gray-500 text-sm">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
