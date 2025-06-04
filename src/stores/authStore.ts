import { create } from "zustand"
import { persist } from "zustand/middleware"

type Role = "ADMIN" | "MANAGER" | "STUFF"

type User = {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: Role
  createdAt: string
  updatedAt: string
}

type AuthStore = {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
  hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)
