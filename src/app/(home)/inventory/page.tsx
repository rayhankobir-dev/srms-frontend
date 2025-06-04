"use client"
import AreaChartDemo from "@/components/charts/AreaChart"
import { Card } from "@/components/ui/Card"
import { ChartConfig } from "@/components/ui/Chart"
import { Loader } from "@/components/ui/LoadingScreen"
import api from "@/lib/api"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

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
} satisfies ChartConfig

function InventoryPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  const fetchData = async () => {
    try {
      const { data } = await api.get("/restaurant-stocks/metrics")
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setData(data)
      console.log(data)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading)
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader />
      </div>
    )

  return (
    <div className="space-y-6 px-4">
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-medium">Inventory Management</h2>
          <p className="font-light">Manage your inventory and stocks</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data?.metrics?.map((item: any) => (
            <Card key={item.title} className="p-3">
              <div className="flex space-x-3">
                <div className={cn("w-1 shrink-0 rounded", item.color)} />
                <dt className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex w-full items-center justify-between space-x-3 truncate">
                  <span className="truncate font-medium">{item.title}</span>
                </dt>
              </div>
              <div className="mt-2 flex items-center gap-2 pb-5">
                <dd className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                  {item.value}
                </dd>
                <span className="text-sm font-medium">{item?.unit}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-medium">Inventory Stastics</h2>
          <p>Manage your inventory and stocks</p>
        </div>

        <div>
          <AreaChartDemo chartConfig={chartConfig} data={data?.stastics} />
        </div>
      </section>
    </div>
  )
}

export default InventoryPage
