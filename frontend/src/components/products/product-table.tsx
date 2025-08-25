"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DataTable } from "@/shared/custom-ui/data-table";
import {
  InventoryResponseDto,
  InventoryStatus,
} from "@/redux/services/inventory-api";

import { DropdownMenuAction } from "@/shared/custom-ui";
import {
  EllipsisVertical,
  Pencil,
  ToggleLeft,
  ToggleRight,
  Trash,
} from "lucide-react";
import { useCrud } from "@/hooks/use-crud";

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

interface ProductTableProps {
  data: InventoryResponseDto[];
  isLoading?: boolean;
  total?: number;
  onEdit?: () => void;
  onDelete?: (id: string) => void;
  onUpdateProductStatus?: (id: string, status: InventoryStatus) => void;
  onUpdateProductActive?: (id: string) => void;
}

export function ProductTable({
  data,
  isLoading = false,
  total,
  onEdit,
  onDelete,
  onUpdateProductStatus,
  onUpdateProductActive,
}: ProductTableProps) {
  const { setCrudState } = useCrud();

  const columns: ColumnDef<InventoryResponseDto>[] = [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.image && (
            <img
              src={row.original?.image}
              alt={row.original?.name}
              className="h-10 w-10 rounded-md object-cover"
            />
          )}
          <div>
            <div className="font-medium">{row.original?.name}</div>
            <div className="text-xs text-muted-foreground">
              {row.original?.sku}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => row.original?.category?.name,
    },
    {
      accessorKey: "price",
      header: "Price",
      // cell: ({ row }) => `$${row.original?.price?.toFixed(2)}`,
    },
    {
      accessorKey: "cost",
      header: "Cost",
      // cell: ({ row }) => `$${row.original?.cost?.toFixed(2)}`,
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original?.isActive ? "default" : "destructive"}>
          {row.original?.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "minStockLevel",
      header: "Min Stock Level",
    },
    {
      accessorKey: "status",
      header: "Stock Level",
      cell: ({ row }) =>
        row.original?.status && (
          <Badge variant={statusVariantMap[row.original?.status]}>
            {statusTextMap[row.original?.status]}
          </Badge>
        ),
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      cell: ({ row }) =>
        row.original?.updatedAt &&
        format(new Date(row.original?.updatedAt), "MMM d, yyyy"),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <DropdownMenuAction
          trigger={<EllipsisVertical />}
          items={[
            {
              icon: <Pencil />,
              label: "Edit",
              onClick: () => {
                setCrudState({
                  record: row.original,
                  isEditMode: true,
                  elementId: row.original.id,
                });
                onEdit?.();
              },
            },
            {
              icon: row.original.isActive ? <ToggleLeft /> : <ToggleRight />,
              label: row.original.isActive ? "Deactivate" : "Activate",
              onClick: () => onUpdateProductActive?.(row.original.id),
            },
            {
              label: "Change Product Status",
              type: "submenu",
              items: [
                {
                  label: "In Stock",
                  onClick: () =>
                    onUpdateProductStatus?.(row.original.id, "in_stock"),
                },
                {
                  label: "Out of Stock",
                  onClick: () =>
                    onUpdateProductStatus?.(row.original.id, "out_of_stock"),
                },
                {
                  label: "Low Stock",
                  onClick: () =>
                    onUpdateProductStatus?.(row.original.id, "low_stock"),
                },
              ],
            },
            {
              icon: <Trash className="text-red-500" />,

              label: "Delete",
              onClick: () => onDelete?.(row.original.id),
            },
          ]}
        />
      ),
    },
  ];
  return (
    <DataTable<InventoryResponseDto>
      columns={columns}
      data={data}
      isLoading={isLoading}
      showPagination
      total={total || 0}
    />
  );
}
