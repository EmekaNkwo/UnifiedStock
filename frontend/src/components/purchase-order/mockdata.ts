import { PurchaseOrder } from "./types";

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "po-001",
    orderNumber: "PO-2023-001",
    supplier: "Tech Suppliers Inc.",
    orderDate: "2023-07-15",
    expectedDelivery: "2023-07-25",
    status: "ordered",
    totalAmount: 2450.75,
    createdAt: "2023-07-15T09:30:00Z",
    updatedAt: "2023-07-15T09:30:00Z",
    items: [
      {
        id: "item-001",
        productId: "prod-001",
        productName: "Wireless Keyboard",
        quantity: 10,
        unitPrice: 59.99,
        total: 599.9,
        received: 0,
        remaining: 10,
        status: "pending",
      },
      {
        id: "item-002",
        productId: "prod-002",
        productName: "Wireless Mouse",
        quantity: 15,
        unitPrice: 29.99,
        total: 449.85,
        received: 15,
        remaining: 0,
        status: "completed",
      },
    ],
  },
  // Add more mock data as needed
];
