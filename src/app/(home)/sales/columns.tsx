import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"

type SalesItem = {
  date: string
  time: string
  orderId: string
  amount: number
}

const columnHelper = createColumnHelper<SalesItem>()

export const columns = [
  columnHelper.accessor("date", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor("time", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor("orderId", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Id" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor("amount", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
] as ColumnDef<SalesItem>[]
