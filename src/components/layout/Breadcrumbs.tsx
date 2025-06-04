"use client"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Fragment } from "react/jsx-runtime"
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs"

export function Breadcrumbs() {
  const items = useBreadcrumbs()

  return (
    <nav aria-label="Breadcrumb" className="ml-2">
      <ol role="list" className="flex items-center space-x-3 text-sm">
        <li className="flex">
          <Link
            href="/"
            className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 hover:dark:text-gray-300"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <Fragment key={index}>
            {index !== items.length - 1 && (
              <>
                <ChevronRight
                  className="size-4 shrink-0 text-gray-600 dark:text-gray-400"
                  aria-hidden="true"
                />

                <li className="flex">
                  <Link
                    href={item.link}
                    className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 hover:dark:text-gray-300"
                  >
                    {item.title}
                  </Link>
                </li>
              </>
            )}

            {index < items.length - 1 && (
              <ChevronRight
                className="size-4 shrink-0 text-gray-600 dark:text-gray-400"
                aria-hidden="true"
              />
            )}

            {items.length === 1 && (
              <>
                <ChevronRight
                  className="size-4 shrink-0 text-gray-600 dark:text-gray-400"
                  aria-hidden="true"
                />
                <li
                  key={index}
                  className="flex items-center text-gray-900 dark:text-gray-50"
                >
                  {item.title}
                </li>
              </>
            )}

            {index === items.length - 1 && items.length !== 1 && (
              <li
                key={index}
                className="flex items-center text-gray-900 dark:text-gray-50"
              >
                {item.title}
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
