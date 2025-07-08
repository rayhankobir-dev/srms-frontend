import { create } from "zustand";

export type StockItem = {
  _id: string;
  itemName: string;
  newStock: number;
  inStock: number;
  cooked: number;
  sold: number;
  unit: string;
  createdAt: string;
  updatedAt: string;
};

type RestaurantStockState = {
  restaurantStocks: StockItem[];
  addRestaurantStocks: (items: StockItem[]) => void;
  updateRestaurantStocks: (id: string, updatedItem: Partial<StockItem>) => void;
  removeRestaurantStocks: (ids: string[]) => void;
  setRestaurantStocks: (items: StockItem[]) => void;
};

export const useRestaurantStockStore = create<RestaurantStockState>((set) => ({
  restaurantStocks: [],

  addRestaurantStocks: (items) =>
    set((state) => ({
      restaurantStocks: [...state.restaurantStocks, ...items],
    })),

  updateRestaurantStocks: (id, updatedItem) =>
    set((state) => ({
      restaurantStocks: state.restaurantStocks.map((item) =>
        item._id === id ? { ...item, ...updatedItem } : item
      ),
    })),

  removeRestaurantStocks: (ids) =>
    set((state) => ({
      restaurantStocks: state.restaurantStocks.filter(
        (item) => !ids.includes(item._id)
      ),
    })),
  setRestaurantStocks: (items) => set({ restaurantStocks: items }),
}));
