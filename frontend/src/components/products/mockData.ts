// src/components/products/mockData.ts
import { Product } from "./types";

export const mockCategories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home",
  "Sports",
];

export const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: `prod_${i + 1}`,
  name: `Product ${i + 1}`,
  sku: `SKU-${1000 + i}`,
  category: mockCategories[i % mockCategories.length],
  price: Math.floor(Math.random() * 1000) + 10,
  cost: Math.floor(Math.random() * 500) + 5,
  quantity: Math.floor(Math.random() * 100),
  status: (() => {
    const rand = Math.random();
    if (rand > 0.8) return "out_of_stock";
    if (rand > 0.5) return "low_stock";
    return "in_stock";
  })(),
  lastUpdated: new Date(
    Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
  ),
}));
