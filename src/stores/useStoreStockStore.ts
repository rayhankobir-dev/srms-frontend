import { create } from "zustand"

export interface StoreStockItem {
  _id: string
  itemName: string
  storeIn: number
  storeOut: number
  previous: number
  current: number
  createdAt: string
  updatedAt: string
}

interface StoreStockState {
  storeStocks: StoreStockItem[]
  addStoreStocks: (items: StoreStockItem[]) => void
  updateStoreStock: (id: string, updatedItem: Partial<StoreStockItem>) => void
  removeStoreStocks: (ids: string[]) => void
  setStoreStocks: (items: StoreStockItem[]) => void
}

export const useStoreStockStore = create<StoreStockState>((set) => ({
  storeStocks: [],

  addStoreStocks: (items) =>
    set((state) => ({
      storeStocks: [...state.storeStocks, ...items],
    })),

  updateStoreStock: (id, updatedItem) =>
    set((state) => ({
      storeStocks: state.storeStocks.map((item) =>
        item._id === id ? { ...item, ...updatedItem } : item,
      ),
    })),

  removeStoreStocks: (ids) =>
    set((state) => ({
      storeStocks: state.storeStocks.filter(
        (item) => item._id && !ids.includes(item._id),
      ),
    })),
  setStoreStocks: (items) => set({ storeStocks: items }),
}))
