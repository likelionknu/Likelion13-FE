import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SignUpCompleteModal from '../components/SignUpCompleteModal'

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
    phone: '',
    email: '',
    verificationCode: '',
    password: '',
    passwordCheck: '',
    grade: '',
  })

  const [sendResponseMessage, setSendResponseMessage] = useState('')

  const navigate = useNavigate()

  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSendVerification = async () => {
    if (formData.email.substring(formData.email.length - 13) !== 'kangnam.ac.kr') {
      return setError('kangnam.ac.kr 형식의 이메일을 입력해주세요.')
    }
    setIsLoading(true)
    setError('')

    try {
      const url = `https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/send?email=${formData.email}&verifyCode=string`
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
    if (!formData.verificationCode) {
      setError('인증번호를 입력해주세요.')
      return
    }

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

      const responseText = await response.text()
      console.log(`responseText ${responseText}`)

      if (response.ok && responseText === '인증이 완료되었습니다.') {
        setIsEmailVerified(true)
      } else {
        throw new Error('인증 확인에 실패했습니다.')
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(`인증 확인 에러: ${err.message}`)
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

    // 학번이 8자리가 아니면
    if (formData.studentId.length !== 9) {
      setError('학번은 9자리여야 합니다.')
      setIsLoading(false)
      return
    }

    // 학년이 1,2,3,4 가 아니면
    if (formData.grade !== '1' && formData.grade !== '2' && formData.grade !== '3' && formData.grade !== '4') {
      setError('학년은 1, 2, 3, 4 중 하나여야 합니다.')
      setIsLoading(false)
      return
    }

    // 전화번호가 11자리가 아니면
    if (formData.phone.length !== 11) {
      setError('전화번호는 11자리여야 합니다.')
      setIsLoading(false)
      return
    }

    // 유효성 검사
    if (!formData.name || !formData.department || !formData.studentId || !formData.phone || !formData.email || !formData.password || !formData.passwordCheck || !formData.grade) {
      setError('모든 항목을 입력해주세요.')
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.passwordCheck) {
      setError('비밀번호가 일치하지 않습니다.')
      setIsLoading(false)
      return
    }

    if (!isEmailVerified) {
      setError('이메일 인증을 완료해주세요.')
      setIsLoading(false)
      return
    }

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
        apply: false,
      }

      const response = await fetch('https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/sign-up', {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      })

      const responseText = await response.text()

      if (response.ok) {
        // 회원가입 성공 시 모달 표시
        setIsCompleted(true)
        setIsFirstModalOpen(true)
        return
      }

      // 에러 처리
      if (response.status === 400) {
        if (responseText.includes('중복')) {
          setError('이미 존재하는 정보입니다.')
        } else if (responseText.includes('비밀번호')) {
          setError('비밀번호가 일치하지 않습니다.')
        } else {
          setError(responseText)
        }
      } else if (response.status === 500) {
        console.error('서버 에러 상세:', responseText)
        setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      } else {
        setError(responseText || '회원가입에 실패했습니다.')
      }
    } catch (err) {
      console.error('[회원가입 에러]', err)
      if (!error) {
        setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleFirstModalClose = () => {
    setIsFirstModalOpen(false)
    navigate('/') // 메인으로 이동동
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
              autoComplete='off'
            />
            <div>학부</div>
            <input
              type='text'
              name='department'
              value={formData.department}
              onChange={handleChange}
              autoComplete='off'
            />
            <div>학번</div>
            <input
              type='text'
              name='studentId'
              value={formData.studentId}
              onChange={handleChange}
              autoComplete='off'
            />

            <div>학년</div>
            <input
              type='int'
              name='grade'
              placeholder='0'
              value={formData.grade}
              onChange={handleChange}
              autoComplete='off'
            />

            <div>전화번호</div>
            <input
              type='tel'
              name='phone'
              placeholder='01000000000'
              maxLength={11}
              value={formData.phone}
              onChange={handleChange}
              autoComplete='off'
            />
            <div>이메일</div>
            <input
              type='email'
              name='email'
              placeholder='likelion@kangnam.ac.kr'
              value={formData.email}
              onChange={handleChange}
              disabled={isEmailVerified}
              autoComplete='off'
            />
            <button
              type='button'
              onClick={handleSendVerification}
              disabled={isLoading || isEmailVerified}
            >
              {/* || formData.email.substring(formData.email.length - 13) !== 'kangnam.ac.kr' */}
              {isLoading ? '전송 중...' : sendResponseMessage ? '재전송' : '인증번호 전송'}
            </button>

            {sendResponseMessage && <div style={{ color: 'green' }}>인증코드 전송 완료</div>}
            <div>인증번호</div>
            <input
              type='text'
              name='verificationCode'
              value={formData.verificationCode}
              onChange={handleChange}
              disabled={isEmailVerified}
              autoComplete='off'
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
              autoComplete='new-password'
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
              autoComplete='new-password'
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

        {isCompleted ? (
          <SignUpCompleteModal
            isOpen={isFirstModalOpen}
            title='회원가입이 완료되었어요!'
            message='메인 페이지로 구경하러 가볼까요?'
            onSubmit={handleFirstModalClose}
            onClose={() => setIsFirstModalOpen(false)}
          />
        ) : null}
      </div>
    </div>
  )
}

export default SignupPage
