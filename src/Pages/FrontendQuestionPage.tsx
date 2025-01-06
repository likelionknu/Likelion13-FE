import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FrontendQuestionPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

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
        <h1 style={styles.title}>프론트엔드 파트</h1>
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

export default FrontendQuestionPage;

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
