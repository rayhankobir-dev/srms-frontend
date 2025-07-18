/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  FileSpreadsheet,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { toast } from "react-hot-toast";
import api, { endpoints } from "@/lib/api";
import { exportToExcel } from "@/lib/export";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useStockStore } from "@/stores/stockStore";
import StoreForm, { StoreFormValues } from "./StoreForm";
import { FormDialog } from "@/components/shared/FormDialog";
import { DataTable } from "@/components/ui/data-table/DataTable";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";

function StockStorePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState(globalFilter);
  const { stocks, setStocks, addStocks, removeStocks } = useStockStore();

  const table = useReactTable({
    data: stocks,
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
  });

  const handleDeleteSelected = async () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const selectedIds = selectedRows.map((row) => row.original._id);

    try {
      setIsDeleting(true);
      const { data } = await api.delete(endpoints.stocks, {
        data: { ids: selectedIds },
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      removeStocks(selectedIds);
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSetGlobalFilter(value);
  };

  const debouncedSetGlobalFilter = useDebouncedCallback((value) => {
    setGlobalFilter(value);
  }, 300);

  const handleClear = () => {
    setSearchTerm("");
    setGlobalFilter("");
    searchInputRef.current?.focus();
  };

  const onFormSubmit = async (values: StoreFormValues, { resetForm }: any) => {
    try {
      setIsCreating(true);
      const current =
        Number(values.carried) +
        Number(values.storeIn) -
        Number(values.storeOut);
      const { data } = await api.post(endpoints.stocks, { ...values, current });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      addStocks(data);
      resetForm();
      setDialogOpen(false);
      toast.success("Item added successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(endpoints.stocks);
        setStocks(data);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="space-y-3.5">
      <section className="px-4">
        <h1 className="text-lg font-semibold">Manage store stocks</h1>
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
              className="p-0 max-w-md"
              form={
                <StoreForm
                  initialValues={{
                    itemName: "",
                    storeIn: 0,
                    storeOut: 0,
                    carried: 0,
                    current: 0,
                    unit: "",
                  }}
                  setDialogOpen={setDialogOpen}
                  onSubmit={onFormSubmit}
                  title="Add new store stock"
                  description="Add a new item to the store inventory"
                  buttonText="Create stock"
                  isLoading={isCreating}
                  loadingText="Creating"
                />
              }
            >
              <Button variant="secondary">
                <Plus size={18} />
                Add stock
              </Button>
            </FormDialog>

            <Button onClick={() => exportToExcel(stocks)} variant="secondary">
              <FileSpreadsheet className="text-green-700" size={18} />
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 ">
          <DataTable isLoading={isLoading} table={table} />
        </div>
      </section>
    </main>
  );
}

export default StockStorePage;
