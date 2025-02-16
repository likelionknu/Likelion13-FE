import { create } from 'zustand'
import { persist } from "zustand/middleware"

interface User {
  name: string
  department: string
  studentId: string
  grade: string
  phone: string
  email: string
  password: string
  apply: boolean
  token: string // JWT 토큰
}

interface AuthState {
  isLoggedIn: boolean
  user: User | null
  login: (user: User) => void
  logout: () => void
  checkAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (user) => set({ isLoggedIn: true, user }),
      logout: () => {
        localStorage.removeItem('token') 
        set({ isLoggedIn: false, user: null })},
      checkAuth: () => {
        const storedData = localStorage.getItem("auth-storage");
        if (storedData) {
          const parsedData = JSON.parse(storedData); 
          if (parsedData?.user) {
            set({ isLoggedIn: true, user: parsedData.user });
          }
        }
      },
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name: string) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name: string, value: any) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
