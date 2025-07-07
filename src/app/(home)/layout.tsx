/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import api, { endpoints } from "@/lib/api";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { SidebarProvider } from "@/components/ui/Sidebar";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { AppSidebar } from "@/components/layout/AppSidebar";

function HomeLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [defaultOpen, setDefaultOpen] = useState(false);
  const { token, setUser, hasHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const sidebarCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sidebar:state="));
    const value = sidebarCookie?.split("=")[1];
    setDefaultOpen(value === "true");
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token && hasHydrated) {
        router.push("/auth/login");
        return;
      }

      try {
        const res = await api.get(endpoints.userProfile);
        setUser(res.data);
      } catch {
        localStorage.removeItem("auth-storage");
        router.replace("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, hasHydrated, router]);

  if (!isLoading && token) {
    return (
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
    );
  }

  return <LoadingScreen />;
}

export default HomeLayout;
