// src/components/products/index.tsx
"use client";

import { useMemo, useState } from "react";
import { Product, ProductFilters } from "./types";
import { mockProducts } from "./mockData";

import { ProductActions } from "./product-actions";
import { ProductTable } from "./product-table";
import { DashboardContainer } from "@/shared/layout-wrapper";
import { AddProductModal } from "./add-product-modal";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Partial<ProductFilters>>({});
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddProduct = async (
    newProduct: Omit<Product, "id" | "lastUpdated">
  ) => {
    try {
      // In a real app, you would make an API call here
      const productWithId = {
        ...newProduct,
        id: `prod_${Date.now()}`,
        lastUpdated: new Date(),
      };

      setProducts((prev) => [...prev, productWithId]);
      setIsAddModalOpen(false);
      // Show success toast
    } catch (error) {
      console.error("Error adding product:", error);
      // Show error toast
    }
  };

  // Update your filtered products logic
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Search filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Status filter
      if (filters.status && product.status !== filters.status) {
        return false;
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      return true;
    });
  }, [mockProducts, searchQuery, filters]);

  const handleExport = () => {
    // Implement export logic
    console.log("Export clicked");
  };

  const handleImport = () => {
    // Implement import logic
    console.log("Import clicked");
  };

  return (
    <>
      {isAddModalOpen && (
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddProduct}
          categories={Array.from(new Set(mockProducts.map((p) => p.category)))}
        />
      )}
      <DashboardContainer>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">
              Manage your inventory and track product details
            </p>
          </div>
          <ProductActions
            onAddProduct={() => setIsAddModalOpen(true)}
            onExport={handleExport}
            onImport={handleImport}
            onSearch={setSearchQuery}
            onFilterChange={(newFilters) =>
              setFilters((prev) => ({ ...prev, ...newFilters }))
            }
            activeFilters={filters}
            availableCategories={Array.from(
              new Set(mockProducts.map((p) => p.category))
            )}
            className="mb-4"
          />
        </div>

        <ProductTable
          data={filteredProducts}
          isLoading={false}
          // onFiltersChange={setFilters}
        />
      </DashboardContainer>
    </>
  );
}
