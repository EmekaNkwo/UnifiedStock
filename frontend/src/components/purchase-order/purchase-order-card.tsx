// src/components/purchase-order/purchase-order-card.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PurchaseOrder } from "./types";
import { format } from "date-fns";
import { Eye, Package, X } from "lucide-react";

interface PurchaseOrderCardProps {
  order: PurchaseOrder;
  onView: (id: string) => void;
  onReceive: (id: string) => void;
  onCancel: (id: string) => void;
}

export function PurchaseOrderCard({
  order,
  onView,
  onReceive,
  onCancel,
}: PurchaseOrderCardProps) {
  const statusColors = {
    draft: "bg-gray-100 text-gray-800",
    ordered: "bg-blue-100 text-blue-800",
    received: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{order.orderNumber}</h3>
            <Badge className={statusColors[order.status]}>
              {order.status.toUpperCase()}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Supplier: {order.supplier}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              {order.items.length} items
            </Badge>
            <Badge variant="outline" className="text-xs">
              ${order.totalAmount.toFixed(2)}
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm">
            Ordered: {format(new Date(order.orderDate), "MMM dd, yyyy")}
          </p>
          <p className="text-sm">
            Expected: {format(new Date(order.expectedDelivery), "MMM dd, yyyy")}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onView(order.id)}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          {order.status === "ordered" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReceive(order.id)}
              >
                <Package className="h-4 w-4 mr-2" />
                Receive
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCancel(order.id)}
                className="text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
