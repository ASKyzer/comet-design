export interface SidebarItem {
  label: string;
  icon: string;
  router_link?: string;
  test_id: string;
  options?: SidebarItem[];
  disabled?: boolean;
  bottom_divider?: boolean;
  top_divider?: boolean;
}
