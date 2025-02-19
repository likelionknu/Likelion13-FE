import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import styles from '../assets/QuestionPage.module.css'

const SubmitPage = () => {
  const { isLoggedIn, checkAuth, user } = useAuthStore()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)

  // const questions_back = [
  //   "Q. 동아리에 지원하게 된 이유를 작성해주세요.",
  //   "Q. 본인의 성격에서 장점과 단점을 작성해주세요.",
  //   "Q. 최근 몰입해서 진행했던 경험을 작성해주세요.",
  //   "Q. 조직내에서 갈등 혹은 의견 다툼이 발생했을 때, 이를 어떻게 해결하시나요?",
  //   "Q. 개발에 관심을 갖게 된 이유와 왜 백엔드를 지원하게 되었는지 작성해주세요.",
  //   "Q. 개발 과정에서 생성형 AI(ex. ChatGPT, wrtn, Gemini 등)을 사용하는 것을 긍정적, 부정적 어떻게 생각하는지와 그 이유까지 긍정적으로 생각한다면 본인의 활용법을 작성해주세요.",
  //   "Q. 본인이 생각하고 있는 진로와 실천 계획에 멋사 활동이 어떤 영향을 끼칠거라 생각하시는지 구체적으로 설명해주세요.",
  //   "Q. 예상치 못한 문제나 도전 과제에 직면했을 때 이를 해결하기 위해 사용했던 본인만의 접근법이나 학습 방법을 구체적인 경험을 바탕으로 설명해주세요.",
  //   "Q. 백엔드 기술 스택을 작성해주세요.",
  //   "Q. 개인 포트폴리오 또는 기술 블로그나 깃허브 주소를 작성해주세요.",
  // ];

  // const questions_design = [
  //   "Q. 동아리에 지원하게 된 이유를 작성해주세요.",
  //   "Q. 본인의 성격에서 장점과 단점을 작성해주세요.",
  //   "Q. 본인이 속한 조직에서 갈등 상황을 해결한 경험을 알려주세요. 만약 동아리 내에서 갈등 상황이 생긴다면 어떻게 대처할 것인지 알려주세요.",
  //   "Q. 팀 프로젝트에서 디자이너로 참여했을 때의 역할과 경험을 말씀해주세요. 그 과정에서의 역할과 협업 방식은 어땠나요?",
  //   "Q. 지금까지 진행했던 디자인 프로젝트 중 가장 기억에 남는 작업은 무엇인가요? 그 과정과 결과에 대해 작성해주세요.",
  //   "Q. 사용하는 디자인 툴은 어떤 것들이 있나요? 해당 툴을 얼마나 잘 다룰 수 있는지 작성해주세요.",
  //   "Q. 제한된 시간 속에서 디자인을 완료해야 한다면 어떻게 대처하겠습니까?",
  //   "Q. 동아리에서 기획하고 싶은 디자인 프로젝트가 있다면 어떤 것이 있나요?",
  //   "Q. 개인 포트폴리오가 있다면 알려주세요.",
  // ];

  // const questions_front = [
  //   'Q. 동아리에 지원하게 된 이유를 작성해주세요.',
  //   'Q. 본인의 성격에서 장점과 단점을 작성해주세요.',
  //   'Q. 본인이 속한 조직에서 갈등 상황을 해결한 경험을 알려주세요. 만약 동아리 내에서 갈등 상황이 생긴다면 어떻게 대처할 것인지 알려주세요.',
  //   'Q. 본인이 가장 몰입했던 경험과 그에 따른 결과를 알려주세요. (코딩 관련이 아니어도 됨)',
  //   'Q. 세가지 파트 중 프론트엔드에 지원한 동기를 알려주세요.',
  //   'Q. 프론트엔드에 관심을 가지게 된 계기는 무엇인가요?',
  //   'Q. 본인이 사용하고 있는 프론트엔드 기술 스택은 무엇인가요?',
  //   'Q. 새로운 기술이나 도구를 학습할 때 주로 어떤 방식을 사용하시나요?',
  //   'Q. 프론트엔드관련 자신이 참여한 프로젝트를 자세히 설명해주세요. (없다면 공부했던 것, 동아리에서 어떤 프로젝트를 하고싶은지 알려주세요.)',
  // ]

  const questions = [
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

  const questionsPerPage = 5
  const startIndex = (currentPage - 1) * questionsPerPage
  const endIndex = currentPage * questionsPerPage
  const currentQuestions = questions.slice(startIndex, endIndex)
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''))

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (isLoggedIn === false) {
      alert('로그인이 필요합니다.')
      navigate('/login')
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    if (user && user.studentId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/form/frontend/view?studentId=${user.studentId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          })
          if (response.ok) {
            const data = await response.json()
            if (data) {
              const fetchedAnswers = [
                data.frontendcontent1,
                data.frontendcontent2,
                data.frontendcontent3,
                data.frontendcontent4,
                data.frontendcontent5,
                data.frontendcontent6,
                data.frontendcontent7,
                data.frontendcontent8,
                data.frontendcontent9,
              ]
              setAnswers(fetchedAnswers)
            }
          } else {
            console.log('기존 데이터가 없습니다.')
          }
        } catch (error) {
          console.error('데이터 가져오기 실패:', error)
        }
      }

      fetchData()
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem('frontendAnswers', JSON.stringify(answers))
  }, [answers])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>지원서 조회</h1>
        <p className={styles.description}>최종 제출한 지원서 내용이에요, 제출한 내용을 바탕으로 면접까지 미리 연습해봅시다!</p>
        {currentQuestions.map((question, index) => (
          <div
            key={index}
            className={styles.questionBox}
          >
            <p className={styles.question}>{question}</p>
            <div className={styles.textareaWrapper}>
              <textarea
                placeholder='내용을 입력해주세요.'
                rows={10}
                maxLength={1000}
                value={answers[startIndex + index]}
                onChange={(e) => handleAnswerChange(startIndex + index, e.target.value)}
                className={styles.textarea}
              />
              <span className={styles.charCount}>{answers[startIndex + index].length} / 1000</span>
            </div>
          </div>
        ))}
      </main>

      <div className={styles.buttonGroup}>
        {currentPage === 2 && (
          <button
            className={styles.prevButton}
            onClick={handlePrev}
          >
            이전
          </button>
        )}
        {currentPage === 2 ? (
          <div></div>
        ) : (
          <button
            className={styles.nextButton}
            onClick={handleNext}
          >
            다음
          </button>
        )}
      </div>
    </div>
  )
}

export default SubmitPage
