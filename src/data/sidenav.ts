import { BookCheck, Frame, Map, PieChart, Soup, Store } from "lucide-react";
import { AudioWaveform, Command } from "lucide-react";

export const dashboards = [
  {
    name: "Inventory",
    description: "Dashboard",
    logo: BookCheck,
    color: "",
  },
  {
    name: "Dining.",
    description: "Dashboard",
    logo: AudioWaveform,
    color: "",
  },
  {
    name: "Sales",
    description: "Dashboard",
    logo: Command,
    color: "",
  },
];

export const inventoryNavItems = [
  {
    title: "Store",
    url: "",
    icon: Store,
    isActive: true,
    items: [
      {
        title: "Stocks",
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
    name: "Design Engineering",
    url: "#",
    icon: Frame,
  },
  {
    name: "Sales & Marketing",
    url: "#",
    icon: PieChart,
  },
  {
    name: "Travel",
    url: "#",
    icon: Map,
  },
];
