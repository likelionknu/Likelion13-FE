import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import '../assets/Mypage.css'

const AdminPage = () => {
  const navigate = useNavigate()
  const { logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'design'>('frontend')

  const handleLogout = () => {
    logout()
    navigate('/') // 로그아웃하면 메인페이지로 이동
    alert('로그아웃합니다')
  }

  return (
    <div className='mypage-container'>
      <div className='mypage-tabs'>
        <h2>관리자 페이지</h2>
        <button
          className={activeTab === 'frontend' ? 'active' : ''}
          onClick={() => setActiveTab('frontend')}
        >
          프론트엔드
        </button>
        <button
          className={activeTab === 'backend' ? 'active' : ''}
          onClick={() => setActiveTab('backend')}
        >
          백엔드
        </button>
        <button
          className={activeTab === 'design' ? 'active' : ''}
          onClick={() => setActiveTab('design')}
        >
          디자인
        </button>

        <br />

        <button onClick={() => navigate('/mypage')}>마이페이지</button>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
      <div className='mypage-contents'>
        {activeTab === 'frontend' && (
          <div className='result-tab'>
            <div className='contents-title'>프론트엔드</div>
            <div>
              <p>프론트엔드 관련 내용</p>
            </div>
          </div>
        )}
        {activeTab === 'backend' && (
          <div className='result-tab'>
            <div className='contents-title'>백엔드</div>
            <div>
              <p>백엔드 관련 내용</p>
            </div>
          </div>
        )}
        {activeTab === 'design' && (
          <div className='result-tab'>
            <div className='contents-title'>디자인</div>
            <div>
              <p>디자인 관련 내용</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage
