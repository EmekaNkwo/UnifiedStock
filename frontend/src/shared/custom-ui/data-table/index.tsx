"use client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { AlertCircle } from "lucide-react";

export const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
    <AlertCircle className="h-12 w-12 mb-2 text-muted-foreground/60" />
    <p className="text-sm font-medium">No data available</p>
  </div>
);

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showPagination?: boolean;
  isLoading?: boolean;
  expandable?: boolean;
  expandedChildren?: (row: TData) => React.ReactNode;
  expandedRows?: Record<string, boolean>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showPagination,
  isLoading,
  expandable = false,
  expandedChildren,
  expandedRows,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Reset to first page whenever data changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [data.length]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  if (isLoading) {
    return <Skeleton className="h-96" />;
  }

  return (
    <>
      <div className="overflow-auto rounded-md border">
        <Table className="min-w-full">
          <TableHeader className="bg-muted">
            {table.getHeaderGroups()?.map((headerGroup) => (
              <TableRow key={headerGroup?.id}>
                {headerGroup?.headers?.map((header) => {
                  return (
                    <TableHead key={header?.id}>
                      {header?.isPlaceholder
                        ? null
                        : flexRender(
                            header?.column?.columnDef?.header,
                            header?.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getPaginationRowModel().rows.length > 0 ? (
              table.getPaginationRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer"
                    onClick={row.getToggleExpandedHandler()}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {expandedRows?.[row.id] && (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length + (expandable ? 1 : 0)}
                      >
                        <div className="p-4 bg-muted/20">
                          {expandedChildren?.(row.original)}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  <EmptyState />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && (
        <div className="mt-4 p-2">
          <DataTablePagination table={table} />
        </div>
      )}
    </>
  );
}
