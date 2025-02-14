import NavUser from "./nav-user";
import Shortcut from "./shortcut";
import Notifications from "./notifications";
import { Button } from "@/components/ui/button";
import useFullscreen from "@/hooks/useFullscreen";
import { Fullscreen, Maximize, Moon, Sun } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { useTheme } from "@/components/providers/theme-provider";

function Header() {
  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  };

  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-background flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16 border-b">
      <div className="w-full flex items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1 h-10 w-10 [&_svg]:h-5 [&_svg]:w-5 text-primary hover:text-primary" />
          <Separator orientation="vertical" className="mr-2 h-6" />
          <Breadcrumbs />
        </div>
        <div className="flex items-center gap-0.5">
          <Shortcut />

          <Button
            className="h-10 w-10 p-0 [&_svg]:h-5 [&_svg]:w-5 text-primary hover:text-primary"
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Button
            className="h-10 w-10 [&_svg]:h-5 [&_svg]:w-5"
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Maximize className="text-primary" />
            ) : (
              <Fullscreen className="text-primary" />
            )}
          </Button>
          <Notifications />
          <NavUser user={user} />
        </div>
      </div>
    </header>
  );
}

export default Header;
