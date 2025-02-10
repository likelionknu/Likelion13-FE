import { Link } from 'react-router-dom'; 
import 메인 from '../assets/images/Main.png';
import 디자인 from '../assets/images/DesignIntro.png';
import WANT from '../assets/images/IntroWant.png';
import 메인로고 from '../assets/images/MainLogo.png'
import styles from '../assets/IntroPage.module.css';

const DesignIntroPage = () => {
  return (
    <div>
      <div className={` ${styles.fullWidthSection}`} style={{ position: 'relative' }}>
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
        강남대학교 멋쟁이사자처럼 디자인 팀에서는 함께 배우고 성장하며, 
        끝까지 함께할 열정적인 분들을 찾고 있습니다!
        </div>

       <Link to='/design-question' style={{ textDecoration: 'none' }}>
          <button className={styles.button} style={{ position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)' }}>
           13기 참여하러 가기
          </button>
       </Link>
      </div>

    <div className={styles.section}>
      <h1 className={styles.sectionTitle} style={{ textAlign: 'center' }}>디자인 파트</h1>
      <div className={styles.sectionContent} style={{ border :'1px solid #96E8FF' }}>
        <div className={styles.imageWrapper} style={{ backgroundColor: '#96E8FF'}}>
          <img src={디자인} alt="디자인" className={styles.sectionImage} />
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.sectionText}>
          UX/UI 디자인은 디지털 제품과 서비스에서 사용자와 인터페이스 간의 상호작용을 설계하고 개선하는 작업입니다. UX 디자인은 사용자가 제품을 이용하며 느끼는 전반적인 경험을 분석하고 설계하는 데 초점을 맞추며, 사용자 친화적인 흐름과 구조를 만듭니다. 반면, UI 디자인은 화면 레이아웃, 색상, 타이포그래피와 같은 시각적 요소를 통해 제품의 외형과 사용성을 설계하는 작업에 중점을 두며 주로 피그마,어도비 툴을 사용합니다. 
          UX/UI 디자인은 기술과 창의성을 결합하여 디지털 환경에서 사용자에게 긍정적인 경험을 제공하는 핵심 분야입니다.UX/UI 디자인을 통해 팀원들과 협력하며 실제 프로젝트를 실행해봄으로써 실무적인 역량과 창의적인 문제 해결 능력을 배울 수 있습니다.  
          </p>
        </div>
      </div>
    </div>

    <div className={`${styles.section} ${styles.fullWidthSection}`}
         style={{backgroundColor: '#E0E8FF' }}>
      <h1 className={styles.sectionTitle} style={{ textAlign: 'center' }}>이런분들과 함께하고싶어요!</h1>
      <div className={styles.section2Content}>
        <div className={styles.image2Wrapper}>
          <img src={WANT} alt="WANT" className={styles.section2Image} />
        </div>
        <div className={styles.text2Wrapper}>
        <p className={styles.sectionText}>
         {'배우고 성장하려고 노력하는 분\n도전을 좋아하고 새로운 아이디어를 내는걸 좋아하시는 분\n팀원들과 협력하며 목표를 달성하고 결과물을 내는것에 즐거움을 느끼는 분'}
        </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default DesignIntroPage