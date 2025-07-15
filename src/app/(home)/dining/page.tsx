"use client";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import DiningMetrics from "./DiningMetrics";
import { Donut, EggFried, Ham, Soup } from "lucide-react";

function DiningPage() {
  return (
    <div className="space-y-6 px-4">
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-medium">Reservations</h2>
          <p className="text-sm font-light">
            Make sure choose right meal and table
          </p>
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

      <DiningMetrics />
    </div>
  );
}

export default DiningPage;
