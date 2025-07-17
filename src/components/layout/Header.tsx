import ThemeToggler from "./ThemeToggler";
import { Breadcrumbs } from "./Breadcrumbs";
import ScreenToggler from "./ScreenToggler";
import { SidebarTrigger } from "../ui/Sidebar";
import QuickActions from "../shared/QuickActions";
// import NotificationPreviewer from "./NotificationPreviewer";

function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950">
      <SidebarTrigger className="-ml-1" />
      <div className="mr-2 h-4 w-px bg-gray-200 dark:bg-gray-800" />
      <Breadcrumbs />
      <div className="flex w-full justify-end">
        <QuickActions />
        <ScreenToggler />
        <ThemeToggler />
        {/* <NotificationPreviewer /> */}
      </div>
    </header>
  );
}

export default Header;
