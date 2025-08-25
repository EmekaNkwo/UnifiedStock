"use client";

import { Button } from "@/components/ui/button";

import { Form } from "@/components/ui/form";

import { Barcode, Camera, Upload, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarcodeScanner } from "./barcode-scanner";
import {
  CustomModal,
  SelectField,
  TextAreaField,
  TextField,
} from "@/shared/custom-ui";
import { AddProductFormValues } from "@/shared/zod-schema";
import useProduct from "../use-product";
import useCategory from "@/components/categories/use-category";
import { useEffect } from "react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const {
    addProductForm,
    activeTab,
    setActiveTab,
    isScanning,
    setIsScanning,
    handleScanComplete,
    handleImageChange,
    handleAddOrUpdateProduct,
    removeImage,
    previewImage,
    isLoading,
    isCreateOrUpdateSuccess,
    isEditMode,
  } = useProduct();

  const { categoryData } = useCategory();

  const handleSubmit = (data: AddProductFormValues) => {
    handleAddOrUpdateProduct(data);
  };

  useEffect(() => {
    if (isCreateOrUpdateSuccess) {
      onClose();
    }
  }, [isCreateOrUpdateSuccess]);

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={addProductForm.handleSubmit(handleSubmit)}
        title={isEditMode ? "Edit Product" : "Add New Product"}
        description={
          isEditMode
            ? "Update the product details below."
            : "Add a new product to your inventory. Fill in the details below."
        }
        isLoading={isLoading}
        submitLabel={isEditMode ? "Update Product" : "Add Product"}
        size="lg"
      >
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Manual Entry</TabsTrigger>
            <TabsTrigger value="scan">Scan Barcode</TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="pt-4">
            <Form {...addProductForm}>
              <form
                onSubmit={addProductForm.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <div className="col-span-2">
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Product Image
                    </label>
                    <div className="flex items-center justify-center flex-col space-y-2">
                      <div className="relative h-24 w-full overflow-hidden rounded-md border border-dashed border-gray-300">
                        {previewImage || addProductForm.getValues("image") ? (
                          <>
                            <img
                              src={
                                previewImage ||
                                addProductForm.getValues("image")
                              }
                              alt="Preview"
                              className="h-full w-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute right-1 top-1 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center text-gray-500 hover:bg-gray-50">
                            <Upload className="h-5 w-5" />
                            <span className="mt-1 text-xs">Upload Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </label>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        <p className="text-xs text-gray-400">
                          JPG, PNG up to 2MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <TextField
                  control={addProductForm.control}
                  name="name"
                  label="Product Name"
                  placeholder="Enter product name"
                />
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    control={addProductForm.control}
                    name="sku"
                    label="SKU"
                    placeholder="Enter SKU"
                  />

                  <TextField
                    control={addProductForm.control}
                    name="barcode"
                    label="Barcode"
                    placeholder="Scan or enter barcode"
                    rightIcon={<Barcode />}
                    onClick={() => {
                      setActiveTab("scan");
                    }}
                  />

                  <SelectField
                    control={addProductForm.control}
                    name="category"
                    label="Category"
                    placeholder="Enter Category"
                    options={
                      categoryData?.data?.map((category) => ({
                        value: category.id,
                        label: category.name,
                      })) || []
                    }
                  />

                  <TextField
                    control={addProductForm.control}
                    name="price"
                    label="Price"
                    placeholder="Enter price"
                    type="number"
                  />
                  <TextField
                    control={addProductForm.control}
                    name="cost"
                    label="Cost"
                    placeholder="Enter cost"
                    type="number"
                  />
                  <TextField
                    control={addProductForm.control}
                    name="quantity"
                    label="Quantity"
                    placeholder="Enter quantity"
                    type="number"
                  />
                  <TextField
                    control={addProductForm.control}
                    name="minStockLevel"
                    label="Min Stock Level"
                    placeholder="Enter min stock level"
                    type="number"
                  />
                  <SelectField
                    control={addProductForm.control}
                    name="status"
                    label="Status"
                    placeholder="Enter Status"
                    options={[
                      { value: "in_stock", label: "In Stock" },
                      { value: "low_stock", label: "Low Stock" },
                      {
                        value: "out_of_stock",
                        label: "Out of Stock",
                      },
                    ]}
                  />
                </div>
                <TextAreaField
                  control={addProductForm.control}
                  name="description"
                  label="Description"
                  placeholder="Enter description"
                />
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="scan" className="pt-4">
            <div className="flex flex-col items-center justify-center space-y-4 p-4">
              {isScanning ? (
                <div className="w-full">
                  <BarcodeScanner
                    onScan={handleScanComplete}
                    onClose={() => setIsScanning(false)}
                  />
                  <div className="mt-4 flex justify-center">
                    <Button
                      variant="outline"
                      onClick={() => setIsScanning(false)}
                    >
                      Cancel Scan
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4 py-8">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Camera className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">Scan Barcode</h3>
                  <p className="text-muted-foreground text-center text-sm">
                    Position a barcode or QR code in front of your camera to
                    scan.
                  </p>
                  <Button onClick={() => setIsScanning(true)} className="mt-4">
                    <Barcode className="mr-2 h-4 w-4" />
                    Start Scanning
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CustomModal>
    </>
  );
}
