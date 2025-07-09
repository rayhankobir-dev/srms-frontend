// components/RouteProgressProvider.tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

export default function RouteProgressProvider() {
  const router = useRouter();
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useEffect(() => {
    // Stop NProgress when pathname has changed
    if (pathname !== previousPath.current) {
      NProgress.done();
      previousPath.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    const handleStart = () => NProgress.start();

    const originalPush = router.push;
    router.push = (...args) => {
      handleStart();
      return originalPush(...args);
    };

    return () => {
      router.push = originalPush; // Restore original on unmount
    };
  }, [router]);

  return null;
}
