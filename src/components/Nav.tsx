import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useRef } from 'react'

import axios from 'axios'

import logo1 from '../assets/images/logo1.png'

import '../assets/Nav.css'

const Nav = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { user, isLoggedIn, login, logout } = useAuthStore()
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = user?.token
        if (!token) {
          navigate('/login')
          return
        }

        const response = await axios.post(
          'https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/mypage-view',
          {},
          {
            headers: {
              accept: '*/*',
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        console.log(`Nav - response.data:`, response.data)

        login({
          ...response.data,
          token: token,
          apply: response.data.apply,
        })
      } catch (error) {
        console.error('마이페이지 데이터 로드 실패:', error)
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          alert('인증이 만료되었습니다. 다시 로그인해주세요.')
          logout()
          navigate('/login')
        }
      }
    }

    if (isLoggedIn) {
      fetchUserData()
    }
  }, [isLoggedIn, user?.token, login, logout, navigate])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  

  const handleDropdownClick = (path: string) => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.')
      navigate('/login')
    } else {
      navigate(path)
    }
  }

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
            <div className='nav-title'>LIKELION KNU</div>
          </Link>
        </div>

        <div className='nav-dropdown' ref={dropdownRef}>
          {user?.apply === true ? (
            <button
              className='nav-button'
              onClick={() => navigate('/submit')}
            >
              <span className='nav-link-button'>지원서보기</span>
            </button>
          ) : (
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
                  <div
                    className='dropdown-item'
                    onClick={() => handleDropdownClick('/frontend-question')}
                  >
                    프론트엔드
                  </div>
                  <div
                    className='dropdown-item'
                    onClick={() => handleDropdownClick('/backend-question')}
                  >
                    백엔드
                  </div>
                  <div
                    className='dropdown-item'
                    onClick={() => handleDropdownClick('/design-question')}
                  >
                    디자인
                  </div>
                </div>
              )}
            </button>
          )}
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
