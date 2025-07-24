import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface StockCategory {
  name: string;
  stockPercentage: number;
}

interface StockOverviewProps {
  categories: StockCategory[];
}

export const StockOverview: React.FC<StockOverviewProps> = ({ categories }) => (
  <Card>
    <CardHeader>
      <CardTitle>Stock Overview</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {categories.map(({ name, stockPercentage }) => (
          <div key={name}>
            <div className="flex justify-between text-sm mb-1">
              <span>{name}</span>
              <span className="text-muted-foreground">
                {stockPercentage}% in stock
              </span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${stockPercentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
