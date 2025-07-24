"use client";

import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import useGetTenant from "@/hooks/use-get-tenant";

export function ModuleSwitcher() {
  const { tenant } = useGetTenant();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2">
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <GalleryVerticalEnd className="size-4" />
        </div>
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-medium capitalize">{tenant}</span>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
