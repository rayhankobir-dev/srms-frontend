"use client";
import toast from "react-hot-toast";
import api, { endpoints } from "@/lib/api";
import { useEffect, useState } from "react";
import { ChartConfig } from "@/components/ui/Chart";
import { Loader } from "@/components/ui/LoadingScreen";
import AreaChartDemo from "@/components/charts/AreaChart";
import InventoryMetrics from "./InventoryMetrics";

const chartConfig = {
  visitors: {
    label: "Inventory",
  },
  desktop: {
    label: "Total Stocks",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Total Sales",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function InventoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

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
    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="space-y-6 px-4">
      <InventoryMetrics initialData={data} />

      <section className="space-y-2.5">
        <div>
          <h2 className="text-lg font-medium">Inventory Stastics</h2>
          <p className="text-sm font-light">Inventory and stocks statistics</p>
        </div>

        <div>
          <AreaChartDemo chartConfig={chartConfig} data={data?.stastics} />
        </div>
      </section>
    </div>
  );
}

export default InventoryPage;
