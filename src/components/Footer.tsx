// import { FaInstagram } from 'react-icons/fa'
// 인스타그램 아이콘 추가

const styles = {
  footer: {
    backgroundColor: '#F8F8F8',
    color: '#B3B3B3',
    marginTop: '50px',
    padding: '20px 0',
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '60px 0',
  },
  link: {
    color: '#B3B3B3',
    textDecoration: 'none',
    margin: '0 15px',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
  },

};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.linkContainer}>
        <a href='https://www.instagram.com/likelion.knu/' style={styles.link}>인스타그램</a>
        <a href='https://www.naver.com/'  style={styles.link}>멋쟁이사자</a>
        <a href='https://www.naver.com/'  style={styles.link}>임시링크1</a>
        <a href='https://www.naver.com/'  style={styles.link}>임시링크2</a>
      </div>

      <div>
        <p>©2024 LIKE LION KNU. All rights reserved.</p>
        <p>동아리실: 경기도 용인시 기흥구 강남로 40 강남대학교 후생관</p>
      </div>
    </footer>
  )
}

export default Footer
