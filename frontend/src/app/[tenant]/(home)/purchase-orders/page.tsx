import PurchaseOrdersPage from "@/components/purchase-order";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase Orders",
  description: "Purchase Orders",
};

const page = () => {
  return <PurchaseOrdersPage />;
};

export default page;
