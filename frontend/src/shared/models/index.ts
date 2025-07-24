export type SidebarItem = {
  title: string;
  url?: string;
  items?: SidebarItem[];
  isActive?: boolean;
  icon?: React.ReactNode;
  isComing?: boolean;
};

export interface Tenant {
  id: string;
  slug: string;
  name: string;
}
