import { Link } from 'react-router-dom'; 
import 메인 from '../assets/images/Main.png';
import 프론트 from '../assets/images/FrontIntro.png';
import WANT from '../assets/images/IntroWant.png';
import 메인로고 from '../assets/images/MainLogo.png'
import styles from '../assets/IntroPage.module.css';

const FrontIntroPage = () => {
  return (
    <div>
      <div style={{ position: 'relative' }}>
       <img src={메인} alt="메인" className={styles.mainImage} />
       <img
          src={메인로고}
          alt='메인로고'
          className={styles.mainLogo}
        />
        <div className={styles.mainBold}>
        Learn Create Elevate
        </div>
        <div className={styles.mainDefault}>
        강남대학교 멋쟁이사자처럼 프론트엔드 팀에서는 함께 배우고 성장하며, 
        끝까지 함께할 열정적인 분들을 찾고 있습니다!
        </div>

       <Link to='/SectionSelect' style={{ textDecoration: 'none' }}>
          <button className={styles.button} style={{ position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)' }}>
           13기 참여하러 가기
          </button>
       </Link>
      </div>

    <div className={styles.section}>
      <h1 className={styles.sectionTitle} style={{ textAlign: 'center' }}>프론트엔드 파트</h1>
      <div className={styles.sectionContent} style={{ border :'1px solid #7899FE' }}>
        <div className={styles.imageWrapper}  style={{ backgroundColor: '#7899FE' }}>
          <img src={프론트} alt="프론트" className={styles.sectionImage} />
        </div>
        <div className={styles.textWrapper}>
        <p className={styles.sectionText} style={{ textAlign: 'left' }}>
        프론트엔드 개발은 웹사이트나 웹 애플리케이션의 사용자 인터페이스(UI)를 구축하는 분야입니다. 사용자가 직접 상호작용하는 화면을 개발하며, 웹 페이지의 구조, 디자인, 스타일, 동작을 담당합니다. 주로 HTML, CSS, JavaScript와 같은 기술을 활용하여 웹 페이지를 구성하고, 사용자 경험을 최적화하는 데 중점을 둡니다. 또한, 반응형 디자인과 인터랙션을 구현하여 다양한 디바이스에서 원활하게 동작하도록 합니다. 최근에는 React와 같은 프레임 워크와 라이브러리를 사용해 더 효율적이고 복잡한 애플리케이션을 개발하고 있습니다.
            강남대학교 멋쟁이사자처럼 프론트엔드 파트에서는 HTML, CSS, JavaScript, React를 활용하여 현대적인 웹 애플리케이션을 구현하고, 사용자 친화적인 환경을 제공합니다.
          </p>
        </div>
      </div>
    </div>

    <div className={styles.section} style={{backgroundColor: '#E0E8FF' }}>
      <h1 className={styles.sectionTitle} style={{ textAlign: 'center' }}>이런분들과 함께하고싶어요!</h1>
      <div className={styles.section2Content}>
        <div className={styles.image2Wrapper}>
          <img src={WANT} alt="WANT" className={styles.section2Image} />
        </div>
        <div className={styles.text2Wrapper}>
        <p className={styles.sectionText}>
         {'팀원들과 원활하게 소통하며 함께 성장하고, 협력할 수 있는 분\n코딩을 잘 몰라도, 배우고 성장하려는 열정이 있는 분\n문제의 상황에 직면했을 때 해결 방안을 적극적으로 모색하고 실행하는 분'}
        </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default FrontIntroPage