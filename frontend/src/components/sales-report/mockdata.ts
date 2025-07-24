import { SalesData, SalesSummary, SalesTrend, TopProduct } from "./types";

export const mockSalesData: SalesData[] = [
  {
    id: "sale-001",
    date: "2023-07-01T10:30:00Z",
    orderId: "ORD-2023-001",
    customer: "John Doe",
    product: "Wireless Headphones",
    quantity: 2,
    unitPrice: 99.99,
    total: 199.98,
    status: "completed",
    paymentMethod: "Credit Card",
  },
  // Add more mock data as needed
];

export const mockSalesSummary: SalesSummary = {
  totalSales: 5248.75,
  totalOrders: 42,
  averageOrderValue: 124.97,
  itemsSold: 128,
};

export const mockSalesTrends: SalesTrend[] = [
  { date: "2023-07-01", sales: 1200, orders: 5 },
  { date: "2023-07-02", sales: 1800, orders: 7 },
  { date: "2023-07-03", sales: 950, orders: 4 },
  { date: "2023-07-04", sales: 2200, orders: 9 },
  { date: "2023-07-05", sales: 1500, orders: 6 },
];

export const mockTopProducts: TopProduct[] = [
  {
    id: "prod-001",
    name: "Wireless Headphones",
    quantitySold: 45,
    revenue: 4499.55,
  },
  { id: "prod-002", name: "Smart Watch", quantitySold: 32, revenue: 3199.68 },
  {
    id: "prod-003",
    name: "Bluetooth Speaker",
    quantitySold: 28,
    revenue: 1399.72,
  },
  { id: "prod-004", name: "Phone Case", quantitySold: 15, revenue: 299.85 },
  { id: "prod-005", name: "Screen Protector", quantitySold: 8, revenue: 79.92 },
];
