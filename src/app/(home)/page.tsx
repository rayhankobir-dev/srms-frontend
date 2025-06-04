
import { MetricsCards } from "@/components/home/MetricsCards"
import ProtectedRoute from "@/components/shared/ProtectedRoute"

function HomePage() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN", "MANAGER", "STUFF"]}>
      <div className="space-y-6 px-4">
        <MetricsCards />

        <section>{/* <AreaChartDemo /> */}</section>
      </div>
    </ProtectedRoute>
  )
}

export default HomePage
