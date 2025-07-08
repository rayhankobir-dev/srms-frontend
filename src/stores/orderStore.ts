import { IOrder } from "@/types";
import { create } from "zustand";

type OrderStore = {
  orders: IOrder[];
  addOrders: (items: IOrder[]) => void;
  updateOrder: (id: string, updatedItem: Partial<IOrder>) => void;
  removeOrders: (ids: string[]) => void;
  setOrders: (items: IOrder[]) => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],

  addOrders: (items) =>
    set((state) => ({
      orders: [...state.orders, ...items],
    })),

  updateOrder: (id, updatedItem) =>
    set((state) => ({
      orders: state.orders.map((item) =>
        item._id === id ? { ...item, ...updatedItem } : item
      ),
    })),

  removeOrders: (ids) =>
    set((state) => ({
      orders: state.orders.filter((item) => !ids.includes(item._id)),
    })),
  setOrders: (items) => set({ orders: items }),
}));
