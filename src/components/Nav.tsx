import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

import logo1 from '../assets/images/logo1.png'
import '../assets/Nav.css'

const Nav = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { isLoggedIn } = useAuthStore()

  return (
    <div>
      <div className='nav-container'>
        
        <div className='nav-logo-container'>
          <Link
            to='/'
            className='nav-logo-link'
          >
            <img
              src={logo1}
              alt='메인페이지로 이동'
              className='nav-logo'
            />
            <div className='nav-title'>LIKE LION KNU</div>
          </Link>
        </div>

        <div className='nav-dropdown'>
          <button
            className='nav-button'
            onClick={() => setShowDropdown((prev) => !prev)}
            // onMouseEnter={() => setShowDropdown(true)}
            // onMouseLeave={() => setShowDropdown(false)}
            // 마우스 호버시 드롭다운 메뉴 표시 or 클릭시 드롭다운 메뉴 표시
          >
            <span className='nav-link-button'>지원하기</span>
            {showDropdown && (
              <div className='dropdown-content'>
                <Link
                  to='/frontend-question'
                  className='dropdown-item'
                >
                  프론트엔드
                </Link>
                <Link
                  to='/backend-question'
                  className='dropdown-item'
                >
                  백엔드
                </Link>
                <Link
                  to='/design-question'
                  className='dropdown-item'
                >
                  디자인
                </Link>
              </div>
            )}
          </button>
        </div>

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
