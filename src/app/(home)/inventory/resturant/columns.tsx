/* eslint-disable react-hooks/rules-of-hooks */
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import RestaurantForm, { RestaurantFormValues } from "./ResturantForm"
import DeleteConfirmation from "@/components/shared/DeleteConfirmation"
import { FormDialog } from "@/components/shared/FormDialog"
import { Checkbox } from "@/components/ui/Checkbox"
import { Button } from "@/components/ui/Button"
import { Trash2, FileEdit } from "lucide-react"
import toast from "react-hot-toast"
import { useState } from "react"
import {
  StockItem,
  useRestaurantStockStore,
} from "@/stores/useRestorentStockStore"
import api from "@/lib/api"

const columnHelper = createColumnHelper<StockItem>()

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
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("cooked", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cooked" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("sales", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("inStock", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="In Stock" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <div className="w-full text-center">Actions</div>,
    cell: ({ row }) => {
      const [dialogOpen, setDialogOpen] = useState(false)
      const [isUpdating, setIsUpdating] = useState(false)
      const [isDeleting, setIsDeleting] = useState(false)
      const { updateRestaurantStocks, removeRestaurantStocks } =
        useRestaurantStockStore()

      const onFormSubmit = async (
        values: RestaurantFormValues,
        { resetForm }: any,
      ) => {
        try {
          setIsUpdating(true)
          const { data } = await api.put(
            `/restaurant-stocks/${row.original._id}`,
            values,
          )
          await new Promise((resolve) => setTimeout(resolve, 1500))
          updateRestaurantStocks(row.original._id as string, data)
          resetForm()
          setDialogOpen(false)
          toast.success("Item updated successfully")
        } catch (error: any) {
          toast.error(error?.response?.data?.message || error.message)
        } finally {
          setIsUpdating(false)
        }
      }

      const handleDelete = async (id: string) => {
        try {
          setIsDeleting(true)
          const { data } = await api.delete(`/restaurant-stocks`, {
            data: { ids: [id] },
          })

          await new Promise((resolve) => setTimeout(resolve, 2000))
          removeRestaurantStocks([id])
          toast.success(data.message)
        } catch (error: any) {
          toast.error(error?.response?.data?.message || error.message)
        } finally {
          setIsDeleting(false)
        }
      }

      return (
        <div className="flex w-full justify-center gap-1.5">
          <FormDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            form={
              <RestaurantForm
                initialValues={row.original}
                onSubmit={onFormSubmit}
                title="Update Restaurant Stock"
                description="Edit this item's details"
                buttonText="Update Item"
                isLoading={isUpdating}
                loadingText="Updating"
              />
            }
          >
            <Button
              className="px-2 py-2 hover:bg-blue-100"
              variant="ghost"
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
            <Button className="px-2 py-2 hover:bg-red-100" variant="ghost">
              <Trash2 size={16} className="text-red-600" />
            </Button>
          </DeleteConfirmation>
        </div>
      )
    },
  }),
] as ColumnDef<StockItem>[]
