import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "../assets/ApplicationPeriodModal.module.css";

const ApplicationPeriodModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const closedAt = localStorage.getItem("modalClosedAt");
    if (closedAt) {
      const timeElapsed = Date.now() - Number(closedAt);
      const oneDayInMs = 24 * 60 * 60 * 1000;
      if (timeElapsed < oneDayInMs) {
        setIsOpen(false);
      }
    }
  }, []);

  const handleDontShowAgain = () => {
    setIsOpen(false);
    localStorage.setItem("modalClosedAt", Date.now().toString());
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>📅 모집 일정 안내</h2>
        <p>서류 제출 기간: 2025.02.24(월) ~ 2025.03.12(수)</p>
        <p>서류 합격 발표: 2025.03.16(일)</p>
        <p>면접 진행 기간: 2025.03.18(화) ~ 2025.03.21(금)</p>
        <p>최종 발표: 2025.03.23(일)</p>
        <div className={styles.buttonGroup}>
          <button className={styles.closeButton} onClick={handleClose}>
            닫기
          </button>
          <button className={styles.DontShowAgain} onClick={handleDontShowAgain}>
            하루동안 안보기
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ApplicationPeriodModal;
