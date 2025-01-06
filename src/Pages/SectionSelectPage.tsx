<<<<<<< HEAD
import { Link } from 'react-router-dom'; 
import 메인 from '../assets/images/ex.png';

const styles: { [key: string]: React.CSSProperties } = {
  button: {
    display: 'block',
    margin: '20px auto',
    padding: '12px 36px',
    backgroundColor: '#FFF',
    border: '2px solid #165EE0',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none', 
    fontWeight:'bold',
  },
};
=======
import { useNavigate } from "react-router-dom";
>>>>>>> 213aea6d4dc9c612a172eca13e95c55c74dbae0e

const SectionSelectPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <img src={메인} alt="메인" style={{ width: '100%' }} />
      </div>
      <div>
<<<<<<< HEAD
      <Link to="/signup" style={{ textDecoration: 'none' }}>
          <button
            style={{ ...styles.button, position: 'absolute', top: '70%', left: '30%', transform: 'translate(-50%, -50%)' }}
          >
            백엔드 파트
          </button>
        </Link>
        <Link to="#" style={{ textDecoration: 'none' }}>
          <button
            style={{ ...styles.button, position: 'absolute', top: '70%', left: '40%', transform: 'translate(-50%, -50%)' }}
          >
            프론트엔드 파트
          </button>
        </Link>
        <Link to="#" style={{ textDecoration: 'none' }}>
          <button
            style={{ ...styles.button, position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            디자인 파트
          </button>
        </Link>
=======
        <button onClick={() => navigate("/backend-question")}>백엔드 파트</button>
        <button onClick={() => navigate("/frontend-question")}>프론트엔드 파트</button>
        <button onClick={() => navigate("/design-question")}>디자인 파트 </button>
>>>>>>> 213aea6d4dc9c612a172eca13e95c55c74dbae0e
      </div>
    </div>
  )
}

export default SectionSelectPage
