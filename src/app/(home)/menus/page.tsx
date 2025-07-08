/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { columns } from "./columns";
import { toast } from "react-hot-toast";
import api, { endpoints } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Plus, Trash2, X } from "lucide-react";
import { useMenuStore } from "@/stores/menuStore";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/data-table/DataTable";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";

function MenusPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState(globalFilter);
  const { menuItems, setMenuItems, removeMenuItems } = useMenuStore();

  const table = useReactTable({
    data: menuItems,
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
      removeMenuItems(selectedIds);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(endpoints.stocks);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setMenuItems(data);
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
        <h1 className="text-lg font-semibold">Restaurant menus</h1>
        <p className="max-w-2xl text-sm">Menus must be updated regularly.</p>
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

            <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/menus/create"
            >
              <Plus size={18} />
              Create Menu
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 ">
          <DataTable isLoading={isLoading} table={table} />
        </div>
      </section>
    </main>
  );
}

export default MenusPage;
