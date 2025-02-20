import { create } from 'zustand'
import { persist } from "zustand/middleware"

interface User {
  name: string
  department: string
  part?: string // 지원 분야
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
  fetchUserPart: (studentId: string) => Promise<void>
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
      fetchUserPart: async (studentId) => {
        const baseUrl = "https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/form"
        const parts = ["frontend", "backend", "design"]
    
        try {
          for (const part of parts) {
            const response = await fetch(`${baseUrl}/${part}/view?studentId=${studentId}`)
            
            if (response.ok) {
              const data = await response.json()
              if (data && data.apply === true) { 
                set((state) => ({
                  user: state.user ? { ...state.user, part } : null,
                }))
                return
              }
            }
          }
          
        } catch (error) {
          console.error('지원 분야 조회 오류:', error)
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