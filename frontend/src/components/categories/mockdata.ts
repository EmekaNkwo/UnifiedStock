import { Category } from "./types";

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    description: "Electronic devices and accessories",
    productCount: 42,
    isActive: true,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-06-20T14:45:00Z",
  },
  {
    id: "2",
    name: "Clothing",
    description: "Apparel and fashion items",
    productCount: 128,
    isActive: true,
    createdAt: "2023-02-10T09:15:00Z",
    updatedAt: "2023-07-05T11:20:00Z",
  },
  {
    id: "3",
    name: "Home & Kitchen",
    description: "Home appliances and kitchenware",
    productCount: 76,
    isActive: true,
    createdAt: "2023-03-05T13:20:00Z",
    updatedAt: "2023-07-10T16:30:00Z",
  },
  {
    id: "4",
    name: "Books",
    description: "Books and magazines",
    productCount: 215,
    isActive: true,
    createdAt: "2023-04-12T08:45:00Z",
    updatedAt: "2023-07-18T10:15:00Z",
  },
  {
    id: "5",
    name: "Toys & Games",
    description: "Toys and board games",
    productCount: 93,
    isActive: false,
    createdAt: "2023-05-20T11:10:00Z",
    updatedAt: "2023-07-15T14:20:00Z",
  },
];
