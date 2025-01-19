
import { useNavigate } from "react-router-dom";
import styles from '../assets/CompletedPage.module.css';

const CompletedPage = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/MainPage");
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>제출 완료</h1>
      <p className={styles.message}>제출 완료되었습니다.</p>
      <div className={styles.buttonGroup}>
        <button className={styles.confirmButton} onClick={handleConfirm}>메인 페이지</button>
      </div>
    </div>
  );
};

export default CompletedPage;

