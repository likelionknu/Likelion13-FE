import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import styles from '../assets/QuestionPage.module.css'

const SubmitPage = () => {
  const { isLoggedIn, checkAuth, user, fetchUserPart} = useAuthStore()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [answers, setAnswers] = useState<string[]>([]);

  type Part = 'backend' | 'design' | 'frontend';

  const questions: Record<Part, string[]> = {
    backend: [
      "Q. 동아리에 지원하게 된 이유를 작성해주세요.",
      "Q. 본인의 성격에서 장점과 단점을 작성해주세요.",
      "Q. 최근 몰입해서 진행했던 경험을 작성해주세요.",
      "Q. 조직내에서 갈등 혹은 의견 다툼이 발생했을 때, 이를 어떻게 해결하시나요?",
      "Q. 개발에 관심을 갖게 된 이유와 왜 백엔드를 지원하게 되었는지 작성해주세요.",
      "Q. 개발 과정에서 생성형 AI(ex. ChatGPT, wrtn, Gemini 등)을 사용하는 것을 어떻게 생각하는지 작성해주세요.",
      "Q. 본인이 생각하는 진로와 실천 계획을 설명해주세요.",
      "Q. 예상치 못한 문제나 도전 과제 해결 방법을 작성해주세요.",
      "Q. 백엔드 기술 스택을 작성해주세요.",
      "Q. 개인 포트폴리오 또는 깃허브 주소를 작성해주세요.",
    ],
    design: [
      "Q. 동아리에 지원하게 된 이유를 작성해주세요.",
      "Q. 본인의 성격에서 장점과 단점을 작성해주세요.",
      "Q. 본인이 속한 조직에서 갈등 상황을 해결한 경험을 알려주세요.",
      "Q. 팀 프로젝트에서 디자이너로 참여했을 때의 경험을 작성해주세요.",
      "Q. 기억에 남는 디자인 프로젝트에 대해 작성해주세요.",
      "Q. 사용하는 디자인 툴과 숙련도를 작성해주세요.",
      "Q. 제한된 시간 속에서 디자인을 완료하는 방법을 설명해주세요.",
      "Q. 동아리에서 기획하고 싶은 디자인 프로젝트가 있다면?",
      "Q. 개인 포트폴리오가 있다면 공유해주세요.",
    ],
    frontend: [
      "Q. 동아리에 지원하게 된 이유를 작성해주세요.",
      "Q. 본인의 성격에서 장점과 단점을 작성해주세요.",
      "Q. 본인이 속한 조직에서 갈등 상황을 해결한 경험을 알려주세요.",
      "Q. 가장 몰입했던 경험과 그에 따른 결과를 알려주세요.",
      "Q. 프론트엔드에 지원한 동기를 작성해주세요.",
      "Q. 프론트엔드에 관심을 가지게 된 계기는 무엇인가요?",
      "Q. 본인이 사용하고 있는 프론트엔드 기술 스택은 무엇인가요?",
      "Q. 새로운 기술이나 도구를 학습할 때 주로 어떤 방식을 사용하시나요?",
      "Q. 프론트엔드 관련 프로젝트 경험을 작성해주세요.",
    ],
  };
  
  const userQuestions = questions[user?.part as Part] || [];
  const questionsPerPage = 5
  const startIndex = (currentPage - 1) * questionsPerPage
  const endIndex = currentPage * questionsPerPage
  const currentQuestions = userQuestions.length > 0 ? userQuestions.slice(startIndex, endIndex) : [];

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
    checkAuth()
    if (isLoggedIn && user?.studentId && user.part) {
      fetchUserPart(user.studentId); // 지원 분야
    }
  }, [user?.studentId, user?.part, isLoggedIn])

  const partKeys = Object.keys(questions);
if (user?.part && !partKeys.includes(user.part)) {
  console.error(`Invalid part: ${user.part}`);
}

  useEffect(() => {
    if (user && user.studentId && user.part) {
      const partPath = user.part;

      const fetchData = async () => {
        try {
          const response = await fetch(`https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/form/${partPath}/view?studentId=${user.studentId}`,
            {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          })
          if (response.ok) {
            const data = await response.json()
            if (data) {
              let fetchedAnswers: string[] = []

              if (user.part === 'frontend') {
                fetchedAnswers = [
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
              } else if (user.part === 'backend') {
                fetchedAnswers = [
                  data.backendcontent1,
                  data.backendcontent2,
                  data.backendcontent3,
                  data.backendcontent4,
                  data.backendcontent5,
                  data.backendcontent6,
                  data.backendcontent7,
                  data.backendcontent8,
                  data.backendcontent9,
                  data.backendcontent10,
                ]
              } else if (user.part === 'design') {
                fetchedAnswers = [
                  data.designcontent1,
                  data.designcontent2,
                  data.designcontent3,
                  data.designcontent4,
                  data.designcontent5,
                  data.designcontent6,
                  data.designcontent7,
                  data.designcontent8,
                  data.designcontent9,
                ]
              }
  
              if (fetchedAnswers.length > 0 && !answers.length) {
                setAnswers(fetchedAnswers);}           
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
  }, [ user?.token])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`${user.part}Answers`, JSON.stringify(answers))
    }
  }, [answers, user])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentPage < Math.ceil(userQuestions.length / questionsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1); // 상태 업데이트가 제대로 되는지 확인
    }
  }


  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1); // 상태 업데이트가 제대로 되는지 확인
    }
  }

  const currentQuestionAnswers = currentQuestions.map((question, index) => {
    const answerIndex = index;
    return {
      question,
      answer: answers[answerIndex] || "", // 해당 인덱스의 답변을 가져오고, 없으면 빈 문자열을 반환
      index: answerIndex,
    };
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>지원서 조회</h1>
        <p className={styles.description}>최종 제출한 지원서 내용이에요, 제출한 내용을 바탕으로 면접까지 미리 연습해봅시다!</p>
        {currentQuestionAnswers.map(({ question, answer, index }) => (
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
      <span className={styles.charCount}>{(answer || "").length} / 1000</span>
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