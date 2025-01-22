import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/QuestionPage.module.css";

type ModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  isSecondModal?: boolean;
};

const QuestionModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  onClose,
  isSecondModal = false,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleHomepageRedirect = () => {
    navigate("/MainPage");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={styles.modalButtons}>
          {isSecondModal ? (
            <button
              className={styles.confirmButton}
              onClick={handleHomepageRedirect}
            >
              홈페이지로 가기
            </button>
          ) : (
            <>
              <button className={styles.cancelButton} onClick={onClose}>
                취소
              </button>
              <button className={styles.confirmButton} onClick={onClose}>
                제출
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
