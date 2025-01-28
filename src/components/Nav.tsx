import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

import logo1 from '../assets/images/logo1.png'
import '../assets/Nav.css'

const Nav = () => {
  

  const { isLoggedIn } = useAuthStore()

  return (
    <div>
      <div className='nav-container'>
        <Link
          to='/'
          className='nav-link'
        >
          <img
            src={logo1}
            alt='멋쟁이사자처럼 로고'
            className='nav-logo'
          />
          <div className='nav-title'>LIKE LION KNU</div>
        </Link>

        <button
          className='nav-button'
          onClick={() => alert('소개를 누르면 어디로 가야하나요?')}
        >
          <Link
            className='nav-link-button'
            to=''
          >
            소개
          </Link>
        </button>

        <button
          className='nav-button'
          onClick={() => ''}
        >
          <Link
            className='nav-link-button'
            to='/project-introduce'
          >
            프로젝트
          </Link>
        </button>

        {isLoggedIn ? (
          <>
            <button className='nav-button'>
              <Link
                className='nav-link-button'
                to='/mypage'
              >
                마이페이지
              </Link>
            </button>
          </>
        ) : (
          <button className='nav-button'>
            <Link
              className='nav-link-button'
              to='/login'
            >
              로그인
            </Link>
          </button>
        )}
      </div>
    </div>
  )
}

export default Nav
