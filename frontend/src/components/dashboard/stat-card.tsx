import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import { StatCardProps } from "./types";

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend = 0,
}) => {
  const isPositive = trend >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        {trend !== 0 && (
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowUpDown
              className={`h-3 w-3 mr-1 ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            />
            {Math.abs(trend)}% {isPositive ? "increase" : "decrease"} from last
            month
          </p>
        )}
      </CardContent>
    </Card>
  );
};
