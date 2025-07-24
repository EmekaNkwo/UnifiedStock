// src/components/categories/index.tsx
"use client";

import { useState } from "react";
import { Plus, Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomModal } from "@/shared/custom-ui";
import { CategoryForm } from "./category-form";
import { CategoriesGrid } from "./categories-grid";
import { mockCategories } from "./mockdata";
import { DashboardContainer } from "@/shared/layout-wrapper";

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = (data: { name: string; description?: string }) => {
    const newCategory = {
      id: `cat-${Date.now()}`,
      name: data.name,
      description: data.description || "",
      productCount: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCategories([...categories, newCategory]);
    setIsModalOpen(false);
  };

  const handleUpdateCategory = (
    id: string,
    data: { name: string; description?: string }
  ) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id
          ? {
              ...cat,
              ...data,
              updatedAt: new Date().toISOString(),
            }
          : cat
      )
    );
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  const handleToggleStatus = (id: string, isActive: boolean) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id
          ? { ...cat, isActive, updatedAt: new Date().toISOString() }
          : cat
      )
    );
  };

  const handleEdit = (id: string) => {
    setEditingCategory(id);
    setIsModalOpen(true);
  };

  const currentCategory = editingCategory
    ? categories.find((cat) => cat.id === editingCategory)
    : null;

  return (
    <DashboardContainer>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground">
            Manage your product categories
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
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
              className="pl-8"
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
          onEdit={handleEdit}
          onDelete={handleDeleteCategory}
          onToggleStatus={handleToggleStatus}
        />
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        title={editingCategory ? "Edit Category" : "Add New Category"}
        description={`${
          editingCategory ? "Update" : "Create a new"
        } category and manage its details`}
        submitLabel={editingCategory ? "Save Changes" : "Create Category"}
        onSubmit={
          () => {}
          //   document.getElementById("category-form")?.requestSubmit()
        }
        size="md"
      >
        <CategoryForm
          initialData={currentCategory || undefined}
          onSubmit={(data) => {
            if (editingCategory) {
              handleUpdateCategory(editingCategory, data);
            } else {
              handleAddCategory(data);
            }
          }}
        />
      </CustomModal>
    </DashboardContainer>
  );
}
