import { CalendarIcon } from "@heroicons/react/24/outline";
import { generateYAxis } from "@/utils/chart";
import { getRevenueChartData } from "../queries/get-revenue-chart-data";

const CHART_HEIGHT = 350;

export async function DashboardRevenueChart() {
  const revenue = await getRevenueChartData();

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  return (
    <div className="w-full md:col-span-4">
      <h2 className="mb-4 font-serif text-xl md:text-2xl">Recent Revenue</h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-gray-400 text-sm sm:flex"
            style={{ height: `${CHART_HEIGHT}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>
          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(CHART_HEIGHT / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-gray-400 text-sm sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pt-6 pb-2">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-gray-500 text-sm">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
