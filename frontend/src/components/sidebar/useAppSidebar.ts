"use client";
import { SidebarItem } from "@/shared/models";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { sidebarItems } from "@/shared/data/sidebarItem";

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

  useEffect(() => {
    if (pathname) {
      const title = findActiveTitle(sidebarItems, pathname);
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
