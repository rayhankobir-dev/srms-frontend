import { AreaChartDemo } from "@/components/charts/area-chart";
import { BarChartDemo } from "@/components/charts/bar-chart";
import { LineChartDemo } from "@/components/charts/line-chart";

export default function HomePage() {
  return (
    <main className="space-y-4">
      <AreaChartDemo />
      <div className="grid md:grid-cols-2 gap-4">
        <BarChartDemo />
        <LineChartDemo />
      </div>
    </main>
  );
}
