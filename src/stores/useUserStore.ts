import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  _id: string
  firstName: string
  lastName?: string
  email: string
  phone: string
  address: string
  role: string
  createdAt: string
  updatedAt: string
}

interface UserStore {
  users: User[]
  addUser: (user: User) => void
  updateUser: (id: string, updatedUser: Partial<User>) => void
  removeUser: (id: string) => void
  setUsers: (users: User[]) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],

      addUser: (user) => {
        const newUser = { ...user, _id: crypto.randomUUID() }
        set({ users: [...get().users, newUser] })
      },

      updateUser: (id, updatedUser) => {
        set({
          users: get().users.map((u) =>
            u._id === id ? { ...u, ...updatedUser } : u,
          ),
        })
      },

      removeUser: (id) => {
        set({
          users: get().users.filter((u) => u._id !== id),
        })
      },

      setUsers: (users) => {
        set({ users })
      },
    }),
    {
      name: "user-store",
    },
  ),
)
