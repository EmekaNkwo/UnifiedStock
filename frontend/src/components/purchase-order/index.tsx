// src/components/purchase-order/index.tsx
"use client";

import { useState } from "react";
import { Plus, Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomModal } from "@/shared/custom-ui";

import { DashboardContainer } from "@/shared/layout-wrapper";
import { mockPurchaseOrders } from "./mockdata";
import { PurchaseOrderCard } from "./purchase-order-card";
import { PurchaseOrderForm } from "./purchase-order-form";

export default function PurchaseOrdersPage() {
  const [orders, setOrders] = useState(mockPurchaseOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddOrder = (data: any) => {
    // In a real app, this would be an API call
    const newOrder: any = {
      id: `po-${Date.now()}`,
      orderNumber: `PO-${new Date().getFullYear()}-${String(
        orders.length + 1
      ).padStart(3, "0")}`,
      status: "draft",
      orderDate: new Date().toISOString(),
      totalAmount: 0,
      items: [],
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders([...orders, newOrder]);
    setIsModalOpen(false);
  };

  const handleReceiveOrder = (id: string) => {
    // Implement receive order logic
    console.log("Receive order:", id);
  };

  const handleCancelOrder = (id: string) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, status: "cancelled" } : order
        )
      );
    }
  };

  return (
    <DashboardContainer>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Purchase Orders</h1>
          <p className="text-muted-foreground">Manage your purchase orders</p>
        </div>
        <Button
          onClick={() => {
            setSelectedOrder(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Purchase Order
        </Button>
      </div>

      <div className="flex flex-col space-y-4 mt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-10">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="h-10">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredOrders.map((order) => (
            <PurchaseOrderCard
              key={order.id}
              order={order}
              onView={(id) => {
                setSelectedOrder(id);
                // In a real app, you might want to navigate to a detail page
                console.log("View order:", id);
              }}
              onReceive={handleReceiveOrder}
              onCancel={handleCancelOrder}
            />
          ))}
        </div>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        title={selectedOrder ? "Edit Purchase Order" : "Create Purchase Order"}
        description={
          selectedOrder
            ? "Update the purchase order details"
            : "Create a new purchase order"
        }
        submitLabel={selectedOrder ? "Save Changes" : "Create Order"}
        onSubmit={
          () => {}
          //   document.getElementById("purchase-order-form")?.requestSubmit()
        }
        size="lg"
      >
        <PurchaseOrderForm
          initialData={
            selectedOrder
              ? orders.find((o) => o.id === selectedOrder)
              : undefined
          }
          onSubmit={handleAddOrder}
        />
      </CustomModal>
    </DashboardContainer>
  );
}
