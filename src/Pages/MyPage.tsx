import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import axios from 'axios'

import '../assets/Mypage.css'

const MyPage = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const { login, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/') // 로그아웃하면 메인페이지로 이동
    alert('로그아웃합니다')
  }

  const [activeTab, setActiveTab] = useState<'edit' | 'result'>('edit')

  const [formData, setFormData] = useState({
    name: '',
    department: '',
    studentId: '',
    grade: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  })

  const [isAdmin, setIsAdmin] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      const token = user?.token || localStorage.getItem('token')
      const response = await axios.put(
        'http://localhost:8080/api/v1/mypage-update',
        {
          name: formData.name,
          department: formData.department,
          studentId: formData.studentId,
          phone: formData.phone,
          password: formData.password,
          passwordCheck: formData.passwordConfirm,
          grade: formData.grade,
        },
        {
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 200) {
        alert('정보가 성공적으로 수정되었습니다.')
        // 수정된 정보로 상태 업데이트
        login({
          ...response.data,
          token: token,
        })
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          const errorMessage = error.response.data
          if (errorMessage === '기존 비밀번호와 같습니다.') {
            alert('기존 비밀번호와 같은 비밀번호는 사용할 수 없습니다.')
          }
          // else if (errorMessage.includes('비워둘 수 없습니다')) {
          //   alert('모든 필수 항목을 입력해주세요.')
          // }
          // else if (errorMessage.includes('중복됩니다')) {
          //   alert('이미 사용 중인 학번 또는 전화번호입니다.')
          // }
          else {
            alert(`${errorMessage}`)
          }
        } else {
          alert('정보 수정에 실패했습니다.')
        }
      }
      console.error('정보 수정 실패:', error)
    }
  }

  useEffect(() => {
    console.log('유저정보 호출')
    const fetchUserData = async () => {
      try {
        // Zustand store나 localStorage에서 토큰 가져오기
        const token = user?.token || localStorage.getItem('token')

        if (!token) {
          navigate('/login')
          return
        }

        const response = await axios.post(
          'http://localhost:8080/api/v1/mypage-view',
          {}, // empty body
          {
            headers: {
              accept: '*/*',
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        console.log('마이페이지 데이터:', response.data)

        // 관리자 여부 확인
        if (response.data.role === 'ADMIN') {
          setIsAdmin(true)
        }

        if (response.status === 200) {
          // 받아온 사용자 정보로 formData 업데이트
          setFormData((prev) => ({
            ...prev,
            name: response.data.name,
            department: response.data.department,
            studentId: response.data.studentId,
            grade: response.data.grade,
            phone: response.data.phone,
            password: '',
            passwordConfirm: '',
          }))

          // Zustand store 업데이트
          login({
            ...response.data,
            token: token,
          })
        }
      } catch (error) {
        console.error('마이페이지 데이터 로드 실패:', error)
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          alert('인증이 만료되었습니다. 다시 로그인해주세요.')
          logout()
          navigate('/login')
        }
      }
    }

    fetchUserData()
  }, [user?.token, login, logout, navigate])

  return (
    <div className='mypage-container'>
      <div className='mypage-tabs'>
        <h2>마이페이지</h2>
        <button
          className={activeTab === 'edit' ? 'active' : ''}
          onClick={() => setActiveTab('edit')}
        >
          수정하기
        </button>
        {isAdmin ? (
          <button
            className={activeTab === 'result' ? 'active' : ''}
            onClick={() => navigate('/admin')}
          >
            관리자페이지
          </button>
        ) : (
          <button
            className={activeTab === 'result' ? 'active' : ''}
            onClick={() => setActiveTab('result')}
          >
            결과보기
          </button>
        )}

        <button onClick={handleLogout}>로그아웃</button>
      </div>
      <div className='mypage-contents'>
        {activeTab === 'edit' ? (
          <div>
            <div className='contents-title'>정보 수정</div>
            <form
              className='edit-form'
              onSubmit={handleSubmit}
            >
              {/* 이름, 학년, 전화번호, 이메일 수정 불가가*/}
              <div>
                <div>이름</div>
                <input
                  type='text'
                  name='name'
                  placeholder='이름'
                  value={user?.name}
                  readOnly={true} // 수정 불가
                  style={{ backgroundColor: '#f0f0f0' }}
                />
              </div>
              <div>
                <div>학부</div>
                <input
                  type='text'
                  name='department'
                  placeholder='학부'
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div>학번</div>
                <input
                  type='text'
                  name='studentId'
                  placeholder='학번'
                  value={formData.studentId}
                  readOnly={true} // 학번 수정 불가
                  style={{ backgroundColor: '#f0f0f0' }}
                />
              </div>
              <div>
                <div>학년</div>
                <input
                  type='text'
                  name='grade'
                  placeholder='학년'
                  value={formData.grade}
                  readOnly={true} // 학년 수정 불가
                  style={{ backgroundColor: '#f0f0f0' }}
                />
              </div>
              <div>
                <div>전화번호</div>
                <input
                  type='tel'
                  name='phone'
                  placeholder='01000000000'
                  maxLength={11}
                  value={formData.phone}
                  readOnly={true} // 전화번호 수정 불가
                  style={{ backgroundColor: '#f0f0f0' }}
                />
              </div>
              <div>
                <div>이메일</div>
                <input
                  type='text'
                  name='email'
                  placeholder='이메일'
                  value={user?.email}
                  readOnly={true} // 수정 불가
                  style={{ backgroundColor: '#f0f0f0' }}
                />
              </div>
              <div>
                <div>비밀번호 변경</div>
                <input
                  type='password'
                  name='password'
                  placeholder='비밀번호'
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete='new-password'
                />
              </div>
              <div>
                <div>비밀번호 확인</div>
                <input
                  type='password'
                  name='passwordConfirm'
                  placeholder='비밀번호 확인'
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  autoComplete='new-password'
                />
              </div>

              <button type='submit'>수정하기</button>
            </form>
          </div>
        ) : (
          //  결과보기 탭
          <div className='result-tab'>
            <div className='contents-title'>결과 보기</div>
            <div className='passing-result-container'>
              <div className='pass-name'>{user?.name}</div>
              {user?.apply ? <div className='pass'>합격</div> : <div className='pass-x'>불합격</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyPage
