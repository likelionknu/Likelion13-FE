import React from "react";
import { Link } from "react-router-dom";
import 모달 from '../assets/images/MainModal.png';
import styles from "../assets/MainSelectModal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MainSelectModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.selectModalOverlay} onClick={onClose}>
      <div className={styles.selectModal} onClick={(e) => e.stopPropagation()}>
        <h2>지원하실 파트를 선택해주세요.</h2>
        <img src={모달} alt="파트선택택모달" className={styles.selectModalImage} />
        <div className={styles.selectButtonContainer}>
          <Link to="/backend-question" style={{ textDecoration: "none" }}>
            <button className={styles.selectButton}>백엔드 파트</button>
          </Link>
          <Link to="/frontend-question" style={{ textDecoration: "none" }}>
            <button className={styles.selectButton}>프론트엔드 파트</button>
          </Link>
          <Link to="/design-question" style={{ textDecoration: "none" }}>
            <button className={styles.selectButton}>디자인 파트</button>
          </Link>
        </div>

        <button className={styles.selectCloseButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default MainSelectModal;
