/* eslint-disable react-hooks/exhaustive-deps */
import Cookie from "js-cookie";
import toast from "react-hot-toast";
import api, { endpoints } from "@/lib/api";
import { useRouter } from "next/navigation";
import LoadingScreen from "../ui/LoadingScreen";
import { useAuthStore } from "@/stores/authStore";
import React, { useEffect, useState } from "react";

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { token, user, setUser, hasHydrated, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await api.get(endpoints.userProfile);
        setUser(res.data);
      } catch (error: any) {
        if (error?.response?.status === 401) {
          logout();
          Cookie.remove("token");
          router.replace("/auth/login");
        } else {
          toast.error(error?.response?.data?.message || error.message);
        }
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
