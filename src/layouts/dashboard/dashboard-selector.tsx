import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dashboards } from "@/data/sidenav";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const [activeDashboard, setActiveDashboard] = React.useState(dashboards[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="min-w-10 min-h-10" asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="h-10 w-10 flex aspect-square items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <activeDashboard.logo className="size-5" />
              </div>
              <div className="grid flex-1 text-left text-lg leading-tight">
                <span className="truncate font-semibold">
                  {activeDashboard.name}
                </span>
                <span className="truncate text-xs">
                  {activeDashboard.description}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-40 max-w-48 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Dashboards
            </DropdownMenuLabel>
            {dashboards.map((dashboard) => (
              <DropdownMenuItem
                key={activeDashboard.name}
                onClick={() => setActiveDashboard(dashboard)}
                className={cn(
                  "gap-1 p-2 py-1.5",
                  activeDashboard.name === dashboard.name
                )}
              >
                <div className="flex size-8 items-center justify-center rounded border">
                  <activeDashboard.logo className="shrink-0" />
                </div>
                {dashboard.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
