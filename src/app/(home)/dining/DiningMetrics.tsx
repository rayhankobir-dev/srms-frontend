import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import api, { endpoints } from "@/lib/api";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import Spinner from "@/components/shared/Spinner";

const colors = ["bg-blue-500", "bg-green-500", "bg-red-500", "bg-yellow-500"];

function DiningMetrics() {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetics] = useState<any>([]);

  const fetchData = async () => {
    try {
      const { data } = await api.get(endpoints.metrics.dining);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const metrics = Object.entries(data).map(([key, value], index) => ({
        title: key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase()),
        value,
        color: colors[index % colors.length],
      }));
      setMetics(metrics);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-6">
        <Spinner />
      </div>
    );
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-medium">Dining Overview</h2>
        <p className="text-sm font-light">
          Manage your dining and reservations
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((item: any) => (
          <Card key={item.title} className="p-3">
            <div className="flex space-x-3">
              <div className={cn("w-1 shrink-0 rounded", item.color)} />
              <dt className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex w-full items-center justify-between space-x-3 truncate">
                <span className="truncate font-medium">{item.title}</span>
              </dt>
            </div>
            <div className="mt-2 pb-5">
              <dd className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                {item.value}

                <span className="ml-2 text-sm font-light text-gray-500">
                  orders/tables
                </span>
              </dd>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default DiningMetrics;
