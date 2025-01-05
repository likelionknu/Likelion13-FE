import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const SignupPage = () => {
  const [isCompleted, setIsCompleted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    studentId: '',
    grade: '',
    phone: '',
    email: '',
    verificationCode: '',
    password: '',
    passwordConfirm: '',
  })
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // test code
    alert('임시 회원가입 성공 - 폼 데이터 콘솔로 확인해주세요')
    console.log('회원가입 폼 데이터:', JSON.stringify(formData))
    login({
      name: formData.name,
      department: formData.department,
      studentId: formData.studentId,
      grade: formData.grade,
      phone: formData.phone,
      email: formData.email,
    })
    setIsCompleted(true)
    // test code

    // try {
    //   const response = await fetch('백엔드URL/signup', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   })

    //   if (response.ok) {
    //     alert('회원가입 성공!')
    //     login({
    //       name: formData.name,
    //       department: formData.department,
    //       studentId: formData.studentId,
    //       grade: formData.grade,
    //       phone: formData.phone,
    //       email: formData.email,
    //     })
    //   }
    // } catch (error) {
    //   console.error('회원가입 실패:', error)
    //   alert('회원가입에 실패했습니다.')
    // }
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
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
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
          />
          <button type='button'>인증번호 전송</button>

          <div>인증번호</div>
          <input
            type='text'
            name='verificationCode'
            value={formData.verificationCode}
            onChange={handleChange}
          />

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
            {showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
          </button>

          <div>비밀번호 확인</div>
          <input
            type={showPassword ? 'text' : 'password'}
            name='passwordConfirm'
            value={formData.passwordConfirm}
            onChange={handleChange}
          />

          <div>
            <button type='submit'>회원가입하기</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignupPage
