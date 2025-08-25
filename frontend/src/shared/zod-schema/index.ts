import z from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  parentId: z.string().optional(),
  isActive: z.string().optional(),
});

export const loginSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
});

export const productFormSchema = z.object({
  image: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  sku: z.string().min(2, "SKU must be at least 2 characters"),
  barcode: z.string().optional(),
  category: z.string(),
  price: z.number().min(0, "Price must be positive"),
  cost: z.number().min(0, "Cost must be positive"),
  quantity: z.number().min(0, "Quantity must be positive"),
  status: z.enum(["in_stock", "low_stock", "out_of_stock"]),
});

export const getAllProductsSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  status: z.enum(["in_stock", "low_stock", "out_of_stock"]).optional(),
});

export const addProductFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  minStockLevel: z.string().min(1, "Min stock level must be positive"),
  description: z.string().optional(),
  image: z.string().optional(),
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  price: z.string().min(1, "Price must be positive"),
  cost: z.string().min(1, "Cost must be positive"),
  quantity: z.string().min(1, "Quantity must be positive"),
  status: z.enum(["in_stock", "low_stock", "out_of_stock"]),
});

export type AddProductFormValues = z.infer<typeof addProductFormSchema>;

export type ProductFormValues = z.infer<typeof productFormSchema>;

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export type GetAllProductsSchema = z.infer<typeof getAllProductsSchema>;
