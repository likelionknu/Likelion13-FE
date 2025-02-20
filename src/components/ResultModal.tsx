import React from "react";
import 모달 from '../assets/images/ResultModal.png';
import styles from "../assets/MainSelectModal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResultModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.selectModalOverlay} onClick={onClose}>
      <div className={styles.selectModal} onClick={(e) => e.stopPropagation()}>
        <h2>아기 사자 면접 공지</h2>
        <img src={모달} alt="파트선택택모달" className={styles.selectModalImage} />
        <div className={styles.selectButtonContainer}>
          <b>추후에 메시지로 안내해드리겠습니다.</b>
        </div>

        <button className={styles.selectCloseButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
