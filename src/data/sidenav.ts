import {
  BookCheck,
  ChartNoAxesCombined,
  Soup,
  Store,
  UtensilsCrossed,
} from "lucide-react";

export const dashboards = [
  {
    id: "inventory",
    name: "Inventory",
    description: "Dashboard",
    logo: BookCheck,
    color: "",
  },
  {
    id: "dining",
    name: "Dining.",
    description: "Dashboard",
    logo: UtensilsCrossed,
    color: "",
  },
  {
    id: "sales",
    name: "Sales",
    description: "Dashboard",
    logo: ChartNoAxesCombined,
    color: "",
  },
];

export const inventoryNavItems = [
  {
    title: "Store",
    url: "/sales",
    icon: Store,
    isActive: true,
    items: [
      {
        title: "Stocks",
        url: "/sales",
      },
      {
        title: "Add Stock",
        url: "/sales/add",
      },
      {
        title: "Configure",
        url: "",
      },
    ],
  },
  {
    title: "Restaurant",
    url: "",
    icon: Soup,
    isActive: true,
    items: [
      {
        title: "Stock",
        url: "",
      },
      {
        title: "Add Stock",
        url: "",
      },
      {
        title: "Configure",
        url: "",
      },
    ],
  },
];

export const salesNavItems = [
  {
    title: "Sales",
    url: "",
    icon: ChartNoAxesCombined,
    isActive: true,
    items: [
      {
        title: "Reports",
        url: "",
      },
      {
        title: "Add Stock",
        url: "",
      },
      {
        title: "Configure",
        url: "",
      },
    ],
  },
];
