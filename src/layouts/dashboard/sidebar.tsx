import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./sidenav";
import DashboardSwitcher from "./dashboard-selector";
import { useDashboard } from "@/contexts/DashboardContext";
import { inventoryNavItems, salesNavItems } from "@/data/sidenav";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { selectedDashboard } = useDashboard();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center border-b h-16 px-4">
        <DashboardSwitcher />
      </SidebarHeader>
      <SidebarContent className="px-3">
        {selectedDashboard.name === "Inventory" && (
          <NavMain items={inventoryNavItems} />
        )}
        {selectedDashboard.name === "Dining" && (
          <NavMain items={inventoryNavItems} />
        )}
        {selectedDashboard.name === "Sales" && (
          <NavMain items={salesNavItems} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <div className=""></div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
