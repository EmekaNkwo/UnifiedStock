import Products from "@/components/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Manage your product inventory",
};

export default function ProductsPage() {
  return <Products />;
}
