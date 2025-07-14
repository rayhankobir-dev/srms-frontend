"use client";
import { Button } from "../ui/Button";
import { Donut, EggFried, Ham, LayoutGrid, Soup } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import Link from "next/link";

export default function QuickActions() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-10 w-10 [&_svg]:h-5 [&_svg]:w-5 text-blue-500"
          variant="ghost"
        >
          <LayoutGrid className="text-blue-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 overflow-hidden p-0">
        <div className="grid grid-cols-2 text-sm font-medium text-primary">
          <Link
            href="/dining/breakfast"
            className="flex cursor-pointer flex-col items-center justify-center gap-0.5 border-b border-r px-5 py-3.5 duration-300 hover:bg-muted"
          >
            <EggFried />
            Breakfast
          </Link>
          <Link
            href="/dining/lunch"
            className="flex cursor-pointer flex-col items-center justify-center gap-0.5 border-b px-5 py-3.5 duration-300 hover:bg-muted"
          >
            <Ham />
            Lunch
          </Link>
          <Link
            href="/dining/supper"
            className="flex cursor-pointer flex-col items-center justify-center gap-0.5 border-r px-5 py-3.5 duration-300 hover:bg-muted"
          >
            <Donut />
            Supper
          </Link>
          <Link
            href="/dining/dinner"
            className="flex cursor-pointer flex-col items-center justify-center gap-0.5 px-5 py-3 duration-300 hover:bg-muted"
          >
            <Soup />
            Dinner
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
