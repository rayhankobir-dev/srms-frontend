"use client";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/Sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import AuthRoute from "@/components/shared/AuthRoute";

function HomeLayout({ children }: { children: React.ReactNode }) {
  const [defaultOpen, setDefaultOpen] = useState(true);

  useEffect(() => {
    const sidebarState = Cookie.get("sidebar:state");
    setDefaultOpen(sidebarState === "true");
  }, []);

  return (
    <AuthRoute>
      <ThemeProvider
        defaultTheme="system"
        disableTransitionOnChange
        attribute="class"
      >
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <div className="w-full max-w-full overflow-hidden">
            <Header />
            <main className="py-4">{children}</main>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </AuthRoute>
  );
}

export default HomeLayout;
