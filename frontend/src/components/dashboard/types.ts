export interface Activity {
  id: number;
  item: string;
  action: string;
  qty: number;
  time: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: number;
}

export interface RecentActivitiesProps {
  activities: Activity[];
}

export interface StockOverviewProps {
  categories: {
    name: string;
    stockPercentage: number;
  }[];
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "staff";
  status: "active" | "inactive" | "pending";
  lastActive: string;
};

export const stats = {
  totalItems: 1254,
  lowStock: 42,
  outOfStock: 8,
  totalValue: 125430.75,
};
