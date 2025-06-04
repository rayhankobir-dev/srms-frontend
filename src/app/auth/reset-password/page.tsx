/* eslint-disable @next/next/no-img-element */
"use client"
import { siteConfig } from "@/app/siteConfig"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect } from "react"
import ResetPasswordForm from "./ResetPasswordForm"
import LoadingScreen from "@/components/ui/LoadingScreen"
import toast from "react-hot-toast"

function ResetPassword() {
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get("token")

  useEffect(() => {
    if (!token) {
      toast.error("Invalid token, please try again")
      router.replace("/auth/forgot-password")
    }
  }, [token, router])

  if (!token) return <LoadingScreen />

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6 transition duration-500">
        <Card>
          <CardHeader className="text-center">
            <div className="mb-2 flex items-center gap-2 self-center font-semibold">
              <img
                src={siteConfig.logoUrl}
                alt={siteConfig.name}
                className="h-8 w-8"
              />
              {siteConfig.name}
            </div>
            <CardTitle className="text-xl">Reset Your Password?</CardTitle>
            <CardDescription>
              Please update your password, password must be at least 8
              characters.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 md:mt-6">
            <ResetPasswordForm />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default ResetPassword
