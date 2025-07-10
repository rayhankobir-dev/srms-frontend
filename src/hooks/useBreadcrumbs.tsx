"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

type BreadcrumbItem = {
  title: string;
  link: string;
};

const routeMapping: Record<string, BreadcrumbItem[]> = {};

export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    const segments = pathname.split("/").filter(Boolean);

    return segments.map((segment, index) => {
      const path = "/" + segments.slice(0, index + 1).join("/");
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        link: path,
      };
    });
  }, [pathname]);

  console.log(breadcrumbs);

  return breadcrumbs;
}
