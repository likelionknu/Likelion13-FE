import { Link } from 'react-router-dom'; 
import 메인 from '../assets/images/Main.png';
import styles from '../assets/SectionSelectPage.module.css'; 

const SectionSelectPage = () => {
  return (
    <div style={{ position: 'relative' }}>
      <img src={메인} alt="메인" style={{ width: '100%' }} />
      <div className={styles.buttonContainer}>
        <Link to="/backend-question" style={{ textDecoration: 'none' }}>
          <button className={styles.button}>
            백엔드 파트
          </button>
        </Link>
        <Link to="/frontend-question" style={{ textDecoration: 'none' }}>
          <button className={styles.button}>
            프론트엔드 파트
          </button>
        </Link>
        <Link to="/design-question" style={{ textDecoration: 'none' }}>
          <button className={styles.button}>
            디자인 파트
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SectionSelectPage;
