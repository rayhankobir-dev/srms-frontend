import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { Donut, EggFried, Ham, Soup } from "lucide-react";
import Link from "next/link";

function DiningPage() {
  const data = [
    {
      title: "Breakfast",
      value: 23,
      color: "bg-blue-500",
    },
    {
      title: "Lunch",
      value: 23,
      color: "bg-green-500",
    },
    {
      title: "Supper",
      value: 23,
      color: "bg-red-500",
    },
    {
      title: "Dinner",
      value: 23,
      color: "bg-yellow-500",
    },
    {
      title: "Total Tables",
      value: 23,
      color: "bg-purple-500",
    },
    {
      title: "Reserved Tables",
      value: 23,
      color: "bg-purple-500",
    },
  ];
  return (
    <div className="space-y-6 px-4">
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-medium">Dining Management</h2>
          <p className="font-light">Manage your dining and reservations</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.map((item) => (
            <Card key={item.title} className="p-3">
              <div className="flex space-x-3">
                <div className={cn("w-1 shrink-0 rounded", item.color)} />
                <dt className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex w-full items-center justify-between space-x-3 truncate">
                  <span className="truncate font-medium">{item.title}</span>
                </dt>
              </div>
              <div className="mt-2 pb-5">
                <dd className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                  23
                </dd>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-medium">Reservations</h2>
          <p>Make sure choose right meal and table</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Link href="/dining/breakfast">
            <Card className="flex cursor-pointer flex-col items-center justify-center gap-2.5 bg-blue-50 px-3 py-5 text-lg font-medium text-blue-500 md:py-8">
              <EggFried size={30} />
              Breakfast
            </Card>
          </Link>
          <Link href="/dining/lunch">
            <Card className="flex cursor-pointer flex-col items-center justify-center gap-2.5 bg-purple-50 px-3 py-5 text-lg font-medium text-purple-500 md:py-8">
              <Ham size={30} />
              Lunch
            </Card>
          </Link>
          <Link href="/dining/supper">
            <Card className="flex cursor-pointer flex-col items-center justify-center gap-2.5 bg-green-50 px-3 py-5 text-lg font-medium text-green-500 md:py-8">
              <Donut size={30} />
              Supper
            </Card>
          </Link>
          <Link href="/dining/dinner">
            <Card className="flex cursor-pointer flex-col items-center justify-center gap-2.5 bg-orange-50 px-3 py-5 text-lg font-medium text-orange-500 md:py-8">
              <Soup size={30} />
              Dinner
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default DiningPage;
