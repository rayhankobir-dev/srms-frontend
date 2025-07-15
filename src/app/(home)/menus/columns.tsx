/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import api from "@/lib/api";
import Link from "next/link";
import { cx } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import { IMenuItem } from "@/types";
import { Trash2, FileEdit } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { useStockStore } from "@/stores/stockStore";
import { Button, buttonVariants } from "@/components/ui/Button";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";

const columnHelper = createColumnHelper<IMenuItem>();

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
  columnHelper.accessor("itemName", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item Name" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("thumbnail", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thumbnail" />
    ),
    cell: (info) => (
      <div className="px-4">
        <img
          src={info.getValue() || "/images/thumbnail.png"}
          alt={info.row.original.itemName}
          className="w-6"
        />
      </div>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("linkedInventory", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invenotry" />
    ),
    cell: (info) => info.getValue().itemName,
    enableSorting: true,
  }),
  columnHelper.accessor("createdBy", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
    cell: (info) => info.getValue().firstName,
    enableSorting: true,
  }),
  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <div className="w-full text-center">Actions</div>,
    cell: ({ row }) => {
      const [isDeleting, setIsDeleting] = useState(false);
      const { removeStocks } = useStockStore();

      const handleDelete = async (id: string) => {
        try {
          setIsDeleting(true);
          const { data } = await api.delete(`/store-stocks`, {
            data: { ids: [id] },
          });

          await new Promise((resolve) => setTimeout(resolve, 2000));
          removeStocks([id]);
          toast.success(data.message);
        } catch (error: any) {
          toast.error(error?.response?.data?.message || error.message);
        } finally {
          setIsDeleting(false);
        }
      };

      return (
        <div className="flex w-full justify-center gap-1.5">
          <Link
            href={`/menus/${row.original._id}`}
            className={cx(
              buttonVariants({ variant: "secondary" }),
              "w-9 h-9 p-1"
            )}
          >
            <FileEdit size={16} className="text-primary" />
          </Link>

          <DeleteConfirmation
            onConfirm={() => handleDelete(row.original._id as string)}
            onCancel={() => console.log("Cancel")}
            confirmText="Confirm Delete"
            isLoading={isDeleting}
          >
            <Button className="px-2 py-2 hover:bg-red-100" variant="secondary">
              <Trash2 size={16} className="text-red-600" />
            </Button>
          </DeleteConfirmation>
        </div>
      );
    },
  }),
] as ColumnDef<IMenuItem>[];
