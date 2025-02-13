import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import NavUser from "./nav-user";
import { Button } from "@/components/ui/button";
import useFullscreen from "@/hooks/useFullscreen";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Fullscreen, Maximize } from "lucide-react";

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
          <SidebarTrigger className="-ml-1 h-10 w-10 [&_svg]:h-5 [&_svg]:w-5" />
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
          <Button
            className="relative h-10 w-10 [&_svg]:h-5 [&_svg]:w-5"
            variant="ghost"
            size="icon"
          >
            <span className="absolute -top-0.5 right-1 w-5 h-5 inline-flex items-center justify-center bg-green-600 rounded-full text-[0.7rem] text-white">
              10
            </span>
            <Bell className="text-primary" />
          </Button>
          <NavUser user={user} />
        </div>
      </div>
    </header>
  );
}

export default Header;
