"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "../ui/LoadingScreen";
import { useAuthStore } from "@/stores/authStore";

function AuthRestricted({ children }: { children: React.ReactNode }) {
  const { user, token, hasHydrated } = useAuthStore();
  const router = useRouter();

  console.log({ token, user, hasHydrated });

  useEffect(() => {
    if (hasHydrated && user && token) {
      router.replace("/");
    }
  }, [token, user, hasHydrated, router]);

  if (!hasHydrated) {
    return <LoadingScreen />;
  }

  if (hasHydrated && (!user || !token)) {
    return <>{children}</>;
  }

  return <LoadingScreen />;
}

export default AuthRestricted;
