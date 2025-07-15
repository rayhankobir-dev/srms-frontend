"use client";
import { ROLE } from "@/constants";
import DiningMetrics from "./dining/DiningMetrics";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import InventoryMetrics from "./inventory/InventoryMetrics";

function HomePage() {
  return (
    <ProtectedRoute allowedRoles={[ROLE.ADMIN, ROLE.MANAGER, ROLE.STAFF]}>
      <div className="space-y-6 px-4">
        <InventoryMetrics hideTodayOverview />
        <DiningMetrics />
      </div>
    </ProtectedRoute>
  );
}

export default HomePage;
