"use client";
import { SidebarItem } from "@/shared/models";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { getSidebarItems } from "@/shared/data/sidebarItem";
import useGetTenant from "@/hooks/use-get-tenant";

function findActiveTitle(
  items: SidebarItem[],
  pathname: string
): string | null {
  for (const item of items) {
    if (item.url && pathname.startsWith(item.url)) {
      return item.title;
    }
    if (item.items) {
      const found = findActiveTitle(item.items, pathname);
      if (found) return found;
    }
  }
  return null;
}

export function useAppSidebar() {
  const pathname = usePathname();
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const { tenant } = useGetTenant();
  const items = getSidebarItems(tenant as string);

  useEffect(() => {
    if (pathname) {
      const title = findActiveTitle(items, pathname);
      setActiveTitle(title);
    }
  }, [pathname]);

  const isActive = useMemo(() => {
    return (item: SidebarItem) => {
      if (!pathname || !item.url) return false;
      return pathname === item.url || pathname.startsWith(item.url);
    };
  }, [pathname]);

  return { isActive, currentActiveItem: activeTitle };
}
