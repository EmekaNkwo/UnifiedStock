"use client";

import { Plus, Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoriesGrid } from "./categories-grid";

import { DashboardContainer } from "@/shared/layout-wrapper";
import useCategory from "./use-category";
import useAddOrUpdateCategory from "./add-update-category-modal/use-add-or-update-category";
import AddOrUpdateCategoryModal from "./add-update-category-modal";

export default function CategoriesPage() {
  const {
    searchQuery,
    filteredCategories,
    handleDeleteCategory,
    handleToggleStatus,
    handleEdit,

    setSearchQuery,
    setDeleteCategoryData,
  } = useCategory();

  const { isOpen, openModal, closeModal } = useAddOrUpdateCategory();

  return (
    <DashboardContainer>
      {isOpen && (
        <AddOrUpdateCategoryModal
          isOpen={isOpen}
          closeModal={() => closeModal()}
        />
      )}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground">
            Manage your product categories
          </p>
        </div>
        <Button
          onClick={() => {
            openModal();
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 max-w-[20rem]"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-10">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="h-10">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <CategoriesGrid
          categories={filteredCategories}
          onEdit={() => {
            openModal();
          }}
          onDelete={handleDeleteCategory}
          onToggleStatus={handleToggleStatus}
        />
      </div>
    </DashboardContainer>
  );
}
