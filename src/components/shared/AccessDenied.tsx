"use client"
import { Button } from "@/components/ui/Button"
import { ArrowLeft } from "lucide-react"

/* eslint-disable @next/next/no-img-element */
export default function AccessDenied() {
  return (
    <div className="flex h-full items-center justify-center py-6">
      <div className="text-center">
        <img
          className="max-h-40"
          src="/images/403.webp"
          alt="403 - Unauthorized"
        />
        <h1 className="text-3xl font-medium text-primary">
          Unauthorized Access
        </h1>
        <p>You do not have permission to view this page.</p>

        <div className="mt-6 flex items-center justify-center gap-2.5">
          <Button onClick={() => window.history.back()}>
            <ArrowLeft size={16} /> Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}
