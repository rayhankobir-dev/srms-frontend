/* eslint-disable react-hooks/exhaustive-deps */
"use client";

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
import { exportToExcel } from "@/lib/export";
import { Button } from "@/components/ui/Button";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useRef, useState } from "react";
import { useOrderStore } from "@/stores/orderStore";
import { FileSpreadsheet, Trash2, X } from "lucide-react";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { DateRange, DateRangePicker } from "@/components/ui/DateRangePicker";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";

function UsersPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters] = useState<ColumnFiltersState>([]);
  const [searchTerm, setSearchTerm] = useState(globalFilter);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { orders, setOrders, removeOrders } = useOrderStore();

  useEffect(() => {
    // When orders or dateRange changes, update filteredOrders
    if (!dateRange || (!dateRange.from && !dateRange.to)) {
      setFilteredOrders(orders);
      return;
    }
    const start = dateRange.from ? new Date(dateRange.from).setHours(0,0,0,0) : undefined;
    const end = dateRange.to ? new Date(dateRange.to).setHours(23,59,59,999) : undefined;
    setFilteredOrders(
      orders.filter((order: any) => {
        const updatedAt = new Date(order.updatedAt).getTime();
        const afterStart = start === undefined || updatedAt >= start;
        const beforeEnd = end === undefined || updatedAt <= end;
        return afterStart && beforeEnd;
      })
    );
  }, [orders, dateRange]);

  const table = useReactTable({
    data: filteredOrders,
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
      const { data } = await api.delete(`${endpoints.orders}/bulk-delete`, {
        data: { ids: selectedIds },
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      removeOrders(selectedIds);
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

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const { data } = await api.get(endpoints.orders);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOrders(data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleDateRangeChange = (value: DateRange | undefined) => {
    setDateRange(value);
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="space-y-3.5">
      <section className="px-4">
        <h1 className="text-lg font-semibold">Orders list</h1>
        <p className="max-w-2xl text-sm">
          Find your orders. Search by item name or by category.
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

          <div className="flex items-center min-w-fit space-x-1.5">
            {(table.getSelectedRowModel().rows.length > 1 ||
              table.getIsAllPageRowsSelected() ||
              table.getIsAllRowsSelected()) && (
              <DeleteConfirmation
                onConfirm={handleDeleteSelected}
                confirmText="Delete All"
                isLoading={isDeleting}
              >
                <Button
                  onClick={handleDeleteSelected}
                  className=""
                  variant="destructive"
                >
                  <Trash2 size={18} />
                </Button>
              </DeleteConfirmation>
            )}
            <Button onClick={() => exportToExcel(orders)} variant="secondary">
              <FileSpreadsheet className="text-green-700" size={18} />
            </Button>
            <DateRangePicker onChange={handleDateRangeChange}/>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 ">
          <DataTable isLoading={isFetching} table={table} />
        </div>
      </section>
    </main>
  );
}

export default UsersPage;
