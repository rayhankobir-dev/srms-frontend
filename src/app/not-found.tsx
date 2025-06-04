/* eslint-disable @next/next/no-img-element */
import { buttonVariants } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"

function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-4">
      <img className="max-h-56" src="/images/not-found.png" alt="not found" />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="mt-2">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "primary" }), "mt-4")}
        >
          Go back home
        </Link>

        <div className="mt-10 flex items-center gap-2">
          <img
            className="max-h-12"
            src={process.env.NEXT_PUBLIC_APP_LOGO_URL}
            alt="logo"
          />
          <span className="text-xl font-medium">
            | {process.env.NEXT_PUBLIC_APP_NAME}
          </span>
        </div>
      </div>
    </div>
  )
}

export default NotFound
