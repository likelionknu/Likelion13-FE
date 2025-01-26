import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import '../assets/SignupPage.css'

const SignupPage = () => {
  const [isCompleted, setIsCompleted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    studentId: '',
    grade: '',
    phone: '',
    email: '',
    verificationCode: '',
    password: '',
    passwordCheck: '',
  })

  const [sendResponseMessage, setSendResponseMessage] = useState('')
  const [verificationMessage, setVerificationMessage] = useState('')

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
    try {
      const url = `http://localhost:8080/api/v1/send?email=${formData.email}&verifyCode=string`
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
      const url = `http://localhost:8080/api/v1/verify?email=${formData.email}&verifyCode=${formData.verificationCode}`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setVerificationMessage(await response.text())
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

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const signUpData = {
        name: formData.name,
        department: formData.department,
        studentId: formData.studentId,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        passwordCheck: formData.passwordCheck,
        grade: formData.grade,
      }

      const response = await fetch('http://localhost:8080/api/v1/sign-up', {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      })

      if (response.ok) {
        alert('회원가입이 완료되었습니다.')
        setIsCompleted(true)
      } else {
        throw new Error('회원가입에 실패했습니다.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.')
      console.error('[회원가입 에러]', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isCompleted) {
    return (
      <div>
        <h1>회원가입이 완료되었습니다!</h1>
        <p>환영합니다, {formData.name}님!</p>
        <button onClick={() => navigate('/')}>메인페이지 구경하기</button>
      </div>
    )
  }

  return (
    <div className='signup-container'>
      <div className='signup-box'>
        <h1>회원가입</h1>

        <form onSubmit={handleSignUp}>
          <div>
            <div>이름</div>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />

            <div>학부</div>
            <input
              type='text'
              name='department'
              value={formData.department}
              onChange={handleChange}
            />

            <div>학번</div>
            <input
              type='text'
              name='studentId'
              value={formData.studentId}
              onChange={handleChange}
            />

            <div>학년</div>
            <input
              type='text'
              name='grade'
              value={formData.grade}
              onChange={handleChange}
            />

            <div>전화번호</div>
            <input
              type='tel'
              name='phone'
              placeholder='010-0000-0000'
              pattern='(010)-\d{4}-\d{4}'
              maxLength={13}
              value={formData.phone}
              onChange={handleChange}
            />

            <div>이메일</div>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              disabled={isEmailVerified}
            />
            <button
              type='button'
              onClick={handleSendVerification}
              disabled={isLoading || isEmailVerified}
            >
              {isLoading ? '전송 중...' : sendResponseMessage ? '재전송' : '인증번호 전송'}
            </button>
            {sendResponseMessage && <div style={{ color: 'green' }}>인증코드 전송 완료</div>}

            {}
            <div>인증번호</div>
            <input
              type='text'
              name='verificationCode'
              value={formData.verificationCode}
              onChange={handleChange}
              disabled={isEmailVerified}
            />
            <button
              type='button'
              onClick={handleVerification}
              disabled={isLoading || isEmailVerified}
            >
              {isLoading ? '인증 중...' : isEmailVerified ? '인증 완료' : '인증 확인'}
            </button>
            {isEmailVerified && <div style={{ color: 'green' }}>인증 완료</div>}

            <div>비밀번호</div>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? '감추기' : '보이기'}
            </button>

            <div>비밀번호 확인</div>
            <input
              type={showPassword ? 'text' : 'password'}
              name='passwordCheck'
              value={formData.passwordCheck}
              onChange={handleChange}
            />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}

          <button
            id='signup-button'
            type='submit'
          >
            회원가입하기
          </button>
        </form>
        
      </div>
    </div>
  )
}

export default SignupPage
