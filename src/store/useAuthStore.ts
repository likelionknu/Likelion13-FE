import { create } from 'zustand'

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
  
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (user) => {
    localStorage.setItem('token', user.token) // 로그인 시 localStorage에 토큰 저장
    set({ isLoggedIn: true, user })},
  logout: () => {
    localStorage.removeItem('token') // 로그아웃 시 localStorage의 토큰 제거
    set({ isLoggedIn: false, user: null })
  },
}))
