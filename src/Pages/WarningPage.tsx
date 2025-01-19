import { useNavigate } from "react-router-dom";
import styles from '../assets/WarningPage.module.css';

const WarningPage = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };
  const handleConfirm = () => {
    navigate("/complete");
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>수정 불가</h1>
      <p className={styles.message}>제출한 내용은 수정할 수 없습니다. 정말 제출하시겠습니까?</p>
      <div className={styles.buttonGroup}>
      <button className={styles.cancelButton} onClick={handleCancel}>취소</button>
        <button className={styles.confirmButton} onClick={handleConfirm}>제출하기</button>
      </div>
    </div>
  );
};

export default WarningPage;

