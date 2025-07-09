/* eslint-disable react-hooks/rules-of-hooks */
import api, { endpoints } from "@/lib/api";
import { useState } from "react";
import { IOrder } from "@/types";
import toast from "react-hot-toast";
import { FileEdit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";
import { useOrderStore } from "@/stores/orderStore";

const columnHelper = createColumnHelper<IOrder>();

export const columns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <div className="ml-4">
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="ml-4">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
  }),
  columnHelper.accessor("meal", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("table", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("totalAmount", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("taxAmount", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joining Date" />
    ),
    cell: (info) => {
      const value = info.getValue();
      return value
        ? new Date(value).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "-";
    },
    enableSorting: true,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const [isDeleting, setIsDeleting] = useState(false);
      const { removeOrders } = useOrderStore();

      const handleDelete = async () => {
        const id = row.original._id;
        try {
          setIsDeleting(true);
          const { data } = await api.delete(endpoints.orders);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          removeOrders([id]);
          toast.success(data.message);
        } catch (error: any) {
          toast.error(error?.response?.data?.message || error.message);
        } finally {
          setIsDeleting(false);
        }
      };

      return (
        <div className="flex w-full justify-center gap-1.5">
          <Button className="px-2 py-2 hover:bg-blue-100" variant="ghost">
            <FileEdit size={16} className="text-blue-600" />
          </Button>

          <DeleteConfirmation onConfirm={handleDelete} isLoading={isDeleting}>
            <Button className="px-2 py-2 hover:bg-red-100" variant="ghost">
              <Trash2 size={16} className="text-red-600" />
            </Button>
          </DeleteConfirmation>
        </div>
      );
    },
  }),
] as ColumnDef<IOrder>[];
