/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { IStock } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import api, { endpoints } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Trash2, FileEdit } from "lucide-react";
import { useStockStore } from "@/stores/stockStore";
import { Checkbox } from "@/components/ui/Checkbox";
import StoreForm, { StoreFormValues } from "./StoreForm";
import { FormDialog } from "@/components/shared/FormDialog";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";

const columnHelper = createColumnHelper<IStock>();

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
  columnHelper.accessor("itemName", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item Name" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("storeIn", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Store In" />
    ),
    cell: (info) => (
      <div>
        {info.getValue()}{" "}
        <span className="text-xs text-gray-500">{info.row.original.unit}</span>
      </div>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor("storeOut", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Store Out" />
    ),
    cell: (info) => (
      <div>
        {info.getValue()}{" "}
        <span className="text-xs text-gray-500">{info.row.original.unit}</span>
      </div>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor("carried", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Remaining Stock" />
    ),
    cell: (info) => (
      <div>
        {info.getValue()}{" "}
        <span className="text-xs text-gray-500">{info.row.original.unit}</span>
      </div>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor("current", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Current Stock" />
    ),
    cell: (info) => (
      <div>
        {info.getValue()}{" "}
        <span className="text-xs text-gray-500">{info.row.original.unit}</span>
      </div>
    ),
    enableSorting: true,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <div className="w-full text-center">Actions</div>,
    cell: ({ row }) => {
      const [dialogOpen, setDialogOpen] = useState(false);
      const [isUpdating, setIsUpdating] = useState(false);
      const [isDeleting, setIsDeleting] = useState(false);
      const { updateStock, removeStocks } = useStockStore();

      const onFormSubmit = async (
        values: StoreFormValues,
        { resetForm }: any
      ) => {
        try {
          setIsUpdating(true);
          const { data } = await api.put(
            `${endpoints.stocks}/${row.original._id}`,
            values
          );
          await new Promise((resolve) => setTimeout(resolve, 1500));
          updateStock(row.original._id, data);
          resetForm();
          setDialogOpen(false);
          toast.success("Item updated successfully");
        } catch (error: any) {
          toast.error(error?.response?.data?.message || error.message);
        } finally {
          setIsUpdating(false);
        }
      };

      const handleDelete = async (id: string) => {
        try {
          setIsDeleting(true);
          const { data } = await api.delete(endpoints.stocks, {
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
          <FormDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            className="p-0 max-w-md"
            form={
              <StoreForm
                initialValues={row.original}
                setDialogOpen={setDialogOpen}
                onSubmit={onFormSubmit}
                title="Update store stock"
                description="Edit this item's details"
                buttonText="Update stock"
                isLoading={isUpdating}
                loadingText="Updating"
              />
            }
          >
            <Button className="px-2 py-2 hover:bg-blue-100" variant="ghost">
              <FileEdit size={16} className="text-blue-600" />
            </Button>
          </FormDialog>

          <DeleteConfirmation
            onConfirm={() => handleDelete(row.original._id as string)}
            onCancel={() => console.log("Cancel")}
            confirmText="Confirm Delete"
            isLoading={isDeleting}
          >
            <Button className="px-2 py-2 hover:bg-red-100" variant="ghost">
              <Trash2 size={16} className="text-red-600" />
            </Button>
          </DeleteConfirmation>
        </div>
      );
    },
  }),
] as ColumnDef<IStock>[];
