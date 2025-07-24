// src/components/products/ProductTable.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "./types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DataTable } from "@/shared/custom-ui/data-table";
import { mockCategories } from "./mockData";

const statusVariantMap = {
  in_stock: "default",
  low_stock: "secondary",
  out_of_stock: "destructive",
} as const;

const statusTextMap = {
  in_stock: "In Stock",
  low_stock: "Low Stock",
  out_of_stock: "Out of Stock",
} as const;

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.image && (
          <img
            src={row.original.image}
            alt={row.original.name}
            className="h-10 w-10 rounded-md object-cover"
          />
        )}
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.sku}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: ({ row }) => `$${row.original.cost.toFixed(2)}`,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariantMap[row.original.status]}>
        {statusTextMap[row.original.status]}
      </Badge>
    ),
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
    cell: ({ row }) =>
      format(new Date(row.original.lastUpdated), "MMM d, yyyy"),
  },
];

interface ProductTableProps {
  data: Product[];
  isLoading?: boolean;
}

export function ProductTable({ data, isLoading = false }: ProductTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      showPagination

      //   filterOptions={[
      //     {
      //       accessorKey: "status",
      //       title: "Status",
      //       options: [
      //         { label: "In Stock", value: "in_stock" },
      //         { label: "Low Stock", value: "low_stock" },
      //         { label: "Out of Stock", value: "out_of_stock" },
      //       ],
      //     },
      //     {
      //       accessorKey: "category",
      //       title: "Category",
      //       options: mockCategories.map((category) => ({
      //         label: category,
      //         value: category,
      //       })),
      //     },
      //   ]}
    />
  );
}
