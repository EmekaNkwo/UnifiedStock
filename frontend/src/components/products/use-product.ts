"use client";
import {
  CreateItemDto,
  InventoryResponseDto,
  useInventoryControllerCreateMutation,
  useInventoryControllerFindAllQuery,
  useInventoryControllerRemoveMutation,
  useInventoryControllerUpdateMutation,
} from "@/redux/services/inventory-api";
import { GetAllProductsSchema } from "@/shared/zod-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllProductsSchema } from "@/shared/zod-schema";
import {
  addProductFormSchema,
  AddProductFormValues,
} from "@/shared/zod-schema";
import { useTable } from "@/hooks/use-table";
import { useCrud } from "@/hooks/use-crud";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/error-utils";
import { InventoryStatus } from "@/redux/services/inventory-api";

const useProduct = () => {
  const { tableState } = useTable();
  const [activeTab, setActiveTab] = useState<"form" | "scan">("form");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const { crudState, clearCrudState } = useCrud();
  const { isEditMode, elementId } = crudState;
  const form = useForm<GetAllProductsSchema>({
    resolver: zodResolver(getAllProductsSchema),
    defaultValues: {
      page: tableState.pageNumber,
      limit: tableState.pageSize,
      status: "in_stock",
    },
  });

  const addProductForm = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: "",
      sku: "",
      barcode: "",
      category: "",
      price: "",
      cost: "",
      quantity: "",
      status: "in_stock",
    },
  });
  const getProductInventoryData = useInventoryControllerFindAllQuery(
    form.getValues(),
    {
      skip: !form.getValues(),
    }
  );

  const [addProduct, addProductMutation] =
    useInventoryControllerCreateMutation();
  const [updateProduct, updateProductMutation] =
    useInventoryControllerUpdateMutation();

  const [deleteProduct, deleteProductMutation] =
    useInventoryControllerRemoveMutation();

  const isCreateOrUpdateSuccess =
    addProductMutation.isSuccess || updateProductMutation.isSuccess;
  const isCreateOrUpdateError =
    addProductMutation.isError || updateProductMutation.isError;

  const isLoading =
    addProductMutation.isLoading || updateProductMutation.isLoading;

  const handleScanComplete = (code: string) => {
    addProductForm.setValue("barcode", code);
    setActiveTab("form");
    setIsScanning(false);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct({
        id,
      });
    }
  };

  const handleAddOrUpdateProduct = async (data: AddProductFormValues) => {
    const productPayload: CreateItemDto = {
      name: data.name,
      description: data.description || "",
      quantity: Number(data.quantity),
      cost: Number(data.cost),
      price: Number(data.price),
      sku: data.sku,
      minStockLevel: Number(data.minStockLevel),
      image: data.image || "",
      categoryId: data.category,
      status: data.status,
      barcode: data.barcode || "",
    };
    if (isEditMode) {
      await updateProduct({
        createItemDto: productPayload,
        id: String(elementId) || "",
      });
      console.log("Edit Mode", elementId);
    }
    await addProduct({
      createItemDto: productPayload,
    });
  };

  console.log("isEditMode", isEditMode);
  console.log("record", crudState.record);

  useEffect(() => {
    if (isEditMode) {
      const record = crudState.record as InventoryResponseDto;
      addProductForm.setValue("name", record?.name || "");
      addProductForm.setValue("description", record?.description || "");
      addProductForm.setValue("image", record?.image || "");
      addProductForm.setValue("sku", record?.sku || "");
      addProductForm.setValue("barcode", record?.barcode || "");
      addProductForm.setValue("category", String(record?.categoryId) || "");
      addProductForm.setValue(
        "minStockLevel",
        String(record?.minStockLevel) || ""
      );
      addProductForm.setValue("price", String(record?.price) || "");
      addProductForm.setValue("cost", String(record?.cost) || "");
      addProductForm.setValue("quantity", String(record?.quantity) || "");
      addProductForm.setValue("status", record?.status || "");
    } else if (deleteProductMutation.isError) {
      handleApiError(deleteProductMutation.error);
    }
  }, [deleteProductMutation.isSuccess, deleteProductMutation.isError]);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        addProductForm.setValue("image", base64String);
      };
      reader.readAsDataURL(file);
    },
    [addProductForm]
  );

  const removeImage = useCallback(() => {
    setPreviewImage(null);
    addProductForm.setValue("image", "");
  }, [addProductForm]);

  useEffect(() => {
    if (isCreateOrUpdateSuccess) {
      toast.success(
        addProductMutation.isSuccess
          ? "Product Created Successfully"
          : "Product Updated Successfully"
      );
      addProductForm.reset();
      clearCrudState();
    } else if (isCreateOrUpdateError) {
      handleApiError(addProductMutation.error || updateProductMutation.error);
    }
  }, [
    addProductMutation.isSuccess,
    updateProductMutation.isSuccess,
    addProductMutation.isError,
    updateProductMutation.isError,
  ]);
  useEffect(() => {
    if (getProductInventoryData.isError) {
      handleApiError(getProductInventoryData.error);
    }
  }, [getProductInventoryData.isError]);

  useEffect(() => {
    if (deleteProductMutation.isSuccess) {
      toast.success("Product Deleted Successfully");
    } else if (deleteProductMutation.isError) {
      handleApiError(deleteProductMutation.error);
    }
  }, [deleteProductMutation.isSuccess, deleteProductMutation.isError]);

  return {
    getProductInventoryData,
    getProductForm: form,
    handleAddOrUpdateProduct,
    addProductForm,
    activeTab,
    setActiveTab,
    isScanning,
    setIsScanning,
    handleScanComplete,
    handleImageChange,
    removeImage,
    previewImage,
    isLoading,
    isCreateOrUpdateSuccess,
    handleDeleteProduct,
    isEditMode,
  };
};

export default useProduct;
