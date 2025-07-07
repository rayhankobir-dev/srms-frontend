"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { BadgeCheck, LogOut, MoreVerticalIcon } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import api, { endpoints } from "@/lib/api";
import { useRouter } from "next/navigation";

export function UserProfile() {
  const { hasHydrated, user, logout } = useAuthStore();
  const router = useRouter();

  const redirectToAccount = () => {
    router.push("/account");
  };

  const handleLogout = async () => {
    try {
      await api.delete(endpoints.logout);
    } catch (error) {
      console.error(error);
    } finally {
      logout();
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-between rounded-lg border bg-muted px-2 py-1.5">
          <Avatar className="h-10 w-10 rounded-full grayscale">
            <AvatarImage alt="Rayhan" />
            <AvatarFallback className="rounded-lg">
              {hasHydrated && user?.firstName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {hasHydrated && user?.firstName}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {hasHydrated && user?.email}
            </span>
          </div>
          <MoreVerticalIcon className="ml-auto size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={"right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage alt={(hasHydrated && user?.firstName) || "Rayhan"} />
              <AvatarFallback className="rounded-lg">
                {hasHydrated && user?.firstName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {hasHydrated && user?.firstName}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {hasHydrated && user?.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={redirectToAccount}
            className="h-10 gap-2 px-4"
          >
            <BadgeCheck size={16} />
            Account
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="h-10 gap-2 px-4">
          <LogOut size={16} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
