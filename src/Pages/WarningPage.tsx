import React from "react";
import { useNavigate } from "react-router-dom";

const WarningPage = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };
  const handleConfirm = () => {
    navigate("/complete");
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>수정 불가</h1>
      <p style={styles.message}>제출한 내용은 수정할 수 없습니다. 정말 제출하시겠습니까?</p>
      <div style={styles.buttonGroup}>
      <button style={styles.cancelButton} onClick={handleCancel}>취소</button>
        <button style={styles.confirmButton} onClick={handleConfirm}>제출하기</button>
      </div>
    </div>
  );
};

export default WarningPage;

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
    border: ' 1px solid black',
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  message: {
    fontSize: "1rem",
    color: "red",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    padding: '10px',
  },
  cancelButton: {
    padding: "8px 16px",
    marginRight: "10px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "#ddd",
  },
  confirmButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "red",
    color: "white",
  },
};
