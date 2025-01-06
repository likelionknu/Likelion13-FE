import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DesignQuestionPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

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

  const handleSubmit = () => {
    navigate("/warning");
  };

  return (
    <div style={styles.page}>

      <main style={styles.main}>
        <h1 style={styles.title}>디자인 파트</h1>
        <p style={styles.description}>질문에 대한 자유로운 답변을 작성해주세요. 그 외 덧붙이는 말! </p>
        {currentQuestions.map((question, index) => (
          <div key={index} style={styles.questionBox}>
            <p style={styles.question}>{question}</p>
            <textarea
              placeholder="내용을 입력해주세요."
              rows={10}
              maxLength={1000}
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              style={styles.textarea}
            />
            <div style={styles.charCount}>
              {answers[index].length} / 1000
            </div>
          </div>
        ))}
      </main>

      <div style={styles.buttonGroup}>
      {currentPage === 2 && (
          <button style={styles.prevButton} onClick={handlePrev}>이전</button>
        )}
        <button style={styles.saveButton}>임시저장</button>
        {currentPage === 2 ? (
          <button style={styles.nextButton} onClick={handleSubmit}>제출하기</button>
        ) : (
          <button style={styles.nextButton} onClick={handleNext}>다음</button>
        )}
      </div>
    </div>
  );
};

export default DesignQuestionPage;

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  main: {
    flex: 1,
    padding: "50px",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "16px",
  },
  description: {
    marginBottom: "24px",
  },
  questionBox: {
    marginBottom: "24px",
  },
  question: {
    fontSize: "1rem",
    marginBottom: "20px",
  },
  textarea: {
    width: "90%",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "8px",
    fontSize: "1rem",
    resize: "none",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "16px",
  },
  prevButton: {
    padding: "8px 16px",
    margin: "0 8px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "#ddd",
  },
  saveButton: {
    padding: "8px 16px",
    margin: "0 8px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
  },
  nextButton: {
    padding: "8px 16px",
    margin: "0 8px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "#28a745",
    color: "white",
  },
};
