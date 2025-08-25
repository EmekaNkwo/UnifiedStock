"use client";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";

import { CategoryFormValues } from "@/shared/zod-schema";
import {
  FormActions,
  SelectField,
  TextAreaField,
  TextField,
} from "@/shared/custom-ui";
import { CategoryResponseDtoWithoutCreatedBy } from "@/redux/services/category-api";

interface CategoryFormProps {
  form: ReturnType<typeof useForm<CategoryFormValues>>;
  onSubmit: (data: CategoryFormValues) => void;
  isLoading?: boolean;
  onCancel?: () => void;
  isEditMode?: boolean;
  categories?: CategoryResponseDtoWithoutCreatedBy[];
}

export function CategoryForm({
  form,
  isLoading = false,
  onCancel,
  onSubmit,
  isEditMode,
  categories,
}: CategoryFormProps) {
  return (
    <Form {...form}>
      <form className="space-y-4">
        <TextField
          control={form.control}
          name="name"
          label="Name"
          placeholder="Category name"
        />
        <TextAreaField
          control={form.control}
          name="description"
          label="Description "
          placeholder="Category description"
        />

        <SelectField
          control={form.control}
          name="parentId"
          label="Parent Category"
          placeholder="Select parent category"
          options={
            categories?.map((category) => ({
              value: category.id,
              label: category.name,
            })) || []
          }
        />
        <SelectField
          control={form.control}
          name="isActive"
          label="Active"
          placeholder="Select active status"
          options={[
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
          ]}
        />

        <FormActions
          className="mt-4"
          isLoading={isLoading}
          onSubmit={form.handleSubmit(onSubmit)}
          onCancel={onCancel}
          submitLabel={isEditMode ? "Update Category" : "Save Category"}
          cancelLabel="Close"
          showCancel
        />
      </form>
    </Form>
  );
}
