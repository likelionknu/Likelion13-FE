import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import styles from '../assets/QuestionPage.module.css';
import QuestionModal from "../components/QuestionModal";

const DesignQuestionPage = () => {
  const { isLoggedIn, checkAuth, user } = useAuthStore();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const questions = [
    "Q. 동아리에 지원하게 된 이유를 작성해주세요.",
    "Q. 본인의 성격에서 장점과 단점을 작성해주세요.",
    "Q. 본인이 속한 조직에서 갈등 상황을 해결한 경험을 알려주세요. 만약 동아리 내에서 갈등 상황이 생긴다면 어떻게 대처할 것인지 알려주세요.",
    "Q. 팀 프로젝트에서 디자이너로 참여했을 때의 역할과 경험을 말씀해주세요. 그 과정에서의 역할과 협업 방식은 어땠나요?",
    "Q. 지금까지 진행했던 디자인 프로젝트 중 가장 기억에 남는 작업은 무엇인가요? 그 과정과 결과에 대해 작성해주세요.",
    "Q. 사용하는 디자인 툴은 어떤 것들이 있나요? 해당 툴을 얼마나 잘 다룰 수 있는지 작성해주세요.",
    "Q. 제한된 시간 속에서 디자인을 완료해야 한다면 어떻게 대처하겠습니까?",
    "Q. 동아리에서 기획하고 싶은 디자인 프로젝트가 있다면 어떤 것이 있나요?",
    "Q. 개인 포트폴리오가 있다면 알려주세요.",
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
            `https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/form/design/view?studentId=${user.studentId}`,
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
                data.designcontent1,
                data.designcontent2,
                data.designcontent3,
                data.designcontent4,
                data.designcontent5,
                data.designcontent6,
                data.designcontent7,
                data.designcontent8,
                data.designcontent9,
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
  }, []);

  useEffect(() => {
    localStorage.setItem("designAnswers", JSON.stringify(answers));
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

    const designData = {
      id: 0, // 임시 ID
      studentId: user.studentId, // 로그인된 사용자 ID로 바꿔야 할 수 있음
      name: user.name, // 이름도 실제로 가져올 수 있으면 바꿔야 함
      designcontent1: answers[0] || "",
      designcontent2: answers[1] || "",
      designcontent3: answers[2] || "",
      designcontent4: answers[3] || "",
      designcontent5: answers[4] || "",
      designcontent6: answers[5] || "",
      designcontent7: answers[6] || "",
      designcontent8: answers[7] || "",
      designcontent9: answers[8] || "",
      apply: false, // 임시저장 후 상태를 "true"로 설정
    };

    try {
      const response = await fetch("https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/form/design/create", {  // 실제 서버 URL로 변경
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(designData),
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
  console.log("보낼 데이터:", designData);
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
      const designData = {
        id: 0, // 임시 ID
        studentId: user.studentId,
        name: user.name,
        designcontent1: answers[0] || "",
        designcontent2: answers[1] || "",
        designcontent3: answers[2] || "",
        designcontent4: answers[3] || "",
        designcontent5: answers[4] || "",
        designcontent6: answers[5] || "",
        designcontent7: answers[6] || "",
        designcontent8: answers[7] || "",
        designcontent9: answers[8] || "",
        designcontent10: answers[9] || "",
        apply: false,
      };

      console.log("생성 요청 시작");
      const createResponse = await fetch("https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/form/design/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(designData),
      });

      console.log("Create Response:", createResponse);

      if (!createResponse.ok) {
        const createErrorData = await createResponse.json();
        console.log("Create API Error response:", createErrorData);
        alert("데이터 생성 중 오류가 발생했습니다.");
        return;
      }

      console.log("제출 요청 시작");
      const submitResponse = await fetch(`https://port-0-likelion13-be-m6qgk7bv4a85692b.sel4.cloudtype.app/api/v1/form/design/submit/${user.studentId}?studentId=${user.studentId}`, { // 실제 서버 URL로 변경 필요
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
    navigate("/MainPage");  };
 
  return (
    <div className={styles.page}>

      <main className={styles.main}>
        <h1 className={styles.title}>디자인 파트</h1>
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

export default DesignQuestionPage;