/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import LoginForm from "./LoginForm";
import { siteConfig } from "@/app/siteConfig";
import AuthRestricted from "@/components/shared/AuthRestricted";

function LoginPage() {
  return (
    <AuthRestricted>
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
              <CardTitle className="text-xl">
                Welcome back, Please login
              </CardTitle>
              <CardDescription>
                Login with your account by providing credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4 md:mt-6">
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </AuthRestricted>
  );
}

export default LoginPage;
