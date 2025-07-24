// src/components/products/types.ts
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  quantity: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
  lastUpdated: Date;
  image?: string;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  status?: string;
  sortBy?: "name" | "price" | "quantity" | "lastUpdated";
  sortOrder?: "asc" | "desc";
}
