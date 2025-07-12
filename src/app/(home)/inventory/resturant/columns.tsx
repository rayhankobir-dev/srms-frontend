/* eslint-disable react-hooks/rules-of-hooks */
import api, { endpoints } from "@/lib/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { IInventory } from "@/types";
import { Trash2, FileEdit } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormDialog } from "@/components/shared/FormDialog";
import { useInventoryStore } from "@/stores/inventoryStore";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import RestaurantForm, { RestaurantFormValues } from "./ResturantForm";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";

const columnHelper = createColumnHelper<IInventory>();

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
  columnHelper.accessor("newStock", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="New Stock" />
    ),
    cell: (info) => (
      <div>
        {info.getValue()}{" "}
        <span className="text-xs text-gray-500">{info.row.original.unit}</span>
      </div>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor("cooked", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cooked" />
    ),
    cell: (info) => (
      <div>
        {info.getValue()}{" "}
        <span className="text-xs text-gray-500">{info.row.original.unit}</span>
      </div>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor("sold", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales" />
    ),
    cell: (info) => (
      <div>
        {info.getValue()}{" "}
        <span className="text-xs text-gray-500">{info.row.original.unit}</span>
      </div>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor("inStock", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="In Stock" />
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
      const { updateInventory, removeInventory } = useInventoryStore();

      const onFormSubmit = async (
        values: RestaurantFormValues,
        { resetForm }: any
      ) => {
        try {
          setIsUpdating(true);
          const { data } = await api.put(
            `${endpoints.inventory}/${row.original._id}`,
            values
          );
          await new Promise((resolve) => setTimeout(resolve, 1500));
          updateInventory(row.original._id, data);
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
          const { data } = await api.delete(endpoints.inventory, {
            data: { ids: [id] },
          });

          await new Promise((resolve) => setTimeout(resolve, 2000));
          removeInventory([id]);
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
              <RestaurantForm
                initialValues={row.original}
                setDialogOpen={setDialogOpen}
                onSubmit={onFormSubmit}
                title="Update restaurant stock"
                description="Edit this item's details"
                buttonText="Update Item"
                isLoading={isUpdating}
                loadingText="Updating"
              />
            }
          >
            <Button
              className="px-2 py-2 hover:bg-blue-100"
              variant="secondary"
              onClick={() => console.log("Edit", row.original._id)}
            >
              <FileEdit size={16} className="text-blue-600" />
            </Button>
          </FormDialog>

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
] as ColumnDef<IInventory>[];
