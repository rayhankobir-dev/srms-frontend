"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar"
import { BadgeCheck, LogOut, MoreVerticalIcon } from "lucide-react"
import { useAuthStore } from "@/stores/authStore"

export function UserProfile() {
  const { logout } = useAuthStore()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-between rounded-lg border bg-muted px-2 py-1.5">
          <Avatar className="h-10 w-10 rounded-full grayscale">
            <AvatarImage alt="Rayhan" />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Rayhan</span>
            <span className="truncate text-xs text-muted-foreground">
              rayhan@example.com
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
              <AvatarImage alt="Rayhan" />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Rayhan</span>
              <span className="truncate text-xs text-muted-foreground">
                rayhan@example.com
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="h-10 gap-2 px-4">
            <BadgeCheck size={16} />
            Account
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="h-10 gap-2 px-4">
          <LogOut size={16} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
