/* eslint-disable react-hooks/rules-of-hooks */
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import { useState } from "react";
import { IOrder } from "@/types";
import { cx } from "@/lib/utils";
import toast from "react-hot-toast";
import api, { endpoints } from "@/lib/api";
import { Eye, Trash2 } from "lucide-react";
import { Divider } from "@/components/ui/Divider";
import { Checkbox } from "@/components/ui/Checkbox";
import { useOrderStore } from "@/stores/orderStore";
import { Button, buttonVariants } from "@/components/ui/Button";
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
        <div>
          <div className="flex w-full justify-center gap-1.5">
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  className={cx(
                    buttonVariants({ variant: "secondary" }),
                    "px-2 py-2 hover:bg-blue-100"
                  )}
                >
                  <Eye size={16} className="text-blue-600" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle className="text-xl">
                    #Order Information
                  </DrawerTitle>
                  <DrawerDescription className="mt-1 text-sm">
                    <p className="text-sm">#{row.original._id}</p>
                    <p className="text-xs">
                      Make sure all the items are correctly ordered. Additionaly
                      tax and discount will be applied.
                    </p>
                  </DrawerDescription>
                </DrawerHeader>
                <div className="space-y-10">
                  <div className="flex flex-wrap gap-10 py-2.5">
                    <div className="space-y-1">
                      <h4 className="text-md font-semibold">Meal Category</h4>
                      <p className="text-sm">{row.original.meal}</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-md font-semibold">Current Status</h4>
                      <p className="text-sm">{row.original.status}</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-md font-semibold">Payment Status</h4>
                      <p className="text-sm">{row.original.paymentStatus}</p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-md font-semibold">Payment Method</h4>
                      <p className="text-sm">{row.original.paymentMethod}</p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-md font-semibold">Diposit Amount</h4>
                      <p className="text-sm">{row.original.discountAmount}</p>
                    </div>
                  </div>

                  <div className="mt-3 w-full">
                    <h4 className="text-md font-semibold mb-1">#Order Items</h4>
                    <div className="overflow-auto rounded py-1">
                      <table className="w-full text-sm mb-4">
                        <thead>
                          <tr className="border-b text-center [&>th]:py-2 [&>th]:font-semibold">
                            <th className="w-2/5 text-left">Menu</th>
                            <th>Qty</th>
                            <th>Unit</th>
                            <th>Unit Price</th>
                            <th className="text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {row.original.items.map((item, i) => (
                            <tr
                              key={i}
                              className="w-1/4 text-center border-b [&>td]:py-2"
                            >
                              <td className="text-left">
                                {item.menu?.itemName ?? "N/A"}
                              </td>
                              <td>{item.quantity}</td>
                              <td>{item.unit}</td>
                              <td>{item.unitPrice}</td>
                              <td className="text-right">
                                {item.unitPrice * item.quantity}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="flex justify-between items-center mt-2 [&>h3]:font-medium [&>p]:font-medium">
                        <h3>Total Amount</h3>
                        <p>{row.original.totalAmount}</p>
                      </div>
                      <div className="flex justify-between items-center mt-2 [&>h3]:font-medium [&>p]:font-medium">
                        <h3>Tax Amount</h3>
                        <p className="space-x-3.5">
                          <span className="font-light text-sm opacity-60">
                            ({row.original.taxApplied}%)
                          </span>
                          <span>{row.original.taxAmount}</span>
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2 [&>h3]:font-medium [&>p]:font-medium">
                        <h3>Discount Amount</h3>
                        <p className="space-x-3.5">
                          <span className="font-light text-sm opacity-60">
                            ({row.original.discountPercentage}%)
                          </span>

                          <span>{row.original.discountAmount}</span>
                        </p>
                      </div>

                      <Divider className="my-3" />

                      <div className="flex justify-between items-center mt-2 [&>h3]:font-medium [&>p]:font-medium">
                        <h3>Grand Total</h3>
                        <p>{row.original.totalAmount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>

            <DeleteConfirmation onConfirm={handleDelete} isLoading={isDeleting}>
              <Button
                className="px-2 py-2 hover:bg-red-100"
                variant="secondary"
              >
                <Trash2 size={16} className="text-red-600" />
              </Button>
            </DeleteConfirmation>
          </div>
        </div>
      );
    },
  }),
] as ColumnDef<IOrder>[];
