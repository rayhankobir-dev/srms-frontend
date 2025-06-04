/* eslint-disable @next/next/no-img-element */
"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "../Table"
import { cx } from "@/lib/utils"
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils"
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import { DataTablePagination } from "./DataTablePagination"
import { Loader2Icon } from "lucide-react"

const fuzzyFilter: FilterFn<any> = (
  row: Row<any>,
  columnId: string,
  filterValue: string,
  addMeta: (meta: { itemRank: RankingInfo }) => void,
) => {
  const itemRank = rankItem(row.getValue(columnId), filterValue)

  addMeta({ itemRank })

  return itemRank.passed
}

interface DataTableProps<TData> {
  columns?: ColumnDef<TData>[]
  data?: TData[]
  table: ReturnType<typeof useReactTable<TData>>
  isLoading?: boolean
}

export function DataTable<TData>({
  table: customTable,
  columns = [],
  data = [],
  isLoading = false,
}: DataTableProps<TData>) {
  const pageSize = 10
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const defaultTable = useReactTable({
    data,
    columns,
    enableColumnResizing: false,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: fuzzyFilter,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const table = customTable || defaultTable

  return (
    <div className="relative max-w-full space-y-6">
      <div className="relative overflow-hidden overflow-x-auto">
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-gray-200 dark:border-gray-800"
              >
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    className={cx(
                      "whitespace-nowrap py-2.5 text-sm sm:text-xs",
                      header.column.columnDef.meta?.className,
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  rowSpan={5}
                  colSpan={table.getAllColumns().length}
                  className="text-center"
                >
                  <div className="flex w-full flex-col items-center justify-center py-6">
                    <Loader2Icon className="animate-spin text-primary" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="group select-none hover:bg-[#FBFBFC] hover:dark:bg-gray-900"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cx(
                        "relative whitespace-nowrap py-2.5 text-gray-600 dark:text-gray-400",
                        cell.column.columnDef.meta?.className,
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  rowSpan={5}
                  colSpan={table.getAllColumns().length}
                  className="text-center"
                >
                  <div className="flex w-full flex-col items-center justify-center">
                    <img
                      className="max-w-16"
                      src="/images/no-items.png"
                      alt="empty table"
                    />
                    <span className="font-medium">No items found</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} pageSize={pageSize} />
    </div>
  )
}
