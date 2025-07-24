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

export const getSidebarItems = (tenant: string): SidebarItem[] => [
  {
    title: "Home",
    items: [
      {
        title: "Dashboard",
        url: `/${tenant}/dashboard`,
        icon: <GaugeCircleIcon />,
      },
    ],
  },
  {
    title: "Inventory",
    items: [
      {
        title: "Products",
        url: `/${tenant}/products`,
        icon: <TableProperties />,
      },
      {
        title: "Categories",
        url: `/${tenant}/categories`,
        icon: <ChartBarStacked />,
        isActive: true,
      },
      {
        title: "Low Stock",
        url: `/${tenant}/low-stock`,
        icon: <ArrowDownNarrowWide />,
        isComing: true,
      },
      {
        title: "Stock Adjustment",
        url: `/${tenant}/stock-adjustment`,
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
        url: `/${tenant}/purchase-orders`,
        icon: <TicketPlus />,
      },
      {
        title: "Suppliers",
        url: `/${tenant}/suppliers`,
        icon: <Cable />,
      },
      {
        title: "Receivings",
        url: `/${tenant}/receivings`,
        icon: <HandCoins />,
      },
    ],
  },
  {
    title: "Sales",
    items: [
      {
        title: "Invoices",
        url: `/${tenant}/invoices`,
        icon: <Clock />,
      },
      {
        title: "Customers",
        url: `/${tenant}/customers`,
        icon: <Settings />,
      },
      {
        title: "Returns",
        url: `/${tenant}/returns`,
        icon: <HelpCircle />,
      },
    ],
  },
  {
    title: "Reporting",
    items: [
      {
        title: "Sales Reports",
        url: `/${tenant}/sales-reports`,
        icon: <DiamondPercent />,
      },
      {
        title: "Valuation",
        url: `/${tenant}/inventory-valuation`,
        icon: <ChartCandlestick />,
        isComing: true,
      },
      {
        title: "Stock Movement",
        url: `/${tenant}/stock-movement`,
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
        url: `/${tenant}/users`,
        icon: <Users />,
      },
      {
        title: "Inventory Settings",
        url: `/${tenant}/inventory-settings`,
        icon: <Settings2 />,
      },
      {
        title: "Tenant Settings",
        url: `/${tenant}/tenant-settings`,
        icon: <UserCog />,
      },
      {
        title: "Tax Settings",
        url: `/${tenant}/tax-settings`,
        icon: <Percent />,
      },
    ],
  },
];
