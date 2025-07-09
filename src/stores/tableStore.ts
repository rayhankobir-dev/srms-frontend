import { ITable } from "@/types";
import { create } from "zustand";

type TableStore = {
  tables: ITable[];
  addTable: (item: ITable) => void;
  updateTable: (id: string, updatedItem: Partial<ITable>) => void;
  removeTable: (id: string) => void;
  setTables: (items: ITable[]) => void;
};

export const useTableStore = create<TableStore>((set) => ({
  tables: [],

  addTable: (item) =>
    set((state) => ({
      tables: [...state.tables, item],
    })),

  updateTable: (id, updatedItem) =>
    set((state) => ({
      tables: state.tables.map((item) =>
        item._id === id ? { ...item, ...updatedItem } : item
      ),
    })),

  removeTable: (id) =>
    set((state) => ({
      tables: state.tables.filter((item) => item._id !== id),
    })),

  setTables: (items) => set({ tables: items }),
}));
