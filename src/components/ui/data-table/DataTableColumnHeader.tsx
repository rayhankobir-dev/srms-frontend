import { Column } from "@tanstack/react-table"
import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react"

import { cn, cx } from "@/lib/utils"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cx(className)}>{title}</div>
  }

  return (
    <div className="">
    <button
      onClick={column.getToggleSortingHandler()}
      className={cn(
        column.columnDef.enableSorting === true
          && "flex-nowrap text-nowrap -mx-2 flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1"
      )}
    >
      <span>{title}</span>
      {column.getCanSort() ? (
        <div className="-space-y-2">
          <RiArrowUpSLine
            className={cx(
              "size-3.5 text-gray-900 dark:text-gray-50",
              column.getIsSorted() === "desc" ? "opacity-30" : "",
            )}
            aria-hidden="true"
          />
          <RiArrowDownSLine
            className={cx(
              "size-3.5 text-gray-900 dark:text-gray-50",
              column.getIsSorted() === "asc" ? "opacity-30" : "",
            )}
            aria-hidden="true"
          />
        </div>
      ) : null}
    </button>
    </div>
  )
}
