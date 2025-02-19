import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

import axios from 'axios'

import '../assets/AdminPage.css'

const AdminPage = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'design'>('frontend')
  const [frontendData, setFrontendData] = useState([])
  const [backendData, setBackendData] = useState([])
  const [designData, setDesignData] = useState([])

  const handleLogout = () => {
    logout()
    navigate('/') // 로그아웃하면 메인페이지로 이동
    alert('로그아웃합니다')
  }

  useEffect(() => {
    viewFrontend()
  }, [])

  const viewFrontend = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/admin/frontend/submit', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      })

      console.log(`response_front`, response)

      if (response.status === 200) {
        setFrontendData(response.data)
      } else {
        console.error('프론트엔드 데이터 로드 실패:', response.status)
      }
    } catch (error) {
      console.error('프론트엔드 데이터 로드 실패:', error)
    }
  }

  const viewBackend = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/admin/backend/submit', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      })

      console.log(`response_backend`, response)

      if (response.status === 200) {
        setBackendData(response.data)
      } else {
        console.error('백엔드 데이터 로드 실패:', response.status)
      }
    } catch (error) {
      console.error('백엔드 데이터 로드 실패:', error)
    }
  }

  const viewDesign = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/admin/design/submit', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      })

      console.log(`response_Design`, response)

      if (response.status === 200) {
        setDesignData(response.data)
      } else {
        console.error('디자인 데이터 로드 실패:', response.status)
      }
    } catch (error) {
      console.error('디자인 데이터 로드 실패:', error)
    }
  }

  return (
    <div className='mypage-container'>
      <div className='mypage-tabs'>
        <h2>관리자 페이지</h2>
        <button
          className={activeTab === 'frontend' ? 'active' : ''}
          onClick={() => {
            setActiveTab('frontend')
            viewFrontend()
          }}
        >
          프론트엔드
        </button>
        <button
          className={activeTab === 'backend' ? 'active' : ''}
          onClick={() => {
            setActiveTab('backend')
            viewBackend()
          }}
        >
          백엔드
        </button>
        <button
          className={activeTab === 'design' ? 'active' : ''}
          onClick={() => {
            setActiveTab('design')
            viewDesign()
          }}
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
              {frontendData.length > 0 ? (
                <div>
                  {frontendData.map((item: any) => (
                    <div
                      key={item.studentId}
                      className='result-items'
                    >
                      <div className='items-name'>
                        {item.name}
                        <div className='items-info'>
                          {item.department}, {item.studentId}, {item.phoneNumber}
                        </div>
                      </div>

                      <div
                        className='items-result'
                        style={{
                          color: item.resultStatus === 'PASS' ? '#4A7EDC' : item.resultStatus == 'FAIL' ? '#FF3232' : 'orange',
                        }}
                      >
                        {item.resultStatus}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>프론트엔드 관련 내용이 없습니다.</p>
              )}
            </div>
          </div>
        )}
        {activeTab === 'backend' && (
          <div className='result-tab'>
            <div className='contents-title'>백엔드</div>
            <div>
              {backendData.length > 0 ? (
                <div>
                  {backendData.map((item: any) => (
                    <div
                      key={item.studentId}
                      className='result-items'
                    >
                      <div className='items-name'>
                        {item.name}
                        <div className='items-info'>
                          {item.department}, {item.studentId}, {item.phoneNumber}
                        </div>
                      </div>

                      <div
                        className='items-result'
                        style={{
                          color: item.resultStatus === 'PASS' ? 'blue' : item.resultStatus == 'FAIL' ? 'red' : 'yellow',
                        }}
                      >
                        {item.resultStatus}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>백엔드 관련 내용이 없습니다.</p>
              )}
            </div>
          </div>
        )}
        {activeTab === 'design' && (
          <div className='result-tab'>
            <div className='contents-title'>디자인</div>
            <div>
              {designData.length > 0 ? (
                <div>
                  {designData.map((item: any) => (
                    <div
                      key={item.studentId}
                      className='result-items'
                    >
                      <div className='items-name'>
                        {item.name}
                        <div className='items-info'>
                          {item.department}, {item.studentId}, {item.phoneNumber}
                        </div>
                      </div>

                      <div className='items-result'>{item.resultStatus}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>디자인 관련 내용이 없습니다.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage
