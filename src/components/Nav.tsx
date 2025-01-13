import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

import logo1 from '../assets/images/logo1.png'

const Nav = () => {
  const { isLoggedIn, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/') // 로그아웃하면 메인페이지로 이동
    alert('로그아웃합니다')
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'orange' }}>
        <Link
          to='/'
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '700px' }}
        >
          <img
            src={logo1}
            alt='멋쟁이사자처럼 로고'
            style={{ height: '140px' }}
          />
          <div>Like Lion KNU</div>
        </Link>

        <button onClick={() => alert('소개를 누르면 어디로 가야하나요?')}>
          <Link to=''>소개</Link>
        </button>

        <button onClick={() => alert('프로젝트 탭이 없어서 일단 여기다가 만들어둠!')}>
          <Link to='/project-introduce'>프로젝트</Link>
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
          <button onClick={() => alert('로그인 먼저 해주세요')}>
            <Link to='/login'>마이페이지</Link>
          </button>
        )}
      </div>
    </div>
  )
}

export default Nav
