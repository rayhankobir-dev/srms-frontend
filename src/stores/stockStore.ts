import { IStock } from "@/types";
import { create } from "zustand";

type StockStore = {
  stocks: IStock[];
  addStocks: (item: IStock) => void;
  updateStock: (id: string, updatedItem: Partial<IStock>) => void;
  removeStocks: (ids: string[]) => void;
  setStocks: (items: IStock[]) => void;
};

export const useStockStore = create<StockStore>((set) => ({
  stocks: [],

  addStocks: (item) =>
    set((state) => ({
      stocks: [...state.stocks, item],
    })),

  updateStock: (id, updatedItem) =>
    set((state) => ({
      stocks: state.stocks.map((item) =>
        item._id === id ? { ...item, ...updatedItem } : item
      ),
    })),

  removeStocks: (ids) =>
    set((state) => ({
      stocks: state.stocks.filter((item) => !ids.includes(item._id)),
    })),
  setStocks: (items) => set({ stocks: items }),
}));
