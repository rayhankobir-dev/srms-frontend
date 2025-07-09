/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { columns } from "./columns";
import { Input } from "@/components/ui/Input";
import { Button, buttonVariants } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/data-table/DataTable";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import {
  Calendar1,
  FileSpreadsheet,
  Plus,
  Printer,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import { exportTableToPDF, exportToExcel } from "@/lib/export";
import { Fragment, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useDebouncedCallback } from "use-debounce";
import { FormDialog } from "@/components/shared/FormDialog";
import UserForm, { UserFormValues } from "./UserForm";
import { useUserStore } from "@/stores/userStore";
import api, { endpoints } from "@/lib/api";
import Link from "next/link";
import { cx } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { ROLE } from "@/constants";

function UsersPage() {
  const [isFetching, setIsFetching] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchTerm, setSearchTerm] = useState(globalFilter);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { users, addUser, setUsers, removeUser } = useUserStore();
  const { user } = useAuthStore();

  const table = useReactTable({
    data: users,
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
      const { data } = await api.delete(`/bulk-delete`, {
        data: { ids: selectedIds },
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      selectedIds.forEach((id) => removeUser(id));
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

  const onFormSubmit = async (values: UserFormValues, { resetForm }: any) => {
    try {
      setIsCreating(true);
      const { data } = await api.post("/users", values);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      addUser(data);
      resetForm();
      setDialogOpen(false);
      toast.success("User added successfully");
    } catch (error: any) {
      const data = error?.response?.data;
      toast.error(data?.error || data?.message || error.message);
    } finally {
      setIsCreating(false);
    }
  };

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const { data } = await api.get(endpoints.users);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUsers(data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="space-y-3.5">
      <section className="px-4">
        <h1 className="text-lg font-semibold">User management</h1>
        <p className="max-w-2xl text-sm">
          Find your users or create users. Search by user name or by role.
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
                <Button
                  onClick={handleDeleteSelected}
                  className=""
                  variant="destructive"
                >
                  <Trash2 size={18} />
                </Button>
              </DeleteConfirmation>
            )}

            {user?.role === ROLE.ADMIN && (
              <Fragment>
                <FormDialog
                  open={dialogOpen}
                  onOpenChange={setDialogOpen}
                  className="p-0 max-w-lg"
                  form={
                    <UserForm
                      initialValues={{
                        firstName: "",
                        lastName: "",
                        password: "",
                        confirmPassword: "",
                        gender: "",
                        email: "",
                        phone: "",
                        address: "",
                        role: "",
                      }}
                      onSubmit={onFormSubmit}
                      setDialogOpen={setDialogOpen}
                      description="Please make sure password is strong enough"
                      isLoading={isCreating}
                    />
                  }
                >
                  <Button className="px-4" variant="secondary">
                    <UserPlus size={16} />
                    Add
                  </Button>
                </FormDialog>

                <Button
                  onClick={() => exportToExcel(users)}
                  variant="secondary"
                >
                  <FileSpreadsheet className="text-green-700" size={18} />
                </Button>
              </Fragment>
            )}
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
