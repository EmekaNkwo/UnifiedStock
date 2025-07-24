import { Activity, User } from "./types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "manager",
    status: "active",
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "staff",
    status: "inactive",
    lastActive: "1 week ago",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "staff",
    status: "pending",
    lastActive: "Just now",
  },
];

export const recentActivities: Activity[] = [
  {
    id: 1,
    item: "Wireless Earbuds",
    action: "Stock added",
    qty: 150,
    time: "2h ago",
  },
  {
    id: 2,
    item: "Bluetooth Speaker",
    action: "Stock low",
    qty: 5,
    time: "5h ago",
  },
  {
    id: 3,
    item: "USB-C Cable",
    action: "Out of stock",
    qty: 0,
    time: "1d ago",
  },
];

export const stockCategories = [
  { name: "Electronics", stockPercentage: 75 },
  { name: "Accessories", stockPercentage: 85 },
  { name: "Components", stockPercentage: 92 },
];
