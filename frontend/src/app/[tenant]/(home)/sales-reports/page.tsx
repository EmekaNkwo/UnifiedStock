import React from "react";
import SalesReport from "@/components/sales-report";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Report",
  description: "Sales Report",
};
const page = () => {
  return <SalesReport />;
};

export default page;
