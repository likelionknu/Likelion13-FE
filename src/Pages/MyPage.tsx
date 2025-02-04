import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

import '../assets/Mypage.css'

const MyPage = () => {
  const [activeTab, setActiveTab] = useState<'edit' | 'result'>('edit')

  const user = useAuthStore((state) => state.user)
  console.log('user:', user) // user 정보 확인

  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/') // 로그아웃하면 메인페이지로 이동
    alert('로그아웃합니다')
  }

  const EditTab = () => (
    <div>
      <div className='contents-title'>정보 수정</div>

      <form className='edit-form'>
        <div>
          <div>이름</div>
          <input
            type='text'
            name='name'
            placeholder='이름'
            autoComplete='name'
            value={user?.name || ''}
            readOnly={true} // 수정 불가
          />
        </div>
        <div>
          <div>학부</div>
          <input
            type='text'
            name='department'
            placeholder='학부'
            autoComplete='organization'
            value={user?.department || ''}
            readOnly={true} // 수정 불가
          />
        </div>
        <div>
          <div>학번</div>
          <input
            type='text'
            name='studentId'
            placeholder='학번'
            autoComplete='off'
            value={user?.studentId || ''}
            readOnly={true} // 수정 불가
          />
        </div>
        <div>
          <div>학년</div>
          <input
            type='text'
            name='grade'
            placeholder='학년'
            autoComplete='off'
            value={user?.grade || ''}
            readOnly={true} // 수정 불가
          />
        </div>
        <div>
          <div>전화번호</div>
          <input
            type='tel'
            name='phone'
            placeholder='01000000000'
            maxLength={11}
            autoComplete='tel'
          />
        </div>
        <div>
          <div>이메일</div>
          <input
            type='email'
            name='email'
            placeholder='이메일'
            autoComplete='email'
            value={user?.email || ''}
            readOnly={true} // 수정 불가
          />
        </div>
        <div>
          <div>비밀번호 변경</div>
          <input
            type='password'
            name='password'
            placeholder='비밀번호'
            autoComplete='new-password'
          />
        </div>
        <div>
          <div>비밀번호 확인</div>
          <input
            type='password'
            name='passwordConfirm'
            placeholder='비밀번호 확인'
            autoComplete='new-password'
          />
        </div>
        <button type='submit'>수정하기</button>
      </form>
    </div>
  )

  const ResultTab = () => (
    <div className='result-tab'>
      <div className='contents-title'>지원 결과</div>
      <div>
        <p>합격?</p>
        <p>불합격?</p>
      </div>
    </div>
  )

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
        <button
          className={activeTab === 'result' ? 'active' : ''}
          onClick={() => setActiveTab('result')}
        >
          결과보기
        </button>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
      <div className='mypage-contents'>{activeTab === 'edit' ? <EditTab /> : <ResultTab />}</div>
    </div>
  )
}

export default MyPage
