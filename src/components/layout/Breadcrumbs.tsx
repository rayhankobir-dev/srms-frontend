"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

export function Breadcrumbs() {
  const items = useBreadcrumbs();

  return (
    <nav aria-label="Breadcrumb" className="ml-2">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link
            href="/"
            className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 hover:dark:text-gray-300"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight
              className="mx-2 size-4 shrink-0 text-gray-600 dark:text-gray-400"
              aria-hidden="true"
            />
            {index === items.length - 1 ? (
              <span className="text-gray-900 dark:text-gray-50">
                {item.title}
              </span>
            ) : (
              <Link
                href={item.link}
                className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 hover:dark:text-gray-300"
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
