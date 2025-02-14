import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Donut, EggFried, Ham, LayoutGrid, Soup } from "lucide-react";

export default function Shortcut() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="w-10 h-10 [&_svg]:h-5 [&_svg]:w-5"
          variant="ghost"
          size="icon"
        >
          <LayoutGrid className="text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 overflow-hidden">
        <div className="grid grid-cols-2 font-medium text-sm text-primary">
          <div className="flex flex-col items-center justify-center gap-0.5 px-5 py-3.5 border-b border-r hover:bg-muted duration-300 cursor-pointer">
            <EggFried />
            Breakfast
          </div>
          <div className="flex flex-col items-center justify-center gap-0.5 px-5 py-3.5 border-b hover:bg-muted duration-300 cursor-pointer">
            <Ham />
            Lunch
          </div>
          <div className="flex flex-col items-center justify-center gap-0.5 px-5 py-3.5 border-r hover:bg-muted duration-300 cursor-pointer">
            <Donut />
            Super
          </div>
          <div className="flex flex-col items-center justify-center gap-0.5 px-5 py-3 hover:bg-muted duration-300 cursor-pointer ">
            <Soup />
            Dinner
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
