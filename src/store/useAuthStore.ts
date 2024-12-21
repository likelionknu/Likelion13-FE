import { create } from 'zustand'

interface AuthState {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
  testLogin: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  testLogin: () => set({ isLoggedIn: true }),
}))
