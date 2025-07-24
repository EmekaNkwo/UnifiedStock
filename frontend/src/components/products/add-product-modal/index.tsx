// src/components/products/add-product-modal.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Barcode, Camera, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarcodeScanner } from "./barcode-scanner";
import { CustomModal, CustomSelect, FormActions } from "@/shared/custom-ui";

const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be positive"),
  cost: z.number().min(0, "Cost must be positive"),
  quantity: z.number().min(0, "Quantity must be positive"),
  status: z.enum(["in_stock", "low_stock", "out_of_stock"]),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormValues & { lastUpdated: Date }) => void;
  categories: string[];
  isLoading?: boolean;
}

export function AddProductModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
  isLoading = false,
}: AddProductModalProps) {
  const [activeTab, setActiveTab] = useState<"form" | "scan">("form");
  const [isScanning, setIsScanning] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      sku: "",
      barcode: "",
      category: "",
      price: 0,
      cost: 0,
      quantity: 0,
      status: "in_stock",
    },
  });

  const handleScanComplete = (code: string) => {
    form.setValue("barcode", code);
    setActiveTab("form");
    setIsScanning(false);
  };

  const handleSubmit = (data: ProductFormValues) => {
    onSubmit({
      ...data,
      lastUpdated: new Date(),
    });
  };

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={form.handleSubmit(handleSubmit)}
        title="Add New Product"
        description="Add a new product to your inventory. Fill in the details below."
        isLoading={isLoading}
        submitLabel="Add Product"
        size="lg"
      >
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Manual Entry</TabsTrigger>
            <TabsTrigger value="scan">Scan Barcode</TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="pt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
                          <Input placeholder="SKU-001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="barcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Barcode</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input
                              placeholder="Scan or enter barcode"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setActiveTab("scan");
                              setIsScanning(true);
                            }}
                          >
                            <Barcode className="h-4 w-4" />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <CustomSelect
                            value={field.value}
                            onChange={field.onChange}
                            options={categories.map((category) => ({
                              value: category,
                              label: category,
                            }))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cost ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            placeholder="0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <CustomSelect
                            value={field.value}
                            onChange={field.onChange}
                            options={[
                              { value: "in_stock", label: "In Stock" },
                              { value: "low_stock", label: "Low Stock" },
                              {
                                value: "out_of_stock",
                                label: "Out of Stock",
                              },
                            ]}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="scan" className="pt-4">
            <div className="flex flex-col items-center justify-center space-y-4 p-4">
              {isScanning ? (
                <div className="w-full">
                  <BarcodeScanner onScanComplete={handleScanComplete} />
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
