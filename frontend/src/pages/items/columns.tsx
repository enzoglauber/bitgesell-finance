// pages/items/columns.ts
import { Item } from "@/interfaces/Item"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      return <div>R$ {price.toFixed(2)}</div>
    },
  },
]
