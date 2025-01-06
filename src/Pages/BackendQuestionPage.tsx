import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BackendQuestionPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
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
        <h1 style={styles.title}>백엔드 파트</h1>
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

export default BackendQuestionPage;

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
