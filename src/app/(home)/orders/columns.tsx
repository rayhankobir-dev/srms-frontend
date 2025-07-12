/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { IOrder } from "@/types";
import toast from "react-hot-toast";
import api, { endpoints } from "@/lib/api";
import { Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { useOrderStore } from "@/stores/orderStore";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";

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
      <DataTableColumnHeader column={column} title="Meal" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("_id", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="#Order ID" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("totalAmount", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Amount" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("taxAmount", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tax Amount" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ordered Date" />
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
          <Button className="px-2 py-2 hover:bg-blue-100" variant="secondary">
            <Eye size={16} className="text-blue-600" />
          </Button>

          <DeleteConfirmation onConfirm={handleDelete} isLoading={isDeleting}>
            <Button className="px-2 py-2 hover:bg-red-100" variant="secondary">
              <Trash2 size={16} className="text-red-600" />
            </Button>
          </DeleteConfirmation>
        </div>
      );
    },
  }),
] as ColumnDef<IOrder>[];
