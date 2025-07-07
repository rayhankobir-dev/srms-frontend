"use client";
import AccessDenied from "./AccessDenied";
import { useAuthStore } from "@/stores/authStore";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const user = useAuthStore((state) => state.user);
  if (user && !allowedRoles.includes(user.role)) return <AccessDenied />;

  return <>{children}</>;
}
