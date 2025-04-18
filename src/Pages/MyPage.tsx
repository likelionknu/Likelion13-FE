import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import ResultModal from '../components/ResultModal'
import axios from 'axios'
import '../assets/Mypage.css'
import confetti from 'canvas-confetti'

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    if (resultStatus === 'PASS') {
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => setIsModalOpen(false)

  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const { login, logout } = useAuthStore()
  const [resultStatus, setResultStatus] = useState<string | null>(null)

  const [showPassword, setShowPassword] = useState(false)

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
  // 결과보기 탭 전환 시 firework 호출하도록 수정
  const handleResultTabClick = () => {
    setActiveTab('result')
    if (resultStatus === 'PASS') {
      firework()
    }
  }

  function firework() {
    const duration = 15 * 100
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      // confetti 함수 호출 - canvas-confetti 라이브러리의 함수
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      )
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      )
    }, 250)
  }
  // 계정 삭제
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('정말 계정을 삭제하시겠습니까?')
    if (!confirmDelete) return

    try {
      const jwtToken = localStorage.getItem('token')

      const response = await axios.delete('https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/delete-account', {
        data: jwtToken,
      })

      if (response.status === 200) {
        alert('계정이 삭제되었습니다.')
        logout() // 로그아웃 처리
        navigate('/') // 메인 페이지로 이동
      }
    } catch (error) {
      // console.error('계정 삭제 실패:', error)
      if (axios.isAxiosError(error) && error.response) {
        // console.error('API 오류 응답:', error.response)
        alert(`삭제 실패: ${error.response.data.message || error.response.data}`)
      } else {
        alert('알 수 없는 오류가 발생했습니다.')
      }
    }
  }

  // 정보 수정
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      const token = user?.token || localStorage.getItem('token')
      const response = await axios.put(
        'https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/mypage-update',
        {
          department: formData.department,
          password: formData.password,
          passwordCheck: formData.passwordConfirm,
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
          } else {
            alert(`${errorMessage} - from backend API`)
          }
        } else {
          alert('정보 수정에 실패했습니다.')
        }
      }
      // console.error('정보 수정 실패:', error)
    }
  }

  // 유저 정보 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Zustand store나 localStorage에서 토큰 가져오기
        const token = user?.token || localStorage.getItem('token')

        if (!token) {
          navigate('/login')
          return
        }

        const response = await axios.post(
          'https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/mypage-view',
          {}, // empty body
          {
            headers: {
              accept: '*/*',
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        // // console.log('마이페이지 데이터:', response.data)

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
        // console.error('마이페이지 데이터 로드 실패:', error)
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          alert('인증이 만료되었습니다. 다시 로그인해주세요.')
          logout()
          navigate('/login')
        }
      }
    }

    fetchUserData()
  }, [user?.token, login, logout, navigate])

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch('https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/check-pass-fail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`,
          },
        })
        if (!response.ok) throw new Error('API 요청 실패')

        const data = await response.json()
        setResultStatus(data.resultStatus)
      } catch (error) {
        // console.error('결과를 불러오는 중 오류 발생:', error);
      }
    }

    if (user?.token) fetchResult()
  }, [user?.token])

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
            onClick={handleResultTabClick}
            // onClick={() => alert('서류합격결과는 3/15~3/16일에 공지됩니다.')}
            // 3/16일에 주석 풀기
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
              <div className='password-input'>
                <div>비밀번호 변경</div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='비밀번호'
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete='new-password'
                />

                <button
                  type='button'
                  className='password-toggle-button'
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? '숨기기' : '보이기'}
                </button>
              </div>
              <div>
                <div>비밀번호 확인</div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='passwordConfirm'
                  placeholder='비밀번호 확인'
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  autoComplete='new-password'
                />
              </div>

              <button type='submit'>수정하기</button>

              <button
                type='button'
                className='delete-account-btn'
                onClick={handleDeleteAccount}
              >
                계정 지우기
              </button>
            </form>
          </div>
        ) : (
          <div className='result-tab'>
            <div className='contents-title'>결과 보기</div>
            <div
              className={`passing-result-container ${resultStatus === 'PASS' ? 'confetti' : ''}`}
              onClick={handleOpenModal}
              style={{
                cursor: resultStatus === 'PASS' ? 'pointer' : 'default',
              }}
            >
              <div className='pass-name'>{user?.name}</div>
              {resultStatus === 'PASS' ? (
                <div
                  className='pass'
                  style={{ color: '#4A7EDC' }}
                >
                  합격
                </div>
              ) : resultStatus === 'FAIL' ? (
                <div
                  className='pass-x'
                  style={{ color: '#FF3232' }}
                >
                  불합격
                </div>
              ) : (
                <div
                  className='pass-hold'
                  style={{ color: 'orange' }}
                >
                  보류
                </div>
              )}
            </div>

            {isModalOpen && (
              <ResultModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyPage
