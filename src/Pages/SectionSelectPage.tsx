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

const SectionSelectPage = () => {
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <img src={메인} alt="메인" style={{ width: '100%' }} />
      </div>
      <div>
      <Link to="/backend-question" style={{ textDecoration: 'none' }}>
          <button
            style={{ ...styles.button, position: 'absolute', top: '70%', left: '30%', transform: 'translate(-50%, -50%)' }}
          >
            백엔드 파트
          </button>
        </Link>
        <Link to="/frontend-question" style={{ textDecoration: 'none' }}>
          <button
            style={{ ...styles.button, position: 'absolute', top: '70%', left: '40%', transform: 'translate(-50%, -50%)' }}
          >
            프론트엔드 파트
          </button>
        </Link>
        <Link to="/design-question" style={{ textDecoration: 'none' }}>
          <button
            style={{ ...styles.button, position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            디자인 파트
          </button>
        </Link>
      </div>
    </div>
  )
}

export default SectionSelectPage