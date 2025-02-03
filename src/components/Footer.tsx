import '../assets/Footer.css'
import 인스타 from '../assets/images/ft_insta.png';
import 멋사2 from '../assets/images/ft_knu.png';
import 멋사3 from '../assets/images/ft_lion3.png';
import 멋사4 from '../assets/images/ft_lion4.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="link-container">
        <a href="https://www.instagram.com/likelion.knu/" className="link">
          <img src={인스타} alt="강남대_멋쟁이사자처럼_인스타그램" />
        </a>
        <a href="https://likelion13-fe.vercel.app/" className="link">
          <img src={멋사2} alt="강남대_멋쟁이사자처럼" />
        </a>
        <a href="https://likelion.net/" className="link">
          <img src={멋사3} alt="테킷" />
        </a>
        <a href="https://likelion.university/" className="link">
          <img src={멋사4} alt="멋사_공식홈페이지" />
        </a>
      </div>

      <div className="bt-container">
        <p className="bt-font">©2024 LIKE LION KNU. All rights reserved.</p>
        <p className="bt-font">동아리실: 경기도 용인시 기흥구 강남로 40 강남대학교 후생관</p>
      </div>
    </footer>
  );
};

export default Footer;
