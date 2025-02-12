import { create } from 'zustand'

interface User {
  name: string
  department: string
  studentId: string
  grade: string
  phone: string
  email: string
  password: string
  token: string // JWT 토큰
}

interface AuthState {
  isLoggedIn: boolean
  user: User | null
  login: (user: User) => void
  logout: () => void
  testLogin: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => {
    localStorage.removeItem('token') // 로그아웃 시 localStorage의 토큰 제거
    set({ isLoggedIn: false, user: null })
  },
  testLogin: () =>
    set({
      isLoggedIn: true,
      user: {
        name: '테스트',
        department: '테스트 학부',
        studentId: '12345678',
        grade: '1',
        phone: '01012345678',
        email: 'test@kangnam.ac.kr',
        password: '0000',
        token: 'test-token',
      },
    }),
}))
