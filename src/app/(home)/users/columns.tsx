/* eslint-disable react-hooks/rules-of-hooks */
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/Badge";
import { FileEdit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import UserForm, { UserFormValues } from "./UserForm";
import { useUserStore, User } from "@/stores/userStore";
import { FormDialog } from "@/components/shared/FormDialog";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";

const columnHelper = createColumnHelper<User>();

const colors = {
  ADMIN: "bg-orange-100 text-orange-500 ring-orange-300",
  MANAGER: "bg-green-100 text-green-500 ring-green-300",
  STUFF: "bg-purple-100 text-purple-500 ring-purple-300",
};

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
  columnHelper.accessor("firstName", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("lastName", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("gender", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: (info) => (
      <div>
        <Badge className={cn(colors[info.getValue() as keyof typeof colors])}>
          {info.getValue()}
        </Badge>
      </div>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("phone", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("address", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: (info) => <div className="max-w-40 line-clamp-2 truncate">{info.getValue()}</div>,
    enableSorting: false,
  }),
  columnHelper.accessor("role", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: (info) => (
      <div>
        <Badge className={cn(colors[info.getValue() as keyof typeof colors])}>
          {info.getValue()}
        </Badge>
      </div>
    ),
    enableSorting: true,
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
      const [dialogOpen, setDialogOpen] = useState(false);
      const [isUpdating, setIsUpdating] = useState(false);
      const [isDeleting, setIsDeleting] = useState(false);
      const { updateUser, removeUser } = useUserStore();

      const onFormSubmit = async (
        values: UserFormValues,
        { resetForm }: any
      ) => {
        setIsUpdating(true);
        try {
          const { data } = await api.put(`/users/${row.original._id}`, values);
          await new Promise((resolve) => setTimeout(resolve, 1500));

          updateUser(row.original._id, data);
          resetForm();
          setDialogOpen(false);
          toast.success("User updated successfully");
        } catch (error: any) {
          toast.error(error?.response?.data?.message || error.message);
        } finally {
          setIsUpdating(false);
        }
      };

      const handleDelete = async () => {
        const id = row.original._id;
        try {
          setIsDeleting(true);
          const { data } = await api.delete(`/users/${id}`);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          removeUser(id);
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
            className="p-0 max-w-lg"
            form={
              <UserForm
                initialValues={row.original}
                onSubmit={onFormSubmit}
                setDialogOpen={setDialogOpen}
                title="Update user information"
                description="Edit user information"
                buttonText="Update"
                isLoading={isUpdating}
                loadingText="Updating"
              />
            }
          >
            <Button className="px-2 py-2 hover:bg-blue-100" variant="secondary">
              <FileEdit size={16} className="text-blue-600" />
            </Button>
          </FormDialog>

          {/* TODO: You can't delete yourself */}
          <DeleteConfirmation onConfirm={handleDelete} isLoading={isDeleting}>
            <Button className="px-2 py-2 hover:bg-red-100" variant="secondary">
              <Trash2 size={16} className="text-red-600" />
            </Button>
          </DeleteConfirmation>
        </div>
      );
    },
  }),
] as ColumnDef<User>[];
