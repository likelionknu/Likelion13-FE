import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const Nav = () => {
  const { isLoggedIn, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/') // 로그아웃하면 메인페이지로 이동
  }

  return (
    <div style={{ backgroundColor: 'orange' }}>
      <button>
        <Link to='/'>로고 - 메인페이지</Link>
      </button>

      {isLoggedIn ? (
        <button onClick={handleLogout}>로그아웃</button>
      ) : (
        <button>
          <Link to='/login'>로그인</Link>
        </button>
      )}

      {isLoggedIn ? (
        <button>
          <Link to='/mypage'>마이페이지</Link>
        </button>
      ) : (
        <button>
          <Link to='/login'>마이페이지</Link>
        </button>
      )}
    </div>
  )
}

export default Nav
