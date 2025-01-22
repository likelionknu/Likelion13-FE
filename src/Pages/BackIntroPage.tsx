import { Link } from 'react-router-dom'; 
import 메인 from '../assets/images/Main.png';
import 백 from '../assets/images/BackIntro.png';
import WANT from '../assets/images/IntroWant.png';
import styles from '../assets/IntroPage.module.css';

const BackIntroPage = () => {
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <img src={메인} alt="메인" style={{ width: '100%' }} />
        <div className={styles.mainBold}>
        Learn Create Elevate
        </div>
        <div className={styles.mainDefault}>
        강남대학교 멋쟁이사자처럼 백엔드 팀에서는 함께 배우고 성장하며, 
        끝까지 함께할 열정적인 분들을 찾고 있습니다!
        </div>

       <Link to='/SectionSelect' style={{ textDecoration: 'none' }}>
          <button className={styles.button} style={{ position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)' }}>
           13기 참여하러 가기
          </button>
       </Link>
      </div>



    <div className={styles.section}>
      <h1 className={styles.sectionTitle} style={{ textAlign: 'center' }}>백엔드 파트</h1>
      <div className={styles.sectionContent} style={{ border :'1px solid #165EE0' }}>
        <div className={styles.imageWrapper} style={{ backgroundColor: '#165EE0' }}>
          <img src={백} alt="백" className={styles.sectionImage} />
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.sectionText}>
          백엔드 개발은 서비스의 핵심 기능을 설계하고 구현하며, 주로 서버와 데이터베이스를 
          관리해 책임지는 중요한 분야입니다.
          API 설계 및 구현을 통해 클라이언트와 서버 간 원활한 통신을 가능하게 하고, 
          데이터베이스를 효율적으로 관리하여 대규모 데이터 처리와 저장을 안정적으로 지원합니다.
          강남대학교 멋쟁이사자처럼 백엔드 파트에서는 Java, Spring Boot, 그리고 MariaDB와 
          같은 기술 스택을 활용하여 안정적이고 확장 가능한 서비스를 개발합니다. 
          이러한 과정에서 사용자 요구사항에 맞춘 기능을 구현하고, 성능 최적화와 보안을 강화하며, 서비스 품질을 높이는 데 주력합니다.  
          프로젝트를 통해 실질적인 기술과 협업 능력을 익힐 수 있습니다.
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
         {' 어떠한 문제가 발생했을때 주저하지 않고 끝까지 해결하기 위해 노력하는 분 \n새로운 도전을 두려워하지 않는 분\n팀원들과 협력하여 목표를 달성하는 데 즐거움 느끼시는 분'}
        </p>
        </div>
      </div>
    </div>

    </div>
  )
}

export default BackIntroPage