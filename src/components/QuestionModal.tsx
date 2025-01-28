import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/QuestionPage.module.css";
import 모달1 from "../assets/images/ModalImg1.png";
import 모달2 from "../assets/images/ModalImg2.png";

type ModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onSubmit?: () => void;
  isSecondModal?: boolean;
};

const QuestionModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  onSubmit,
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
        <div className={styles.modalImageContainer}>
          {isSecondModal ? (
            <img
              src={모달2}
              alt="제출완"
              className={styles.modalImage}
            />
          ) : (
            <img
              src={모달1}
              alt="수정불가"
              className={styles.modalImage}
            />
          )}
        </div>
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
              <button className={styles.cancelButton} onClick={() => navigate(-1)}>
                취소
              </button>
              <button className={styles.confirmButton} onClick={onSubmit}>
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
