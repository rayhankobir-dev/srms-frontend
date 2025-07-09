import { create } from "zustand";
import { IInventory } from "@/types";

type InventoryStore = {
  inventory: IInventory[];
  addInventory: (items: IInventory) => void;
  updateInventory: (id: string, updatedItem: Partial<IInventory>) => void;
  removeInventory: (ids: string[]) => void;
  setInventory: (items: IInventory[]) => void;
};

export const useInventoryStore = create<InventoryStore>((set) => ({
  inventory: [],

  addInventory: (item) =>
    set((state) => ({
      inventory: [...state.inventory, item],
    })),

  updateInventory: (id, updatedItem) =>
    set((state) => ({
      inventory: state.inventory.map((item) =>
        item._id === id ? { ...item, updatedItem } : item
      ),
    })),

  removeInventory: (ids) =>
    set((state) => ({
      inventory: state.inventory.filter((item) => !ids.includes(item._id)),
    })),
  setInventory: (items) => set({ inventory: items }),
}));
