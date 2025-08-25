"use client";
import { CustomModal } from "@/shared/custom-ui";
import React, { useEffect } from "react";
import useAddOrUpdateCategory from "./use-add-or-update-category";
import { CategoryForm } from "../category-form";
import { CategoryFormValues } from "@/shared/zod-schema";

const AddOrUpdateCategoryModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const {
    crudState,
    form,
    isLoading,
    handleAddOrUpdateCategory,
    getAllCategories,
    isSuccess,
  } = useAddOrUpdateCategory();

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={() => {
        closeModal();
      }}
      title={crudState.isEditMode ? "Edit Category" : "Add New Category"}
      description={`${
        crudState.isEditMode ? "Update" : "Create a new"
      } category and manage its details`}
      submitLabel={crudState.isEditMode ? "Save Changes" : "Create Category"}
      size="md"
    >
      <CategoryForm
        form={form}
        isLoading={isLoading}
        onSubmit={(data) => {
          handleAddOrUpdateCategory(data as CategoryFormValues);
        }}
        isEditMode={crudState.isEditMode}
        categories={getAllCategories.data || []}
      />
    </CustomModal>
  );
};

export default AddOrUpdateCategoryModal;
