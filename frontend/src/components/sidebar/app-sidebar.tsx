"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ModuleSwitcher } from "./module-switcher";
import Link from "next/link";
import { sidebarItems } from "@/shared/data/sidebarItem";
import { Label } from "../ui/label";
import { useAppSidebar } from "./useAppSidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isActive } = useAppSidebar();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <ModuleSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Label className="text-xs my-2.5 ml-3.5">
                  {item.icon && item.icon}
                  {item.title}
                </Label>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={isActive(item)}>
                          <Link
                            href={item.url as string}
                            className="font-normal"
                          >
                            {item.icon && item.icon}
                            {item.title}
                            {item.isComing && (
                              <span className="text-xs text-[#898989] font-light">
                                - (Coming soon)
                              </span>
                            )}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
