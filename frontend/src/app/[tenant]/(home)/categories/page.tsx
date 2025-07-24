import React from "react";

import Category from "@/components/categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Categories",
};

const page = () => {
  return <Category />;
};

export default page;
