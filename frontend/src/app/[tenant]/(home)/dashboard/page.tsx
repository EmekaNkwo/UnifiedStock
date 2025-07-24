import { Metadata } from "next";
import Dashboard from "@/components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

const page = () => {
  return <Dashboard />;
};

export default page;
