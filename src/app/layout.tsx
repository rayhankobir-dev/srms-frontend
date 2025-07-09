import "./globals.css";
import { Suspense } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "./siteConfig";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { TooltipProvider } from "@/components/ui/Tooltip";
import ReactQueryProvider from "@/contexts/QueryProvider";
import LoadingScreen from "@/components/ui/LoadingScreen";
import RouteProgressBar from "@/components/shared/RouteChangeLoader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.appUrl),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ["Dashboard", "Data Visualization", "Software"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@yourname",
  },
  icons: {
    icon: siteConfig.logoUrl,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white-50 h-full antialiased dark:bg-gray-950`}
      >
        <ReactQueryProvider>
          <TooltipProvider>
            <AuthProvider>
              <RouteProgressBar />
              <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
            </AuthProvider>
          </TooltipProvider>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
