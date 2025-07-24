import React from "react";
import { Package, AlertTriangle, PackageX, DollarSign } from "lucide-react";
import { StatCard } from "./stat-card";
import { RecentActivities } from "./recent-activities";
import { StockOverview } from "./stock-overview";
import { stats } from "./types";
import { DashboardContainer } from "@/shared/layout-wrapper";
import { recentActivities, stockCategories } from "./data";
import { UserTable } from "../user-management/user-table";

const Dashboard = () => (
  <DashboardContainer>
    {/* Stats Grid */}
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Items"
        value={stats.totalItems}
        icon={Package}
        trend={12}
      />
      <StatCard title="Low Stock" value={stats.lowStock} icon={AlertTriangle} />
      <StatCard title="Out of Stock" value={stats.outOfStock} icon={PackageX} />
      <StatCard
        title="Inventory Value"
        value={`$${stats.totalValue.toLocaleString()}`}
        icon={DollarSign}
        trend={5.8}
      />
    </div>

    {/* Bottom Section */}
    <div className="grid gap-4 md:grid-cols-2">
      <RecentActivities activities={recentActivities} />
      <StockOverview categories={stockCategories} />
    </div>
    <UserTable isDashboardView />
  </DashboardContainer>
);

export default Dashboard;
