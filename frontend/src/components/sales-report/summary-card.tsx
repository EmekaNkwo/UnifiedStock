import { TrendingUp, ShoppingCart, Package, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: number;
}

const iconMap = {
  sales: <DollarSign className="h-4 w-4 text-muted-foreground" />,
  orders: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
  average: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
  items: <Package className="h-4 w-4 text-muted-foreground" />,
};

export function SummaryCard({
  title,
  value,
  description,
  icon,
  trend,
}: SummaryCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
          {trend !== undefined && (
            <span className={trend >= 0 ? "text-green-500" : "text-red-500"}>
              {" "}
              {trend >= 0 ? `+${trend}%` : `${trend}%`} from last period
            </span>
          )}
        </p>
      </CardContent>
    </Card>
  );
}
