"use client"

import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/authStore"
import LoadingScreen from "../ui/LoadingScreen"
import { useEffect, useState } from "react"
import AccessDenied from "./AccessDenied"

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode
  allowedRoles: string[]
}) {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)

  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!hasHydrated) return

    if (!token || !user) {
      router.replace("/auth/login")
      return
    }

    setIsChecking(false)
  }, [hasHydrated, token, user, router])

  if (!hasHydrated || isChecking) {
    return <LoadingScreen />
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <AccessDenied />
  }

  return <>{children}</>
}
