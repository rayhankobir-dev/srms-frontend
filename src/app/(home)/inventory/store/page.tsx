/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import DeleteConfirmation from "@/components/shared/DeleteConfirmation"
import {
  Calendar1,
  FileSpreadsheet,
  Plus,
  Printer,
  Trash2,
  X,
} from "lucide-react"
import { exportTableToPDF, exportToExcel } from "@/lib/export"
import { useEffect, useRef, useState } from "react"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useDebouncedCallback } from "use-debounce"
import { FormDialog } from "@/components/shared/FormDialog"
import { useStoreStockStore } from "@/stores/useStoreStockStore"
import { toast } from "react-hot-toast"
import { columns } from "./columns"
import StoreForm, { StoreFormValues } from "./StoreForm"
import api from "@/lib/api"

function StockStorePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [globalFilter, setGlobalFilter] = useState("")
  const [searchTerm, setSearchTerm] = useState(globalFilter)
  const { storeStocks, addStoreStocks, setStoreStocks, removeStoreStocks } =
    useStoreStockStore()

  const table = useReactTable({
    data: storeStocks,
    columns,
    state: {
      globalFilter,
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

  const handleDeleteSelected = async () => {
    const selectedRows = table.getSelectedRowModel().rows
    const selectedIds = selectedRows.map((row) => row.original._id)

    try {
      setIsDeleting(true)
      const { data } = await api.delete(`/store-stocks`, {
        data: { ids: selectedIds },
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))
      removeStoreStocks(selectedIds)
      toast.success(data.message)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
    debouncedSetGlobalFilter(value)
  }

  const debouncedSetGlobalFilter = useDebouncedCallback((value) => {
    setGlobalFilter(value)
  }, 300)

  const handleClear = () => {
    setSearchTerm("")
    setGlobalFilter("")
    searchInputRef.current?.focus()
  }

  const onFormSubmit = async (values: StoreFormValues, { resetForm }: any) => {
    try {
      setIsLoading(true)
      const { data } = await api.post("/store-stocks", values)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      addStoreStocks([data])
      resetForm()
      setDialogOpen(false)
      toast.success("Item added successfully")
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get("/store-stocks")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStoreStocks(data)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main className="space-y-3.5">
      <section className="px-4">
        <h1 className="text-lg font-semibold">Stock Store</h1>
        <p className="max-w-2xl text-sm">
          Manage your store's stock inventory. Search by item name or category.
        </p>
      </section>

      <section className="flex w-full flex-col gap-3.5">
        <div className="flex flex-col gap-2 px-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 gap-2">
            <Input
              ref={searchInputRef}
              value={searchTerm}
              type="search"
              className="w-full max-w-sm"
              placeholder="Enter name"
              onChange={handleSearchChange}
            />
            <Button onClick={handleClear} variant="secondary">
              <X size={18} />
            </Button>
          </div>

          <div className="min-w-fit space-x-1.5">
            {table.getSelectedRowModel().rows.length > 0 && (
              <DeleteConfirmation
                onConfirm={handleDeleteSelected}
                confirmText="Delete All"
              >
                <Button disabled={isDeleting} variant="destructive">
                  <Trash2 size={18} />
                </Button>
              </DeleteConfirmation>
            )}

            <FormDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              form={
                <StoreForm
                  initialValues={{
                    itemName: "",
                    storeIn: 0,
                    storeOut: 0,
                    previous: 0,
                    current: 0,
                  }}
                  onSubmit={onFormSubmit}
                  title="Add Store Item"
                  description="Add a new item to the store inventory"
                  buttonText="Add Item"
                  isLoading={isLoading}
                  loadingText="Creating"
                />
              }
            >
              <Button variant="secondary">
                <Plus size={18} />
                Add
              </Button>
            </FormDialog>

            <Button
              onClick={() => exportTableToPDF(storeStocks, columns)}
              variant="secondary"
            >
              <Printer className="text-primary" size={18} />
            </Button>

            <Button
              onClick={() => exportToExcel(storeStocks)}
              variant="secondary"
            >
              <FileSpreadsheet className="text-green-700" size={18} />
            </Button>

            <Button variant="secondary">
              <Calendar1 size={18} />
            </Button>
          </div>
        </div>

        <div className="border-t">
          <DataTable isLoading={isLoading} table={table} />
        </div>
      </section>
    </main>
  )
}

export default StockStorePage
