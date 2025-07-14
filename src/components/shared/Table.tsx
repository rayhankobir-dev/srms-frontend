/* eslint-disable @next/next/no-img-element */
"use client";
import { cx } from "@/lib/utils";
import { useState } from "react";
import { ITable } from "@/types";
import toast from "react-hot-toast";
import { Button } from "../ui/Button";
import { tv } from "tailwind-variants";
import api, { endpoints } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import { useTableStore } from "@/stores/tableStore";
import { Card, CardContent, CardTitle } from "../ui/Card";
import { Badge } from "../ui/Badge";

type TableProps = {
  serial?: string;
  className?: string;
  name?: string;
  isEditMode?: boolean;
  href?: string;
  table: ITable;
  status?: "RESERVED" | "FREE" | "SELECTED";
  onSelect?: (table: ITable) => void;
};

const tableStatusVariants = tv({
  base: ["w-40 relative overflow-hidden group"],
  variants: {
    variant: {
      RESERVED: ["bg-rose-100", "text-gray-900 dark:text-gray-50"],
      FREE: ["bg-white dark:bg-dark", "dark:text-white"],
      SELECTED: ["bg-gray-100"],
    },
  },
});

export default function Table({
  isEditMode = true,
  className,
  serial,
  table,
  status = "FREE",
  href,
  ...props
}: TableProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { removeTable } = useTableStore();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await api.delete(`${endpoints.tables}/${table._id}`);
      new Promise((resolve) => setTimeout(resolve, 1000));
      removeTable(table._id);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClick = () => {
    if (href && !isEditMode) {
      router.push(href);
    }
  };

  return (
    <Card
      onClick={handleClick}
      className={cx(
        "cursor-pointer",
        tableStatusVariants({ variant: status }),
        className
      )}
    >
      <CardContent className="relative aspect-square">
        <span className="absolute top-2 left-2 text-xs">TB-{serial}</span>
        <Badge className="absolute top-2 right-2">
          {table.assignedStaff.firstName}
        </Badge>
        <div className="h-full flex items-end justify-center">
          <img src="/images/table.png" alt={table.name} className="h-32 w-32" />
        </div>
        <CardTitle className="text-sm text-center truncate">
          {table.name}
        </CardTitle>
      </CardContent>

      {isEditMode && (
        <div className="cursor-pointer group-hover:flex hidden absolute top-0 right-0 w-full h-full justify-center items-center gap-1.5 bg-gray-800 bg-opacity-80 backdrop-blur-sm text-white duration-300">
          <Button
            onClick={() => props.onSelect?.(table)}
            variant="secondary"
            className="p-2"
          >
            <Edit size={16} />
          </Button>
          <Button
            isLoading={isDeleting}
            loadingText=""
            onClick={handleDelete}
            variant="destructive"
            className="p-2"
          >
            {!isDeleting && <Trash2 size={16} />}
          </Button>
        </div>
      )}
    </Card>
  );
}
