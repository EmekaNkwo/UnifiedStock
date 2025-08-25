import { useEffect, useState } from "react";
import {
  useCategoryControllerFindAllQuery,
  CategoryResponseDtoWithoutCreatedBy,
  useCategoryControllerRemoveMutation,
  useCategoryControllerToggleActiveMutation,
} from "@/redux/services/category-api";
import { useCrud } from "@/hooks/use-crud";
import { toast } from "sonner";
import { handleApiError } from "@/lib/error-utils";

const useCategory = () => {
  const { crudState } = useCrud();
  const categoryData = useCategoryControllerFindAllQuery();

  const [deleteCategory, setDeleteCategoryData] =
    useCategoryControllerRemoveMutation();

  const [updateCategoryStatus, setUpdateCategoryStatusData] =
    useCategoryControllerToggleActiveMutation();

  const [categories, setCategories] = useState<
    CategoryResponseDtoWithoutCreatedBy[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setCategories(categoryData.data || []);
  }, [categoryData.data]);

  const handleDeleteCategory = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory({ id });
    }
  };

  const handleToggleStatus = (id: string, isActive: boolean) => {
    if (
      window.confirm("Are you sure you want to update this category status?")
    ) {
      updateCategoryStatus({
        id,
        updateCategoryDto: {
          isActive,
        },
      });
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (setUpdateCategoryStatusData.isSuccess) {
      toast.success("Category status updated successfully");
    } else if (setUpdateCategoryStatusData.isError) {
      handleApiError(setUpdateCategoryStatusData.error);
    }
  }, [
    setUpdateCategoryStatusData.isSuccess,
    setUpdateCategoryStatusData.error,
  ]);

  useEffect(() => {
    if (setDeleteCategoryData.isSuccess) {
      toast.success("Category deleted successfully");
    } else if (setDeleteCategoryData.isError) {
      handleApiError(setDeleteCategoryData.error);
    }
  }, [setDeleteCategoryData.isSuccess, setDeleteCategoryData.error]);

  return {
    categories,
    categoryData,
    setEditingCategory,
    setIsModalOpen,
    setSearchQuery,
    searchQuery,
    isModalOpen,
    editingCategory,
    filteredCategories,
    handleDeleteCategory,
    handleToggleStatus,
    handleEdit,
    crudState,
    setDeleteCategoryData,
  };
};

export default useCategory;
