import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import styles from '../assets/QuestionPage.module.css';
import QuestionModal from "../components/QuestionModal";

const BackendQuestionPage = () => {
  const { isLoggedIn, checkAuth, user } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const navigate = useNavigate();

  const questions = [
    "Q. 동아리에 지원하게 된 이유를 작성해주세요.",
    "Q. 본인의 성격에서 장점과 단점을 작성해주세요.",
    "Q. 최근 몰입해서 진행했던 경험을 작성해주세요.",
    "Q. 조직내에서 갈등 혹은 의견 다툼이 발생했을 때, 이를 어떻게 해결하시나요?",
    "Q. 개발에 관심을 갖게 된 이유와 왜 백엔드를 지원하게 되었는지 작성해주세요.",
    "Q. 개발 과정에서 생성형 AI(ex. ChatGPT, wrtn, Gemini 등)을 사용하는 것을 긍정적, 부정적 어떻게 생각하는지와 그 이유까지 긍정적으로 생각한다면 본인의 활용법을 작성해주세요.",
    "Q. 본인이 생각하고 있는 진로와 실천 계획에 멋사 활동이 어떤 영향을 끼칠거라 생각하시는지 구체적으로 설명해주세요.",
    "Q. 예상치 못한 문제나 도전 과제에 직면했을 때 이를 해결하기 위해 사용했던 본인만의 접근법이나 학습 방법을 구체적인 경험을 바탕으로 설명해주세요.",
    "Q. 백엔드 기술 스택을 작성해주세요.",
    "Q. 개인 포트폴리오 또는 기술 블로그나 깃허브 주소를 작성해주세요.",
  ];

  const questionsPerPage = 5;
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, endIndex);
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(""));

  useEffect(() => { checkAuth(); }, [checkAuth]);

  useEffect(() => {
    if (isLoggedIn === false) {
      alert("로그인이 필요합니다.");
      navigate("/login"); 
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (user && user.studentId) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/v1/form/backend/view?studentId=${user.studentId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
                    if (response.ok) {
            const data = await response.json();
            if (data) {
              const fetchedAnswers = [
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
              ];
              setAnswers(fetchedAnswers);
            }
          } else {
            console.log("기존 데이터가 없습니다.");
          }
        } catch (error) {
          console.error("데이터 가져오기 실패:", error);
        }
      };

      fetchData();
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("backendAnswers", JSON.stringify(answers));
  }, [answers]);  

  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSave = async () => {
    if (!isLoggedIn || !user) {
      alert("로그인 상태가 아닙니다.");
      return;
    }

    const backendData = {
      id: 0, 
      studentId: user.studentId, 
      name: user.name, 
      backendcontent1: answers[0] || "",
      backendcontent2: answers[1] || "",
      backendcontent3: answers[2] || "",
      backendcontent4: answers[3] || "",
      backendcontent5: answers[4] || "",
      backendcontent6: answers[5] || "",
      backendcontent7: answers[6] || "",
      backendcontent8: answers[7] || "",
      backendcontent9: answers[8] || "",
      backendcontent10: answers[9] || "",
      apply: false,
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/form/backend/create", {  // 실제 서버 URL로 변경
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(backendData),
      });

      console.log('Response:', response); // 응답 출력
    if (response.ok) {
      alert("임시 저장되었습니다.");
    } else {
      const responseData = await response.json(); // 실패 시 응답 데이터 확인
      console.log('Error response:', responseData);
      alert("저장 실패, 서버 오류.");
    }
  } catch (error) {
    console.error('Fetch error:', error); // 에러 출력
    alert("저장 중 오류가 발생했습니다.");
  }

  console.log("로그인된 사용자 정보:", user);
  console.log("보낼 데이터:", backendData);
};

  const handleSubmit = () => {
    setIsFirstModalOpen(true);
  };

  const handleFirstModalSubmit = async () => {

    if (!user) {
      alert("사용자 정보가 없습니다. 다시 로그인 해주세요.");
      return;
    }
  
    try {
      const backendData = {
        id: 0, // 임시 ID
        studentId: user.studentId,
        name: user.name,
        backendcontent1: answers[0] || "",
        backendcontent2: answers[1] || "",
        backendcontent3: answers[2] || "",
        backendcontent4: answers[3] || "",
        backendcontent5: answers[4] || "",
        backendcontent6: answers[5] || "",
        backendcontent7: answers[6] || "",
        backendcontent8: answers[7] || "",
        backendcontent9: answers[8] || "",
        backendcontent10: answers[9] || "",
        apply: false,
      };

      console.log("생성 요청 시작");
      const createResponse = await fetch("http://localhost:8080/api/v1/form/backend/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(backendData),
      });

      console.log("Create Response:", createResponse);

      if (!createResponse.ok) {
        const createErrorData = await createResponse.json();
        console.log("Create API Error response:", createErrorData);
        alert("데이터 생성 중 오류가 발생했습니다.");
        return;
      }

      console.log("제출 요청 시작");
      const submitResponse = await fetch(`http://localhost:8080/api/v1/form/backend/backend/submit/${user.studentId}?studentId=${user.studentId}`, { // 실제 서버 URL로 변경 필요
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log('Submit Response:', submitResponse); // 응답 출력
      if (submitResponse.ok) {

      const submitResponseData = await submitResponse.json();
      console.log('서버 응답:', submitResponseData);
      
        setIsSecondModalOpen(true);
      } else {
        const submitErrorData = await submitResponse.json(); // 실패 시 응답 데이터 확인
        console.log('Error response:', submitErrorData);
        alert("서버 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert("서버 요청 중 오류가 발생했습니다.");
    }
  };
  

  const handleSecondModalClose = () => {
    navigate("/MainPage"); 
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>백엔드 파트</h1>
        <p className={styles.description}>질문에 대한 자유로운 답변을 작성해주세요. 그 외 덧붙이는 말! </p>
        {currentQuestions.map((question, index) => (
          <div key={index} className={styles.questionBox}>
            <p className={styles.question}>{question}</p>
            <div className={styles.textareaWrapper}>
              <textarea
                placeholder="내용을 입력해주세요."
                rows={10}
                maxLength={1000}
                value={answers[startIndex + index]}
                onChange={(e) => handleAnswerChange(startIndex + index, e.target.value)}
                className={styles.textarea}
              />
              <span className={styles.charCount}>
                {answers[startIndex + index].length} / 1000
              </span>
            </div>
          </div>
        ))}
      </main>

      <div className={styles.buttonGroup}>
        {currentPage === 2 && (
          <button className={styles.prevButton} onClick={handlePrev}>이전</button>
        )}
        <button className={styles.saveButton} onClick={handleSave}>임시저장</button>
        {currentPage === 2 ? (
          <button className={styles.nextButton} onClick={handleSubmit}>제출하기</button>
        ) : (
          <button className={styles.nextButton} onClick={handleNext}>다음</button>
        )}
      </div>

      <QuestionModal
        isOpen={isFirstModalOpen}
        title="수정이 불가합니다"
        message="답변을 제출하면 더 이상 수정할 수 없습니다. 계속하시겠습니까?"
        onSubmit={handleFirstModalSubmit}
        onClose={() => setIsFirstModalOpen(false)}
      />

      <QuestionModal
        isOpen={isSecondModalOpen}
        title="제출 완료"
        message="답변이 성공적으로 제출되었습니다."
        onSubmit={handleSecondModalClose}
        onClose={() => setIsSecondModalOpen(false)}
        isSecondModal={true} 
      />
    </div>
  );
};

export default BackendQuestionPage;
