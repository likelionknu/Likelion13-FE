import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

const MyPage = () => {
  const [activeTab, setActiveTab] = useState<'edit' | 'result'>('edit')

  const user = useAuthStore((state) => state.user)
  console.log('user:', user) // user 정보 확인

  const EditTab = () => (
    <div>
      <h2>정보 수정</h2>
      <form>
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
        </div>
        <button type='submit'>저장하기</button>
      </form>
    </div>
  )

  const ResultTab = () => (
    <div>
      <h2>지원 결과</h2>
      <div>
        <p>합격</p>
        <p>불합격</p>
      </div>
    </div>
  )

  return (
    <div>
      <h1>마이페이지</h1>
      <div>
        <button onClick={() => setActiveTab('edit')}>수정하기</button>
        <button onClick={() => setActiveTab('result')}>결과보기</button>
      </div>

      {activeTab === 'edit' ? <EditTab /> : <ResultTab />}
    </div>
  )
}

export default MyPage
