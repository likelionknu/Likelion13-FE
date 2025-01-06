import React from "react";
import { useNavigate } from "react-router-dom";

const CompletedPage = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/MainPage");
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>제출 완료</h1>
      <p style={styles.message}>제출 완료되었습니다.</p>
      <div style={styles.buttonGroup}>
        <button style={styles.confirmButton} onClick={handleConfirm}>메인 페이지</button>
      </div>
    </div>
  );
};

export default CompletedPage;

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  messageBox: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  message: {
    fontSize: "1rem",
    color: "green",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    padding: '10px',
  },
  confirmButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "green",
    color: "white",
  },
};
