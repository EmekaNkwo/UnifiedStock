export interface PurchaseOrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  received: number;
  remaining: number;
  status: "pending" | "partial" | "completed" | "cancelled";
}

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplier: string;
  orderDate: string;
  expectedDelivery: string;
  status: "draft" | "ordered" | "received" | "cancelled";
  totalAmount: number;
  items: PurchaseOrderItem[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
