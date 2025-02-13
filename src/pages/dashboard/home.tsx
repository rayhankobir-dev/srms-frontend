import Meta from "@/components/common/meta";
import { BarChartDemo } from "@/components/charts/bar-chart";
import { AreaChartDemo } from "@/components/charts/area-chart";
import { LineChartDemo } from "@/components/charts/line-chart";

export default function HomePage() {
  return (
    <main className="space-y-4">
      <Meta title="Dashboard" />
      <AreaChartDemo />
      <div className="grid md:grid-cols-2 gap-4">
        <BarChartDemo />
        <LineChartDemo />
      </div>
    </main>
  );
}
