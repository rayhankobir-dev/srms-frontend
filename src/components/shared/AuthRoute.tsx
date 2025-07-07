/* eslint-disable react-hooks/exhaustive-deps */
import api, { endpoints } from "@/lib/api";
import { useRouter } from "next/navigation";
import LoadingScreen from "../ui/LoadingScreen";
import { useAuthStore } from "@/stores/authStore";
import React, { useEffect, useState } from "react";

function AuthRoute({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { token, user, setUser, hasHydrated } = useAuthStore();
  const router = useRouter();

  console.log({ token, user, hasHydrated });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await api.get(endpoints.userProfile);
        setUser(res.data);
      } catch {
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
