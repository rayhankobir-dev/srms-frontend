import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavMain } from "./sidenav";
import { inventoryNavItems } from "@/data/sidenav";
import { TeamSwitcher } from "./dashboard-selector";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  console.log(state);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center border-b h-16 px-4">
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent className="px-3">
        <NavMain items={inventoryNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <div className=""></div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
