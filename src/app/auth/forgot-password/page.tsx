/* eslint-disable @next/next/no-img-element */
import { siteConfig } from "@/app/siteConfig"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import ForgetPasswordForm from "./ForgetPasswordForm"

function ForgotPasswordPage() {
  return (
    <main className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
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
            <CardTitle className="text-xl">Forgot Your Password?</CardTitle>
            <CardDescription>
              Please enter your email address and we will send you a link to
              reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 md:mt-6">
            <ForgetPasswordForm />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default ForgotPasswordPage
