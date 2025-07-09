/* eslint-disable react-hooks/exhaustive-deps */
import Cookie from "js-cookie";
import api, { endpoints } from "@/lib/api";
import { useRouter } from "next/navigation";
import LoadingScreen from "../ui/LoadingScreen";
import { useAuthStore } from "@/stores/authStore";
import React, { useEffect, useState } from "react";
import { useSettingStore } from "@/stores/settingStore";

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { token, user, setUser, hasHydrated, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const { setSettings } = useSettingStore();
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await api.get(endpoints.userProfile);
        const settings = await api.get(endpoints.settings);
        setSettings(settings.data);
        setUser(data);
      } catch {
        logout();
        Cookie.remove("token");
        router.replace("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, [token, hasHydrated, router]);

  useEffect(() => {
    if (!user && hasHydrated) {
      router.replace("/auth/login");
    }
  }, [user, hasHydrated, router]);

  if (isLoading || !hasHydrated) {
    return <LoadingScreen />;
  }

  if (hasHydrated && user && token) {
    return <>{children}</>;
  }

  return <LoadingScreen />;
}

export default AuthRoute;
