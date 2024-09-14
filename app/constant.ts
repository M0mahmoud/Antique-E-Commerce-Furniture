import {
  Bandage,
  ChartBarStacked,
  ChartNoAxesColumn,
  CircleGauge,
  FilePlus2,
  FolderKanban,
  HandCoins,
  Layers3,
  LayoutDashboard,
  ListOrdered,
  Mail,
  Settings,
  ShoppingBasket,
  Upload,
} from "lucide-react";

interface SidebarItem {
  label: string;
  icon?: React.ElementType;
  path: string;
  subItems?: SidebarItem[];
}

export const sidebarSections: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: CircleGauge,
    path: "#",
    subItems: [
      { label: "Main", path: "#", icon: LayoutDashboard },
      { label: "Analytics", path: "#", icon: ChartNoAxesColumn },
      { label: "Fintech", path: "#", icon: HandCoins },
    ],
  },
  {
    label: "Categories",
    icon: ChartBarStacked,
    path: "#",
    subItems: [
      { label: "Categories", path: "#", icon: ChartBarStacked },
      { label: "Category Order", path: "#", icon: ListOrdered },
    ],
  },
  {
    label: "Products",
    icon: ShoppingBasket,
    path: "#",
    subItems: [
      { label: "Products", path: "/admin/products", icon: ShoppingBasket },
      { label: "Add Product", path: "/admin/products/add", icon: FilePlus2 },
      { label: "Manage Products", path: "/admin/products/manage", icon: FolderKanban },
    ],
  },
  {
    label: "Brand",
    icon: Bandage,
    path: "#",
    subItems: [
      { label: "Brand", path: "#", icon: Bandage },
      { label: "bulk upload", path: "#", icon: Upload },
    ],
  },
  {
    label: "Messages",
    icon: Mail,
    path: "#",
  },
  {
    label: "Manage Stock",
    icon: Layers3,
    path: "#",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "#",
  },
];
