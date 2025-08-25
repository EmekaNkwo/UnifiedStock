// src/components/products/product-actions.tsx
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload, Search, Filter, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ProductFilters } from "./types";
import { cn } from "@/lib/utils";
import { DropdownMenuAction } from "@/shared/custom-ui";

interface ProductActionsProps {
  onAddProduct: () => void;
  onExport: () => void;
  onImport: () => void;
  onSearch: (searchQuery: string) => void;
  onFilterChange: (filters: Partial<ProductFilters>) => void;
  activeFilters: Partial<ProductFilters>;
  availableCategories: string[];
  className?: string;
}

export function ProductActions({
  onAddProduct,
  onExport,
  onImport,
  onSearch,
  onFilterChange,
  activeFilters,
  availableCategories,
  className,
}: ProductActionsProps) {
  const handleCategoryChange = (category: string) => {
    onFilterChange({
      category: activeFilters.category === category ? undefined : category,
    });
  };

  const handleStatusChange = (status: string) => {
    onFilterChange({
      status: activeFilters.status === status ? undefined : status,
    });
  };

  const clearFilters = () => {
    onFilterChange({ category: undefined, status: undefined });
    onSearch("");
  };

  const hasActiveFilters = Boolean(
    activeFilters.category || activeFilters.status
  );

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-9 w-full"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "gap-2",
                  hasActiveFilters && "bg-accent text-accent-foreground"
                )}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {Object.values(activeFilters).filter(Boolean).length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">Status</p>
                <div className="space-y-2 mt-2">
                  {["in_stock", "low_stock", "out_of_stock"].map((status) => (
                    <div
                      key={status}
                      className="flex items-center space-x-2 p-1 hover:bg-accent rounded cursor-pointer"
                      onClick={() => handleStatusChange(status)}
                    >
                      <div
                        className={cn(
                          "h-4 w-4 rounded-sm border border-primary",
                          activeFilters.status === status
                            ? "bg-primary"
                            : "opacity-50"
                        )}
                      />
                      <span className="text-sm capitalize">
                        {status.replace("_", " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-3 py-2 border-t">
                <p className="text-sm font-medium">Categories</p>
                <div className="space-y-2 mt-2">
                  {availableCategories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center space-x-2 p-1 hover:bg-accent rounded cursor-pointer"
                      onClick={() => handleCategoryChange(category)}
                    >
                      <div
                        className={cn(
                          "h-4 w-4 rounded-sm border border-primary",
                          activeFilters.category === category
                            ? "bg-primary"
                            : "opacity-50"
                        )}
                      />
                      <span className="text-sm">{category}</span>
                    </div>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <div className="p-2 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={clearFilters}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear filters
                  </Button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={onAddProduct} className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Product</span>
          </Button>
          <DropdownMenuAction
            width={38}
            trigger={
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            }
            items={[
              {
                label: (
                  <div className="flex items-center gap-2">
                    <Upload className="mr-2 h-4 w-4" />
                    Import
                  </div>
                ),
                onClick: onImport,
                disabled: true,
              },
              {
                label: (
                  <div className="flex items-center gap-2">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </div>
                ),
                onClick: onExport,
              },
            ]}
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.status && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
              {activeFilters.status.replace("_", " ")}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => handleStatusChange(activeFilters.status!)}
              />
            </div>
          )}
          {activeFilters.category && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
              {activeFilters.category}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => handleCategoryChange(activeFilters.category!)}
              />
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
