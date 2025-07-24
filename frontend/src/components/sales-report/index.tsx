// src/components/sales-report/index.tsx
"use client";

import { useState } from "react";
import {
  Calendar,
  DollarSign,
  Download,
  Filter,
  ShoppingCart,
  Package,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { SummaryCard } from "./summary-card";
import { SalesChart } from "./sales-chart";
import { TopProducts } from "./top-products";
import {
  mockSalesData,
  mockSalesSummary,
  mockSalesTrends,
  mockTopProducts,
} from "./mockdata";
import { DashboardContainer } from "@/shared/layout-wrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DatePicker } from "@/shared/custom-ui/date-picker";
import { DateRange } from "react-day-picker";

export default function SalesReport() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 5, 12),
  });

  return (
    <DashboardContainer>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Sales Report</h1>
            <p className="text-muted-foreground">
              Track and analyze your sales performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <DatePicker
              mode="range"
              value={date}
              onChange={setDate}
              placeholder="Select a date"
              //   label="Date of Birth"
            />

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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="Total Sales"
            value={`$${mockSalesSummary.totalSales.toFixed(2)}`}
            description="Total revenue"
            icon={<DollarSign className="h-4 w-4" />}
            trend={12.5}
          />
          <SummaryCard
            title="Orders"
            value={mockSalesSummary.totalOrders}
            description="Total orders"
            icon={<ShoppingCart className="h-4 w-4" />}
            trend={8.3}
          />
          <SummaryCard
            title="Avg. Order Value"
            value={`$${mockSalesSummary.averageOrderValue.toFixed(2)}`}
            description="Average order value"
            icon={<TrendingUp className="h-4 w-4" />}
            trend={4.2}
          />
          <SummaryCard
            title="Items Sold"
            value={mockSalesSummary.itemsSold}
            description="Total items sold"
            icon={<Package className="h-4 w-4" />}
            trend={15.7}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <SalesChart data={mockSalesTrends} />
          <div className="rounded-lg border bg-card p-6 w-full">
            <TopProducts products={mockTopProducts} />
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSalesData.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>
                      {new Date(sale.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{sale.orderId}</TableCell>
                    <TableCell>{sale.customer}</TableCell>
                    <TableCell>{sale.product}</TableCell>
                    <TableCell className="text-right">
                      ${sale.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          sale.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : sale.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {sale.status.charAt(0).toUpperCase() +
                          sale.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{sale.paymentMethod}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}
