/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarSubLink,
} from "@/components/ui/Sidebar";
import {
  BookText,
  GaugeCircle,
  MenuSquare,
  Settings,
  ShoppingCart,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import * as React from "react";
import { UserProfile } from "./UserProfile";
import { cx, focusRing } from "@/lib/utils";
import { RiArrowDownSFill } from "@remixicon/react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { ROLE } from "@/constants";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, hasHydrated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const staffmenus = [
    {
      name: "Dashboard",
      icon: GaugeCircle,
      href: "/",
      notifications: false,
      active: true,
    },
    {
      name: "Mange Dining",
      icon: UtensilsCrossed,
      href: "/dining",
      notifications: false,
      active: true,
      children: [
        {
          name: "Breakfast",
          href: "/dining/breakfast",
          active: false,
        },
        {
          name: "Lunch",
          href: "/dining/lunch",
          active: false,
        },
        {
          name: "Super",
          href: "/dining/super",
          active: false,
        },
        {
          name: "Dinner",
          href: "/dining/dinner",
          active: false,
        },
      ],
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      href: "/orders",
      notification: false,
      active: false,
    },
  ];

  const defaultMenus = [
    {
      name: "Dashboard",
      icon: GaugeCircle,
      href: "/",
      notifications: false,
      active: true,
    },
    {
      name: "Manage Inventory",
      icon: BookText,
      notifications: false,
      active: true,
      children: [
        {
          name: "Reports",
          href: "/inventory",
          active: true,
        },
        {
          name: "Store Stocks",
          href: "/inventory/store",
          active: false,
        },
        {
          name: "Resturant Stocks",
          href: "/inventory/resturant",
          active: false,
        },
      ],
    },
    {
      name: "Mange Dining",
      icon: UtensilsCrossed,
      href: "/dining",
      notifications: false,
      active: true,
      children: [
        {
          name: "Breakfast",
          href: "/dining/breakfast",
          active: false,
        },
        {
          name: "Lunch",
          href: "/dining/lunch",
          active: false,
        },
        {
          name: "Super",
          href: "/dining/super",
          active: false,
        },
        {
          name: "Dinner",
          href: "/dining/dinner",
          active: false,
        },
      ],
    },
    {
      name: "Menus",
      icon: MenuSquare,
      href: "/menus",
      notification: false,
      active: false,
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      href: "/orders",
      notification: false,
      active: false,
    },
    {
      name: "Manage Users",
      icon: Users,
      notification: false,
      active: false,
      children: [
        {
          name: "Users",
          href: "/users",
          active: true,
        },
      ],
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/settings",
      notification: false,
      active: false,
    },
  ];

  const navigations =
    hasHydrated && user?.role === ROLE.STAFF ? staffmenus : defaultMenus;

  const [openMenus, setOpenMenus] = React.useState<string[]>(
    navigations.map((nav) => nav.name)
  );

  const toggleMenu = (name: string) => {
    setOpenMenus((prev: string[]) =>
      prev.includes(name)
        ? prev.filter((item: string) => item !== name)
        : [...prev, name]
    );
  };

  const redirectToLink = (href: string) => {
    router.push(href);
  };

  const getIsActive = (href: string) => {
    if (!href) return false;
    const isActive = pathname === href || pathname.endsWith(href + "/");
    return isActive;
  };

  return (
    <Sidebar {...props} className="bg-gray-50 dark:bg-gray-925 scrollbar-none">
      <SidebarHeader className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-1">
          <img
            src={process.env.NEXT_PUBLIC_APP_LOGO_URL}
            alt="logo"
            className="h-12 w-12"
          />
          <h4 className="truncate text-lg font-semibold">
            {process.env.NEXT_PUBLIC_APP_NAME || process.env.NEXT_APP_NAME}
          </h4>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {navigations.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <button
                    onClick={() => {
                      if (item.href) {
                        redirectToLink(item.href);
                      } else {
                        toggleMenu(item.name);
                      }
                    }}
                    className={cx(
                      "flex w-full items-center justify-between gap-x-2.5 rounded-md p-2 text-base text-gray-900 transition hover:bg-gray-200/50 sm:text-sm dark:text-gray-400 hover:dark:bg-gray-900 hover:dark:text-gray-50",
                      focusRing,
                      getIsActive(item?.href || "") &&
                        "text-blue-600 bg-gray-100 dark:text-blue-600 dark:bg-gray-900"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon
                        className="size-[18px] shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                    {item.children && (
                      <RiArrowDownSFill
                        className={cx(
                          openMenus.includes(item.name)
                            ? "rotate-0"
                            : "-rotate-90",
                          "size-5 shrink-0 transform text-gray-400 transition-transform duration-150 ease-in-out dark:text-gray-600"
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                  {item.children && openMenus.includes(item.name) && (
                    <SidebarMenuSub>
                      <div className="absolute inset-y-0 left-4 w-px bg-gray-300 dark:bg-gray-800" />
                      {item.children.map((child, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarSubLink
                            href={child.href}
                            isActive={getIsActive(child.href)}
                          >
                            {child.name}
                          </SidebarSubLink>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="border-t border-gray-200 dark:border-gray-800" />
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
