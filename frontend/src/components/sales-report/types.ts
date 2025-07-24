export interface SalesData {
  id: string;
  date: string;
  orderId: string;
  customer: string;
  product: string;
  quantity: number;
  unitPrice: number;
  total: number;
  status: "completed" | "pending" | "cancelled";
  paymentMethod: string;
}

export interface SalesSummary {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  itemsSold: number;
}

export interface SalesTrend {
  date: string;
  sales: number;
  orders: number;
}

export interface TopProduct {
  id: string;
  name: string;
  quantitySold: number;
  revenue: number;
}
