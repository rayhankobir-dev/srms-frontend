import toast from "react-hot-toast";
import api, { endpoints } from "@/lib/api";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import Spinner from "@/components/shared/Spinner";

function InventoryMetrics({
  initialData = null,
  hideTodayOverview = false,
}: {
  initialData?: any;
  hideTodayOverview?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(initialData ? false : true);
  const [data, setData] = useState<any>(initialData);

  const fetchData = async () => {
    try {
      const { data } = await api.get(endpoints.metrics.inventory);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setData(data);
      console.log(data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) {
      fetchData();
    }
  }, [initialData]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-6">
        <Spinner />
      </div>
    );
  return (
    <div className="space-y-6">
      <section className="space-y-2.5">
        <div>
          <h2 className="text-lg font-medium">Inventory Overview</h2>
          <p className="text-sm font-light">
            Track overall inventory, stock and sales performance
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-3">
            <div className="flex space-x-3">
              <div className="w-1 shrink-0 rounded bg-blue-500" />
              <dt className="flex w-full items-center justify-between truncate">
                <span className="truncate font-medium">Total Inventory</span>
              </dt>
            </div>
            <div className="mt-2 flex items-center gap-2 pb-5">
              <dd className="font-semibold">{data.totalInventory ?? 0}</dd>
              <span className="text-sm font-medium">kg</span>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex space-x-3">
              <div className="w-1 shrink-0 rounded bg-green-500" />
              <dt className="flex w-full items-center justify-between truncate">
                <span className="truncate font-medium">Total Stocks</span>
              </dt>
            </div>
            <div className="mt-2 flex items-center gap-2 pb-5">
              <dd className="font-semibold">{data.totalStocks ?? 0}</dd>
              <span className="text-sm font-medium">items</span>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex space-x-3">
              <div className="w-1 shrink-0 rounded bg-yellow-500" />
              <dt className="flex w-full items-center justify-between truncate">
                <span className="truncate font-medium">Sold Items</span>
              </dt>
            </div>
            <div className="mt-2 flex items-center gap-2 pb-5">
              <dd className="font-semibold">{data.soldItemCount ?? 0}</dd>
              <span className="text-sm font-medium">units</span>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex space-x-3">
              <div className="w-1 shrink-0 rounded bg-lime-500" />
              <dt className="flex w-full items-center justify-between truncate">
                <span className="truncate font-medium">Sold Amount</span>
              </dt>
            </div>
            <div className="mt-2 flex items-center gap-2 pb-5">
              <dd className="font-semibold">{data.soldAmount ?? 0}</dd>
              <span className="text-sm font-medium">৳</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Today's Inventory Section */}
      {!hideTodayOverview && (
        <section className="space-y-2.5">
          <div>
            <h2 className="text-lg font-medium">Today’s Overview</h2>
            <p className="text-sm font-light">
              Today&apos;s inventory and stock statistics
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-3">
              <div className="flex space-x-3">
                <div className="w-1 shrink-0 rounded bg-blue-500" />
                <dt className="flex w-full items-center justify-between truncate">
                  <span className="truncate font-medium">In Stock</span>
                </dt>
              </div>
              <div className="mt-2 flex items-center gap-2 pb-5">
                <dd className="font-semibold">{data.todayInventory.inStock}</dd>
                <span className="text-sm font-medium">kg</span>
              </div>
            </Card>

            <Card className="p-3">
              <div className="flex space-x-3">
                <div className="w-1 shrink-0 rounded bg-green-500" />
                <dt className="flex w-full items-center justify-between truncate">
                  <span className="truncate font-medium">Cooked</span>
                </dt>
              </div>
              <div className="mt-2 flex items-center gap-2 pb-5">
                <dd className="font-semibold">{data.todayInventory.cooked}</dd>
                <span className="text-sm font-medium">items</span>
              </div>
            </Card>

            <Card className="p-3">
              <div className="flex space-x-3">
                <div className="w-1 shrink-0 rounded bg-yellow-500" />
                <dt className="flex w-full items-center justify-between truncate">
                  <span className="truncate font-medium">New Stock</span>
                </dt>
              </div>
              <div className="mt-2 flex items-center gap-2 pb-5">
                <dd className="font-semibold">
                  {data.todayInventory.newStock}
                </dd>
                <span className="text-sm font-medium">units</span>
              </div>
            </Card>

            <Card className="p-3">
              <div className="flex space-x-3">
                <div className="w-1 shrink-0 rounded bg-red-500" />
                <dt className="flex w-full items-center justify-between truncate">
                  <span className="truncate font-medium">Stored In</span>
                </dt>
              </div>
              <div className="mt-2 flex items-center gap-2 pb-5">
                <dd className="font-semibold">
                  {data.todayStock?.storeIn ?? 0}
                </dd>
                <span className="text-sm font-medium">units</span>
              </div>
            </Card>

            <Card className="p-3">
              <div className="flex space-x-3">
                <div className="w-1 shrink-0 rounded bg-red-500" />
                <dt className="flex w-full items-center justify-between truncate">
                  <span className="truncate font-medium">Stored Out</span>
                </dt>
              </div>
              <div className="mt-2 flex items-center gap-2 pb-5">
                <dd className="font-semibold">
                  {data.todayStock?.storeOut ?? 0}
                </dd>
                <span className="text-sm font-medium">units</span>
              </div>
            </Card>

            <Card className="p-3">
              <div className="flex space-x-3">
                <div className="w-1 shrink-0 rounded bg-red-500" />
                <dt className="flex w-full items-center justify-between truncate">
                  <span className="truncate font-medium">Carried</span>
                </dt>
              </div>
              <div className="mt-2 flex items-center gap-2 pb-5">
                <dd className="font-semibold">
                  {data.todayStock?.carried ?? 0}
                </dd>
                <span className="text-sm font-medium">units</span>
              </div>
            </Card>

            <Card className="p-3">
              <div className="flex space-x-3">
                <div className="w-1 shrink-0 rounded bg-red-500" />
                <dt className="flex w-full items-center justify-between truncate">
                  <span className="truncate font-medium">Current Stock</span>
                </dt>
              </div>
              <div className="mt-2 flex items-center gap-2 pb-5">
                <dd className="font-semibold">
                  {data.todayStock?.current ?? 0}
                </dd>
                <span className="text-sm font-medium">units</span>
              </div>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}

export default InventoryMetrics;
