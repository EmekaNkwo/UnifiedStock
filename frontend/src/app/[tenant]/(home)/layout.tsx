import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Topbar from "@/components/sidebar/topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <Topbar />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-h-[100vh] md:min-h-min">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
