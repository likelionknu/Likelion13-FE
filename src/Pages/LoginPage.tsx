import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const LoginPage = () => {
  const { isLoggedIn, logout, testLogin } = useAuthStore()
  const navigate = useNavigate()

  const handleTestLogin = () => {
    alert('테스트 로그인 성공, 메인페이지로 이동할게요')
    testLogin()
    navigate('/')
  }

  return (
    <div>
      <h1>로그인 페이지</h1>

      <div>강남대학교 멋쟁이 사자처럼에 오신걸 환영해요!</div>

      {isLoggedIn ? (
        <div>
          <h2>Login Success</h2>
          <button onClick={logout}>로그아웃 할래요</button>
        </div>
      ) : (
        <div>
          <div>
            <input
              type='text'
              placeholder='아이디'
            />
            <input
              type='password'
              placeholder='비밀번호'
            />
          </div>

          <button
            onClick={() => {
              alert('로그인 기능 미구현 - /store/useAuthStore.ts 파일을 확인해봐요')
            }}
          >
            로그인 할래요
          </button>
          <Link to='/signup'>
            <button>회원가입 할래요</button>
          </Link>

          <br />
          <button onClick={handleTestLogin}>테스트로그인 할래요</button>
        </div>
      )}
    </div>
  )
}

export default LoginPage
