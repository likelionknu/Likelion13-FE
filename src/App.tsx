import { useEffect } from 'react'
import Router from './routes/Routes'
import { useAuthStore } from './store/useAuthStore'
import axios from 'axios'

function App() {
  const { login } = useAuthStore()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // 토큰이 존재하면 사용자 정보를 가져와서 로그인 상태 복원
      axios
        .post(
          'https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/mypage-view',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            login({
              ...response.data,
              token: token,
            })
          }
        })
        .catch((error) => {
          console.error('로그인 상태 복원 실패:', error)
          localStorage.removeItem('token') // 토큰이 유효하지 않으면 제거
        })
    }
  }, [login])

  return <Router />
}

export default App
