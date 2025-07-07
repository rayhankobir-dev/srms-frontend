import { create } from "zustand";
import { ISettings } from "@/types";
import { persist } from "zustand/middleware";

interface SettingStore {
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
}

export const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      settings: {
        tableCount: 0,
        taxPercentage: 0,
        currency: "",
        inventoryInsufficencyAt: 10,
      },
      setSettings: (settings) => set({ settings }),
    }),
    {
      name: "settings",
      partialize: (state) => ({ settings: state.settings }),
      onRehydrateStorage: () => (state) => {
        state?.setSettings(state.settings);
      },
    }
  )
);
