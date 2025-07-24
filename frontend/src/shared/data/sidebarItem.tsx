import {
  ArrowDownNarrowWide,
  Cable,
  ChartBarStacked,
  ChartCandlestick,
  Clock,
  DiamondPercent,
  GaugeCircleIcon,
  HandCoins,
  HelpCircle,
  Percent,
  SendToBack,
  Settings,
  Settings2,
  SquareActivity,
  TableProperties,
  TicketPlus,
  UserCog,
  Users,
} from "lucide-react";
import { SidebarItem } from "../models";

export const sidebarItems: SidebarItem[] = [
  {
    title: "Home",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: <GaugeCircleIcon />,
      },
    ],
  },
  {
    title: "Inventory",
    items: [
      {
        title: "Products",
        url: "/inventory",
        icon: <TableProperties />,
      },
      {
        title: "Categories",
        url: "/categories",
        icon: <ChartBarStacked />,
        isActive: true,
      },
      {
        title: "Low Stock",
        url: "/low-stock",
        icon: <ArrowDownNarrowWide />,
        isComing: true,
      },
      {
        title: "Stock Adjustment",
        url: "/stock-adjustment",
        icon: <SendToBack />,
        isComing: true,
      },
    ],
  },
  {
    title: "Purchasing",
    items: [
      {
        title: "Purchase Orders",
        url: "/purchase-orders",
        icon: <TicketPlus />,
      },
      {
        title: "Suppliers",
        url: "/suppliers",
        icon: <Cable />,
      },
      {
        title: "Receivings",
        url: "/receivings",
        icon: <HandCoins />,
      },
    ],
  },
  {
    title: "Sales",
    items: [
      {
        title: "Invoices",
        url: "/invoices",
        icon: <Clock />,
      },
      {
        title: "Customers",
        url: "/customers",
        icon: <Settings />,
      },
      {
        title: "Returns",
        url: "/returns",
        icon: <HelpCircle />,
      },
    ],
  },
  {
    title: "Reporting",
    items: [
      {
        title: "Sales Reports",
        url: "/sales-reports",
        icon: <DiamondPercent />,
      },
      {
        title: "Valuation",
        url: "/inventory-valuation",
        icon: <ChartCandlestick />,
        isComing: true,
      },
      {
        title: "Stock Movement",
        url: "/stock-movement",
        icon: <SquareActivity />,
        isComing: true,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Users Management",
        url: "/users",
        icon: <Users />,
      },
      {
        title: "Inventory Settings",
        url: "/inventory-settings",
        icon: <Settings2 />,
      },
      {
        title: "Tenant Settings",
        url: "/tenant-settings",
        icon: <UserCog />,
      },
      {
        title: "Tax Settings",
        url: "/tax-settings",
        icon: <Percent />,
      },
    ],
  },
];
