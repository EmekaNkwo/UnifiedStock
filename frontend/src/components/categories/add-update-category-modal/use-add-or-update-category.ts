import {
  CategoryResponseDtoWithoutCreatedBy,
  CreateCategoryDto,
  useCategoryControllerCreateMutation,
  useCategoryControllerGetCategoryTreeQuery,
  useCategoryControllerUpdateMutation,
} from "@/redux/services/category-api";
import { useEffect } from "react";
import { useCrud } from "@/hooks/use-crud";
import { categoryFormSchema, CategoryFormValues } from "@/shared/zod-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useModal from "@/hooks/use-modal";
import { handleApiError } from "@/lib/error-utils";

const useAddOrUpdateCategory = () => {
  const { crudState } = useCrud();
  const { isOpen, openModal, closeModal } = useModal();
  const [createCategory, setCreateCategoryData] =
    useCategoryControllerCreateMutation();
  const [updateCategory, setUpdateCategoryData] =
    useCategoryControllerUpdateMutation();

  const getAllCategories = useCategoryControllerGetCategoryTreeQuery();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
      parentId: undefined,
      isActive: "true",
    },
  });

  const handleAddOrUpdateCategory = async (data: CategoryFormValues) => {
    const newCategory: CreateCategoryDto = {
      name: data.name,
      description: data.description || "",
      parentId: data.parentId ? String(data.parentId) : undefined,
      isActive: data.isActive === "true",
    };
    if (crudState.isEditMode) {
      await updateCategory({
        id: String(crudState.elementId),
        updateCategoryDto: newCategory,
      });
    } else {
      await createCategory({
        createCategoryDto: newCategory,
      });
    }
  };
  const isLoading =
    setCreateCategoryData.isLoading || setUpdateCategoryData.isLoading;

  const isSuccess =
    setCreateCategoryData.isSuccess || setUpdateCategoryData.isSuccess;

  useEffect(() => {
    if (crudState.record && crudState.isEditMode) {
      const record = crudState.record as CategoryResponseDtoWithoutCreatedBy;
      form.setValue("name", record.name);
      form.setValue("description", record.description);
      form.setValue("parentId", record.parentId);
      form.setValue("isActive", record.isActive ? "true" : "false");
    }
  }, [crudState.isEditMode]);

  useEffect(() => {
    if (setCreateCategoryData.isSuccess || setUpdateCategoryData.isSuccess) {
      closeModal();
    } else if (setCreateCategoryData.isError || setUpdateCategoryData.isError) {
      handleApiError(
        setCreateCategoryData.error || setUpdateCategoryData.error
      );
    }
  }, [
    setCreateCategoryData.isSuccess,
    setUpdateCategoryData.isSuccess,
    setCreateCategoryData.error,
    setUpdateCategoryData.error,
  ]);
  return {
    handleAddOrUpdateCategory,
    setCreateCategoryData,
    setUpdateCategoryData,
    form,
    isLoading,
    crudState,
    isOpen,
    openModal,
    closeModal,
    getAllCategories,
    isSuccess,
  };
};

export default useAddOrUpdateCategory;
