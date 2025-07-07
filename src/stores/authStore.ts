import { User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

type AuthStore = {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: Cookies.get("token") || null,
      setUser: (user) => set({ user }),
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      hasHydrated: false,
      setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
