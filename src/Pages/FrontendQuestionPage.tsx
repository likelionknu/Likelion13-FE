import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import styles from '../assets/QuestionPage.module.css';
import QuestionModal from "../components/QuestionModal";

const FrontendQuestionPage = () => {
  const { isLoggedIn, checkAuth, user } = useAuthStore();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);


  const questions = [
    "Q. 동아리에 지원하게 된 이유를 작성해주세요.",
    "Q. 본인의 성격에서 장점과 단점을 작성해주세요.",
    "Q. 본인이 속한 조직에서 갈등 상황을 해결한 경험을 알려주세요. 만약 동아리 내에서 갈등 상황이 생긴다면 어떻게 대처할 것인지 알려주세요.",
    "Q. 본인이 가장 몰입했던 경험과 그에 따른 결과를 알려주세요. (코딩 관련이 아니어도 됨)",
    "Q. 세가지 파트 중 프론트엔드에 지원한 동기를 알려주세요.",
    "Q. 프론트엔드에 관심을 가지게 된 계기는 무엇인가요?",
    "Q. 본인이 사용하고 있는 프론트엔드 기술 스택은 무엇인가요?",
    "Q. 새로운 기술이나 도구를 학습할 때 주로 어떤 방식을 사용하시나요?",
    "Q. 프론트엔드관련 자신이 참여한 프로젝트를 자세히 설명해주세요. (없다면 공부했던 것, 동아리에서 어떤 프로젝트를 하고싶은지 알려주세요.)",
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
    const savedAnswers = localStorage.getItem("frontendAnswers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("frontendAnswers", JSON.stringify(answers));
  }, [answers]);  // answers가 변경될 때마다 로컬스토리지에 저장
  
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

    const frontendData = {
      id: 0, // 임시 ID
      studentId: user.studentId, // 로그인된 사용자 ID로 바꿔야 할 수 있음
      name: user.name, // 이름도 실제로 가져올 수 있으면 바꿔야 함
      frontendcontent1: answers[0] || "",
      frontendcontent2: answers[1] || "",
      frontendcontent3: answers[2] || "",
      frontendcontent4: answers[3] || "",
      frontendcontent5: answers[4] || "",
      frontendcontent6: answers[5] || "",
      frontendcontent7: answers[6] || "",
      frontendcontent8: answers[7] || "",
      frontendcontent9: answers[8] || "",
      apply: false, // 임시저장 후 상태를 "true"로 설정
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/form/frontend/create", {  // 실제 서버 URL로 변경
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(frontendData),
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
  console.log("보낼 데이터:", frontendData);
};
  const handleSubmit = async () => {
    setIsFirstModalOpen(true);
  };

  const handleFirstModalClose = async () => {
    setIsFirstModalOpen(false);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", { // 실제 서버 URL로 변경 필요
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({answers}),
      });
  
      if (response.ok) {
        const responseData = await response.json();
      console.log('서버 응답:', responseData);
        setIsSecondModalOpen(true);
      } else {
        alert("서버 오류가 발생했습니다.");
      }
    } catch {
      alert("서버 요청 중 오류가 발생했습니다.");
    }
  };

  const handleSecondModalClose = () => {
    navigate("/MainPage");  };
 
  return (
    <div className={styles.page}>

      <main className={styles.main}>
        <h1 className={styles.title}>프론트엔드 파트</h1>
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
        onSubmit={handleFirstModalClose}
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


export default FrontendQuestionPage;