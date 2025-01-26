import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import axios, { AxiosError } from 'axios'

import Closeeye from '../assets/images/Closeeye.png'
import Openeye from '../assets/images/Openeye.png'

import '../assets/LoginPage.css'

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { testLogin, login } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await axios.post('http://localhost:8080/api/v1/login', formData, {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
      })

      console.log('[로그인 응답]', response.data)

      // JWT 토큰 저장
      localStorage.setItem('token', response.data.token)

      // 로그인 상태 업데이트
      login({
        email: formData.email,
        password: formData.password,
        name: response.data.name || '',
        department: response.data.department || '',
        studentId: response.data.studentId || '',
        grade: response.data.grade || '',
        phone: response.data.phone || '',
      })

      navigate('/')
    } catch (err) {
      console.error('[로그인 에러]', err)
      if (axios.isAxiosError(err)) {
        setError((err as AxiosError<{ message: string }>).response?.data?.message || '로그인에 실패했습니다.')
      } else {
        setError('로그인 중 오류가 발생했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestLogin = () => {
    testLogin()
    alert('테스트 로그인 성공')
    navigate('/')
  }

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h1>
          강남대학교 멋쟁이사자처럼에 <br />
          오신걸 환영해요!
        </h1>

        <div>
          <form onSubmit={handleLogin}>
            <div>
              <input
                type='email'
                name='email'
                placeholder='이메일'
                value={formData.email}
                onChange={handleChange}
              />
              <div className='password-input'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='비밀번호'
                  value={formData.password}
                  onChange={handleChange}
                />
                <img
                  src={showPassword ? Closeeye : Openeye}
                  alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
                  className='password-toggle-icon'
                  onClick={() => setShowPassword((prev) => !prev)}
                />
                {error && <div className='password-error'>{error}</div>}
              </div>
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='login-button'
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
            
          </form>

          <Link
            to='/signup'
            className='signup-link'
          >
            <button className='signup-button'>회원가입</button>
          </Link>


          <button onClick={handleTestLogin}>테스트로그인</button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
