/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import AreaChartDemo from "@/components/charts/AreaChart"
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import React, { useRef, useState } from "react"
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Input } from "@/components/ui/Input"
import { useDebouncedCallback } from "use-debounce"
import { Button } from "@/components/ui/Button"
import { X } from "lucide-react"
import ProtectedRoute from "@/components/shared/ProtectedRoute"

function SalesPage() {
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [searchTerm, setSearchTerm] = useState(globalFilter)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const table = useReactTable({
    data: [],
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    enableSorting: true,
    enableColumnFilters: true,
    enableFilters: true,
    enableMultiSort: true,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  })

  const debouncedSetGlobalFilter = useDebouncedCallback((value) => {
    setGlobalFilter(value)
  }, 300)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
    debouncedSetGlobalFilter(value)
  }

  const handleClear = () => {
    setSearchTerm("")
    setGlobalFilter("")
    searchInputRef.current?.focus()
  }

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-end justify-between px-4">
            <div>
              <h2 className="text-xl font-medium">Sales Report</h2>
              <p className="font-light">This is the sales report page</p>
            </div>

            <div className="flex gap-2">
              <Input
                ref={searchInputRef}
                value={searchTerm}
                type="search"
                className="w-full max-w-sm"
                placeholder="Enter order id"
                onChange={handleSearchChange}
              />
              <Button onClick={handleClear} variant="secondary">
                <X size={18} />
              </Button>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 ">
            <DataTable table={table} />
          </div>
        </div>
        <div className="px-4">
          <AreaChartDemo />
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default SalesPage
