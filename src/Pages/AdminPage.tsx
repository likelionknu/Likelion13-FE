import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

import axios from 'axios'

import styles from '../assets/AdminPage.module.css'

import '../assets/AdminPage.css'

const AdminPage = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'design'>('frontend')

  const [frontendData, setFrontendData] = useState([])
  const [backendData, setBackendData] = useState([])
  const [designData, setDesignData] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const [comment, setComment] = useState('')

  const questions_frontend = [
    'Q. 동아리에 지원하게 된 이유를 작성해주세요.',
    'Q. 본인의 성격에서 장점과 단점을 작성해주세요.',
    'Q. 본인이 속한 조직에서 갈등 상황을 해결한 경험을 알려주세요. 만약 동아리 내에서 갈등 상황이 생긴다면 어떻게 대처할 것인지 알려주세요.',
    'Q. 본인이 가장 몰입했던 경험과 그에 따른 결과를 알려주세요. (코딩 관련이 아니어도 됨)',
    'Q. 세가지 파트 중 프론트엔드에 지원한 동기를 알려주세요.',
    'Q. 프론트엔드에 관심을 가지게 된 계기는 무엇인가요?',
    'Q. 본인이 사용하고 있는 프론트엔드 기술 스택은 무엇인가요?',
    'Q. 새로운 기술이나 도구를 학습할 때 주로 어떤 방식을 사용하시나요?',
    'Q. 프론트엔드관련 자신이 참여한 프로젝트를 자세히 설명해주세요. (없다면 공부했던 것, 동아리에서 어떤 프로젝트를 하고싶은지 알려주세요.)',
  ]

  const questions_backend = [
    'Q. 다양한 동아리 중 멋쟁이사자처럼에 지원하게 된 이유는 무엇인가요?',
    'Q. 자신의 성격에서 강점과 보완해야 할 점을 이야기해주세요. ',
    'Q. 최근 가장 몰입했던 경험을 구체적으로 설명해주세요. 개발뿐만 아니라 다양한 활동도 괜찮습니다.',
    'Q. 조직내에서 갈등 혹은 의견 다툼이 발생했을 때, 이를 어떻게 해결하시나요?',
    'Q. 개발에 관심을 갖게 된 이유와 왜 백엔드를 지원하게 되었는지 작성해주세요.',
    'Q. 개발 과정에서 생성형 AI(ex. ChatGPT, wrtn, Gemini 등)을 사용하는 것을 긍정적, 부정적 어떻게 생각하는지와 그 이유까지 긍정적으로 생각한다면 본인의 활용법을 작성해주세요.',
    'Q. 본인이 생각하고 있는 진로와 실천 계획에 멋쟁이사자처럼 활동이 어떤 영향을 끼칠거라 생각하시는지 구체적으로 설명해주세요.',
    'Q. 예상치 못한 문제나 도전 과제에 직면했을 때 이를 해결하기 위해 사용했던 본인만의 접근법이나 학습 방법을 구체적인 경험을 바탕으로 설명해주세요.',
    'Q. 백엔드 기술 스택을 작성해주세요.',
    'Q. 개인 포트폴리오 또는 기술 블로그나 깃허브 주소를 작성해주세요.',
  ]

  const questions_Design = [
    'Q. 동아리에 지원하게 된 이유를 작성해주세요.',
    'Q. 본인의 성격에서 장점과 단점을 작성해주세요.',
    'Q. 본인이 속한 조직에서 갈등 상황을 해결한 경험을 알려주세요. 만약 동아리 내에서 갈등 상황이 생긴다면 어떻게 대처할 것인지 알려주세요.',
    'Q. 팀 프로젝트에서 디자이너로 참여했을 때의 역할과 경험을 말씀해주세요. 그 과정에서의 역할과 협업 방식은 어땠나요?',
    'Q. 지금까지 진행했던 디자인 프로젝트 중 가장 기억에 남는 작업은 무엇인가요? 그 과정과 결과에 대해 작성해주세요.',
    'Q. 사용하는 디자인 툴은 어떤 것들이 있나요? 해당 툴을 얼마나 잘 다룰 수 있는지 작성해주세요.',
    'Q. 제한된 시간 속에서 디자인을 완료해야 한다면 어떻게 대처하겠습니까?',
    'Q. 동아리에서 기획하고 싶은 디자인 프로젝트가 있다면 어떤 것이 있나요?',
    'Q. 개인 포트폴리오가 있다면 알려주세요.',
  ]

  interface User {
    studentId: string
    name: string
    department: string
    phoneNumber: string
    resultStatus: string
    frontendcontent1?: string
    frontendcontent2?: string
    frontendcontent3?: string
    frontendcontent4?: string
    frontendcontent5?: string
    frontendcontent6?: string
    frontendcontent7?: string
    frontendcontent8?: string
    frontendcontent9?: string
    frontendcontent10?: string
    backendcontent1?: string
    backendcontent2?: string
    backendcontent3?: string
    backendcontent4?: string
    backendcontent5?: string
    backendcontent6?: string
    backendcontent7?: string
    backendcontent8?: string
    backendcontent9?: string
    backendcontent10?: string
    designcontent1?: string
    designcontent2?: string
    designcontent3?: string
    designcontent4?: string
    designcontent5?: string
    designcontent6?: string
    designcontent7?: string
    designcontent8?: string
    designcontent9?: string
    designcontent10?: string
    [key: string]: string | undefined
  }

  const [selectedUser, setSelectedUser] = useState<User | null>(null)

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
      const response = await axios.get('https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/admin/frontend/submit', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      })

      // frontend 데이터 로드
      // console.log(`response_front`, response)

      if (response.status === 200) {
        setFrontendData(response.data)
      } else {
        // console.error('프론트엔드 데이터 로드 실패:', response.status)
      }
    } catch (error) {
      // console.error('프론트엔드 데이터 로드 실패:', error)
    }
  }

  const viewBackend = async () => {
    try {
      const response = await axios.get('https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/admin/backend/submit', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      })

      // backend 데이터 로드
      // console.log(`response_backend`, response)

      if (response.status === 200) {
        setBackendData(response.data)
      } else {
        // console.error('백엔드 데이터 로드 실패:', response.status)
      }
    } catch (error) {
      // console.error('백엔드 데이터 로드 실패:', error)
    }
  }

  const viewDesign = async () => {
    try {
      const response = await axios.get('https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/admin/design/submit', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      })

      // design 데이터 로드
      // console.log(`response_Design`, response)

      if (response.status === 200) {
        setDesignData(response.data)
      } else {
        // console.error('디자인 데이터 로드 실패:', response.status)
      }
    } catch (error) {
      // console.error('디자인 데이터 로드 실패:', error)
    }
  }

  const viewUserForm = async (studentId: string) => {
    try {
      const response = await axios.get(`https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/admin/userform/${activeTab}/${studentId}?studentId=${studentId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          accept: '*/*',
        },
      })

      // console.log(`response_userform`, response.data)

      if (response.status === 200) {
        setSelectedUser(response.data)
        setIsModalOpen(true)
      } else {
        // console.error('지원서 데이터 로드 실패:', response.status)
      }
    } catch (error) {
      // console.error('지원서 데이터 로드 실패:', error)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
    setCurrentPage(0)
  }
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const handlePassState = async (resultStatus: 'PASS' | 'HOLD' | 'FAIL') => {
    if (!selectedUser) return

    try {
      const response = await axios.post(
        `https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/admin/result/${selectedUser.studentId}?resultStatus=${resultStatus}&comment=${comment}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 200) {
        // console.log('결과 저장 성공:', response.data.comment)
        alert('결과가 성공적으로 저장되었습니다.')
        closeModal()

        setComment(response.data.comment)
        window.location.reload()
      } else {
        // console.error('결과 저장 실패:', response.status)
      }
    } catch (error) {
      // console.error('결과 저장 실패:', error)
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
                  {frontendData.map((item: { studentId: string; name: string; department: string; phoneNumber: string; resultStatus: string }) => (
                    <div
                      key={item.studentId}
                      className='result-items'
                      onClick={() => viewUserForm(item.studentId)}
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
                  {backendData.map((item: { studentId: string; name: string; department: string; phoneNumber: string; resultStatus: string }) => (
                    <div
                      key={item.studentId}
                      className='result-items'
                      onClick={() => viewUserForm(item.studentId)}
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
                  {designData.map((item: { studentId: string; name: string; department: string; phoneNumber: string; resultStatus: string }) => (
                    <div
                      key={item.studentId}
                      className='result-items'
                      onClick={() => viewUserForm(item.studentId)}
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
                <p>디자인 관련 내용이 없습니다.</p>
              )}
            </div>
          </div>
        )}
        {isModalOpen && (
          <div
            className={styles.modalOverlay}
            onClick={closeModal}
          >
            <div
              className={styles.modal}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedUser && (
                <div className='user-form'>
                  <div className='form-info'>
                    <div className='form-name'>{selectedUser.name}</div>
                    <div className='form-id'>{selectedUser.studentId}</div>
                  </div>
                  <div className={styles.modalBody}>
                    <div className={styles.modalContent}>
                      {[...Array(5)].map((_, i) => {
                        const questionIndex = currentPage * 5 + i
                        if (questionIndex >= 11) return null
                        const answer = (selectedUser as Record<string, string | undefined>)[`${activeTab}content${questionIndex + 1}`] || ''
                        return (
                          <div key={questionIndex}>
                            <div className='user-question'>
                              {activeTab === 'frontend' ? questions_frontend[questionIndex] : activeTab === 'backend' ? questions_backend[questionIndex] : questions_Design[questionIndex]}
                              {answer.length != 0 ? <span style={{ color: '#4A7EDC', fontSize: '17px' }}> {answer.length} 자</span> : null}
                            </div>
                            <div className='user-answer'>{answer}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className={styles.modalFooter}>
                    <div className='modal-buttons'>
                      <div className='pass-container'>
                        <button
                          style={{ backgroundColor: '' }}
                          onClick={() => handlePassState('PASS')}
                        >
                          합격
                        </button>
                        <button onClick={() => handlePassState('HOLD')}>보류</button>
                        <button onClick={() => handlePassState('FAIL')}>불합격</button>
                      </div>

                      {currentPage > 0 && (
                        <button
                          className='prev-btn'
                          onClick={prevPage}
                        >
                          이전
                        </button>
                      )}
                      {currentPage < 1 && (
                        <button
                          className='next-btn'
                          onClick={nextPage}
                        >
                          다음
                        </button>
                      )}
                      <button
                        className='close-btn'
                        onClick={closeModal}
                      >
                        닫기
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage
