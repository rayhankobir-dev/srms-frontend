import { create } from "zustand";
import { IMenuItem } from "@/types";

type MenuStore = {
  menuItems: IMenuItem[];
  addMenuItems: (items: IMenuItem[]) => void;
  updateMenuItem: (id: string, updatedItem: Partial<IMenuItem>) => void;
  removeMenuItems: (ids: string[]) => void;
  setMenuItems: (items: IMenuItem[]) => void;
};

export const useMenuStore = create<MenuStore>((set) => ({
  menuItems: [],

  addMenuItems: (items) =>
    set((state) => ({
      menuItems: [...state.menuItems, ...items],
    })),

  updateMenuItem: (id, updatedItem) =>
    set((state) => ({
      menuItems: state.menuItems.map((item) =>
        item._id === id ? { ...item, ...updatedItem } : item
      ),
    })),

  removeMenuItems: (ids) =>
    set((state) => ({
      menuItems: state.menuItems.filter((item) => !ids.includes(item._id)),
    })),
  setMenuItems: (items) => set({ menuItems: items }),
}));
