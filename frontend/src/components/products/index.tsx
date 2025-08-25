"use client";

import { useMemo, useState } from "react";
import { ProductFilters } from "./types";
import { mockProducts } from "./mockData";

import { ProductActions } from "./product-actions";
import { ProductTable } from "./product-table";
import { DashboardContainer } from "@/shared/layout-wrapper";
import { AddProductModal } from "./add-product-modal";
import useProduct from "./use-product";
import { InventoryDto } from "@/redux/services/inventory-api";
import useModal from "@/hooks/use-modal";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Partial<ProductFilters>>({});
  const { getProductInventoryData, handleDeleteProduct } = useProduct();
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();

  const filteredProducts = useMemo(() => {
    const response = getProductInventoryData?.data as InventoryDto | undefined;
    const products = response?.data || [];

    return products.filter((product) => {
      // Search filter - search in name, sku, and description
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          product.name?.toLowerCase().includes(searchLower) ||
          product.sku?.toLowerCase().includes(searchLower) ||
          product.category?.name?.toLowerCase().includes(searchLower);

        if (!matchesSearch) {
          return false;
        }
      }

      // Status filter
      if (filters.status && product.status !== filters.status) {
        return false;
      }

      // Category filter - check if categoryId matches
      if (filters.category && product.categoryId !== filters.category) {
        return false;
      }

      return true;
    });
  }, [
    getProductInventoryData?.data,
    searchQuery,
    filters.status,
    filters.category,
  ]);

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
      {isModalOpen && (
        <AddProductModal isOpen={isModalOpen} onClose={() => closeModal()} />
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
            onAddProduct={() => openModal()}
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
          isLoading={getProductInventoryData.isLoading}
          total={getProductInventoryData?.data?.total}
          onEdit={() => {
            openModal();
          }}
          onDelete={(id) => handleDeleteProduct(id)}
        />
      </DashboardContainer>
    </>
  );
}
