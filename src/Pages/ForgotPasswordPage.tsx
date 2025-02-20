import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../assets/ForgotPasswordPage.css'

import Closeeye from '../assets/images/Closeeye.png'
import Openeye from '../assets/images/Openeye.png'

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [verificationMessage, setVerificationMessage] = useState('')
  const [sendResponseMessage, setSendResponseMessage] = useState('')

  const [sendEmailcode, setSendEmailcode] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    newPassword: '',
    newPasswordCheck: '',
  })

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSendVerification = async () => {
    setIsLoading(true)
    setError('')

    setSendEmailcode(true)
    try {
      const url = `https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/send?email=${formData.email}`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setSendResponseMessage(await response.text())
      } else {
        throw new Error('인증번호 전송에 실패했습니다.')
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('인증번호 전송에 실패했습니다.')
      }
      console.error('[이메일 인증 에러]', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerification = async () => {
    setIsLoading(true)
    setError('')
    try {
      const url = `https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/verify?email=${formData.email}&verifyCode=${formData.verificationCode}`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const verificationMessage = await response.text()
        setVerificationMessage(verificationMessage)
        if (verificationMessage === '인증이 완료되었습니다.') {
          setIsEmailVerified(true)
        }
      } else {
        throw new Error('인증 확인에 실패했습니다.')
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('인증 확인에 실패했습니다.')
      }
      console.error('[인증 확인 에러]', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    if (formData.newPassword !== formData.newPasswordCheck) {
      setError('비밀번호가 일치하지 않습니다.')
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.post(
        'https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/password/reset',
        {
          email: formData.email,
          newPassword: formData.newPassword,
          newPasswordCheck: formData.newPasswordCheck,
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 200) {
        setMessage('비밀번호가 성공적으로 재설정되었습니다.')
        navigate('/login')
      } else {
        setError('비밀번호 재설정에 실패했습니다.')
      }
    } catch (err) {
      console.error('[비밀번호 재설정 에러]', err)
      setError('비밀번호 재설정 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h1>비밀번호 찾기</h1>

        <div>
        <div className={`form-container 'fade-in' : 'fade-out'`}>
          {!isEmailVerified ? (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendVerification()
                }}
              >
                <div>
                  <input
                    type='email'
                    name='email'
                    placeholder='기존 이메일'
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {sendResponseMessage && <div style={{color:'blue'}}className='password-message'>{sendResponseMessage}</div>}
                  {error && <div style={{color:'red'}} className='password-error'>{error}</div>}
                </div>

                {!isLoading && !sendEmailcode && (
                  <button
                    type='submit'
                    className='login-button'
                  >
                    인증번호 전송
                  </button>
                )}
                {isLoading && <div style={{color:'blue'}} className='loading-message'>처리 중...</div>}
              </form>

              {sendResponseMessage && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleVerification()
                  }}
                >
                  <div>
                    <input
                      type='text'
                      name='verificationCode'
                      placeholder='인증 코드'
                      value={formData.verificationCode}
                      onChange={handleChange}
                    />
                    {verificationMessage && <div style={{color:'blue'}} className='password-message'>{verificationMessage}</div>}
                    {error && <div style={{color:'red'}} className='password-error'>{error}</div>}
                  </div>

                  <button
                    type='submit'
                    disabled={isLoading}
                    className='login-button'
                  >
                    {isLoading ? '처리 중...' : '인증 코드 확인'}
                  </button>
                </form>
              )}
            </>
          ) : (
            <>
              <div style={{color:'blue'}} className='password-message'>인증이 완료되었습니다. 비밀번호를 재설정하세요.</div>
              <form onSubmit={handleSubmit}>
                <div>
                  <div className='password-input'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name='newPassword'
                      placeholder='새 비밀번호'
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                    <img
                      src={showPassword ? Openeye : Closeeye}
                      alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
                      className='password-toggle-icon'
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  </div>
                  <div className='password-input'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name='newPasswordCheck'
                      placeholder='새 비밀번호 확인'
                      value={formData.newPasswordCheck}
                      onChange={handleChange}
                    />
                  </div>
                  {error && <div className='password-error'>{error}</div>}
                  {message && <div className='password-message'>{message}</div>}
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className='login-button'
                >
                  {isLoading ? '처리 중...' : '비밀번호 재설정'}
                </button>
              </form>
            </>
          )}
          </div>

          <Link
            to='/login'
            className='signup-link'
          >
            <button className='signup-button'>로그인</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
