/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Calendar1,
  FileSpreadsheet,
  Plus,
  Printer,
  Trash2,
  X,
} from "lucide-react";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { toast } from "react-hot-toast";
import api, { endpoints } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useRef, useState } from "react";
import { FormDialog } from "@/components/shared/FormDialog";
import { useInventoryStore } from "@/stores/inventoryStore";
import { exportTableToPDF, exportToExcel } from "@/lib/export";
import { DataTable } from "@/components/ui/data-table/DataTable";
import RestaurantForm, { RestaurantFormValues } from "./ResturantForm";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";

function StockResturantPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters] = useState<ColumnFiltersState>([]);
  const [searchTerm, setSearchTerm] = useState(globalFilter);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { inventory, setInventory, addInventory, removeInventory } =
    useInventoryStore();

  const table = useReactTable({
    data: inventory,
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
  });

  const handleDeleteSelected = async () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const selectedIds = selectedRows.map((row) => row.original._id);

    try {
      setIsDeleting(true);
      const { data } = await api.delete(endpoints.inventory, {
        data: { ids: selectedIds },
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      removeInventory(selectedIds);
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

  const onFormSubmit = async (
    values: RestaurantFormValues,
    { resetForm }: any
  ) => {
    try {
      setIsLoading(true);
      const { data } = await api.post(endpoints.inventory, values);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      addInventory(data);
      resetForm();
      setDialogOpen(false);
      toast.success("Item added successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(endpoints.inventory);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setInventory(data);
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
        <h1 className="text-lg font-semibold">Restaurant stocks</h1>
        <p className="max-w-2xl text-sm">
          Find your resturant stocks. Search by item name or by category.
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
            {(table.getSelectedRowModel().rows.length > 1 ||
              table.getIsAllPageRowsSelected() ||
              table.getIsAllRowsSelected()) && (
              <DeleteConfirmation
                onConfirm={handleDeleteSelected}
                confirmText="Delete All"
                isLoading={isDeleting}
              >
                <Button className="" variant="destructive">
                  <Trash2 size={18} />
                </Button>
              </DeleteConfirmation>
            )}

            <FormDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              className="p-0 max-w-md"
              form={
                <RestaurantForm
                  initialValues={{
                    itemName: "",
                    newStock: 0,
                    inStock: 0,
                    cooked: 0,
                    sold: 0,
                    unit: "",
                  }}
                  setDialogOpen={setDialogOpen}
                  onSubmit={onFormSubmit}
                  title="Add new restaurant stock"
                  description="Add a new item to the inventory"
                  buttonText="Create stock"
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
              onClick={() => exportTableToPDF(inventory, columns)}
              variant="secondary"
            >
              <Printer className="text-primary" size={18} />
            </Button>
            <Button
              onClick={() => exportToExcel(inventory)}
              variant="secondary"
            >
              <FileSpreadsheet className="text-green-700" size={18} />
            </Button>
            <Button variant="secondary">
              <Calendar1 size={18} />
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

export default StockResturantPage;
