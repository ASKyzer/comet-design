export interface StageItem {
  title: string;
  state: "done" | "next" | "active" | "disabled";
  router_link: string;
  subtitle?: string;
  icon?: string;
  icon_type?:
    | "ui"
    | "wecons-helix"
    | "wecons-circle"
    | "three-dimensional"
    | "url"
    | "flags";
}
