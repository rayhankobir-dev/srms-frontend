import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import NavUser from "./nav-user";
import Shortcut from "./shortcut";
import Notifications from "./notifications";
import { Button } from "@/components/ui/button";
import useFullscreen from "@/hooks/useFullscreen";
import { Fullscreen, Maximize } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

function Header() {
  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  };

  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <header className="sticky top-0 z-50 bg-background flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16 border-b">
      <div className="w-full flex items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1 h-10 w-10 [&_svg]:h-5 [&_svg]:w-5 text-primary hover:text-primary" />
          <Separator orientation="vertical" className="mr-2 h-6" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Inventory</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-0.5">
          <Shortcut />
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
