import { Link } from 'react-router-dom';
import 메인 from '../assets/images/Main.png';
import 백 from '../assets/images/BackIntro.png';
import 프론트 from '../assets/images/FrontIntro.png';
import 디자인 from '../assets/images/DesignIntro.png';
import styles from '../assets/MainPage.module.css';

const events = [
  { line: 1, months: ["Mar", "Apr"], label: "아기사자 모집 및 지원", color: "#779BFE" },
  { line: 2, months: ["Mar", "Mar"], label: "오티", color: "#4A7EDC"},
  { line: 2, months: ["Apr", "Jun"], label: "파트별 세션", color: "#4A7EDC"},
  { line: 3, months: ["May", "May"], label: "아이디어톤", color: "#165EE0" },
  { line: 3, months: ["Jul", "Aug"], label: "해커톤", color: "#165EE0" },
  { line: 4, months: ["Aug", "Dec"], label: "2학기 오티, 파트별 세션, 데모데이 준비", color: "#96E8FF " },
  { line: 5, months: ["Nov", "Jan"], label: "데모데이, 연합 해커톤", color: "#779BFE" },
];

const MainPage = () => {
  return (
    <div>
      <div className={styles.mainImageContainer}>
        <img src={메인} alt="메인" className={styles.mainImage} />
        <Link to='/SectionSelect' style={{ textDecoration: 'none' }}>
          <button className={styles.button} style={{position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            13기 참여하러 가기
          </button>
        </Link>
      </div>

      <div className={styles.section}>
      <h1 className={styles.sectionTitle} style={{ textAlign: 'center' }}>강남대학교 멋쟁이 사자처럼</h1>
      <p className={styles.sectionText} style={{ textAlign: 'center'}}>
        멋쟁이 사자처럼은 2013년 서울대학교에서 시작해, 올해로 13기째 활동 중인 전국 최대 규모의 웹 프로그래밍 동아리입니다.<br />
        강남대학교 멋쟁이 사자처럼은 2023년부터 11기로 활동을 시작해, 현재 3년째 활발히 다양한 서비스를 개발하며 성장하고 있습니다.<br />
        이번 13기의 슬로건은 “Learn, Create, Elevate”로, 운영진과 아기사자가 함께 배우고, 창조하며, 성장하자는 뜻을 담고 있습니다.<br />
        우리는 이 슬로건에 따라 서로의 부족한 부분을 채워가며 실질적인 활동 위주의 동아리 문화를 만들어가고자 합니다.<br />
        지금까지 그래왔듯, 실속 있는 활동들로 여러분들을 맞이할 준비를 마쳤습니다. 많은 관심과 지원 부탁드립니다!
      </p>
      </div>

      
      <div className={styles.sectionContainer}>
      <div className={styles.section} style={{ backgroundColor: '#E0E8FF' }}>
      <h1 className={styles.sectionTitle} style={{textAlign: 'center' }}>같이 할수록 더 빛나는, 우리의 핵심 파트를 <br /> 소개합니다!</h1>
        <div className={styles.cardContainer}>
        <Link to='/BackIntro' className={styles.cardLink}>
         <div className={styles.card}>
            <div className={styles.cardImgContainer} style={{ backgroundColor: '#165EE0' }}>
              <img src={백} alt="백엔드" className={styles.cardImg} />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>백엔드</div>
              <div className={styles.cardDescription}>
                웹과 애플리케이션의 핵심 기능을 설계하고 구현하는 분야로, 주로 눈에 보이지 않는 서버와 데이터 베이스를 관리하며 서비스의 근간을 담당합니다.
              </div>
            </div>
          </div>
        </Link>

        <Link to='/FrontIntro' className={styles.cardLink}>
          <div className={styles.card}>
            <div className={styles.cardImgContainer} style={{ backgroundColor: '#7899FE' }}>
              <img src={프론트} alt="프론트엔드" className={styles.cardImg} />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>프론트엔드</div>
              <div className={styles.cardDescription}>
                사용자가 서비스를 이용하는 인터페이스를 구축하는 분야로, 웹사이트와 애플리케이션의 디자인, 동작, 반응성을 설계합니다. 사용자가 직접 상호작용하는 모든 요소를 담당합니다.
              </div>
            </div>
          </div>
        </Link>

        <Link to='/DesignIntro' className={styles.cardLink}>
          <div className={styles.card}>
            <div className={styles.cardImgContainer} style={{ backgroundColor: '#96E8FF' }}>
              <img src={디자인} alt="디자인" className={styles.cardImg} />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>디자인</div>
              <div className={styles.cardDescription}>
                사용자 경험과 사용자 인터페이스를 설계하여 화면과 서비스가 더 직관적이고 편리하게 사용될 수 있도록 돕는 작업을 담당합니다. 혁신적인 아이디어를 현실로 구현하는 데 중요한 역할을 합니다.
              </div>
            </div>
          </div>
        </Link>
        </div>
      </div>
    </div>

      <div className={styles.section}>
        <h1 className={styles.sectionTitle} style={{ textAlign: 'center' }}>지난 프로젝트</h1>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <div className={styles.cardImgContainer} style={{ backgroundColor: '#E2FFF8' }}>
              <img src={백} alt="팜투마켓" className={styles.cardImg} />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>팜투마켓</div>
              <div className={styles.cardDescription}>
                온라인 거래가 없으면 수익을 내기 어려운 현대 사회에서 전자기기 사용에 어려움을 겪는 노년층은 온라인 시장에서 자연스레 소외된다. 이처럼 소외계층 중심으로 기획된 농산물 공급자와 판매자를 중개 해주는 웹 커뮤니티 시스템 팜투마켓입니다.
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardImgContainer} style={{ backgroundColor: '#EAFFE4' }}>
              <img src={프론트} alt="DLIFEBOAT" className={styles.cardImg} />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>D.LIFEBOAT</div>
              <div className={styles.cardDescription}>
                방대한 정보의 홍수 속에서, 사용자가 정확하고 원하는 여행 정보만을 필요로할 때 사용할 수 있는 chat gpt 챗봇 형태의 서비스 입니다. 사용자가 입력한 키워드를 기반으로 유튜브 영상까지 추천
                해줍니다.
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardImgContainer} style={{ backgroundColor: '#DCDBFF' }}>
              <img src={디자인} alt="투자가머니" className={styles.cardImg} />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>투자가머니</div>
              <div className={styles.cardDescription}>
                라인연령제한, 지식부족, 자금부족, 사전에 정의되지 않은 주식 시장만의 용어로 인해 금융 투자에 어려움 느껴 시도조차 못하거나, 포기한 잘파세대들을 위한 블록체인 거래 기반 모의 주식 서비스
                투자가 머니 입니다.
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop:'90px' }}>
          <Link to= '/project-introduce' style={{ textDecoration: 'none' }}>
          <button className={styles.button}>더보기</button>
          </Link>
        </div>
      </div>

      <div className={styles.section} style={{backgroundColor: '#E0E8FF' }}>
        <h1 className={styles.sectionTitle} style={{ textAlign: 'center' }}>주요 연간일정</h1>

   
        <div className={styles.timelineContainer}>
          <div className={styles.timelineHeader}>
            {["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec","Jan"].map((month) => (
              <div key={month} className={styles.timelineMonth}>
                {month}
              </div>
            ))}
          </div>

          <div className={styles.timelineBody}>

          {[...Array(5)].map((_, lineIndex) => (
            <div
              key={lineIndex}
              className={styles.timelineLine}
              style={{
                top: `${lineIndex * 63}px`,
              }}
            />
          ))}
            {events.map((event, index) => {
              const startMonth = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec","Jan"].indexOf(event.months[0]);
              const endMonth = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"].indexOf(event.months[1]);

              const left = (startMonth / 12) * 100;  // startMonth를 12로 나누어 비율로 계산
              const width = ((endMonth - startMonth + 1) / 12) * 100;

              return (
                <div
                  key={index}
                  className={styles.timelineEvent}
                  style={{
                    top: `${event.line * 63}px`,
                    left: `${left}%`, 
                    width: `${width}%`,  
                    backgroundColor: event.color,  
                  }}
                >
                  {event.label}
                </div> 
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h1 className={styles.sectionTitle} style={{ textAlign: 'center' }}>자주 묻는 질문</h1>

        <div className={styles.faqContainer}>
          <div className={styles.faqCard}>
            <div className={styles.faqQuestion}>동아리 활동을 하려면 노트북이 필요한가요?</div>
            <div className={styles.faqAnswer}>
              동아리 특성상, 개인 노트북이 없을 경우 활동에 제한이 많이 있으므로 노트북은 필참입니다!
            </div>
          </div>

          <div className={styles.faqCard}>
            <div className={styles.faqQuestion}>저는 코딩을 처음 해보는데, 동아리 활동이 가능할까요?</div>
            <div className={styles.faqAnswer}>
              저희 강남대 멋쟁이 사자처럼 13기는 실력이 아닌, 열정적으로 동아리 활동을 하실 분들을 찾고 있습니다! 동아리 창립 이념에 따라, 코딩을 전혀 접해보지 않은
              비전공자분들도 입부를 받고 있습니다.
            </div>
          </div>

          <div className={styles.faqCard}>
            <div className={styles.faqQuestion}>여러가지 활동을 하는데 다 참여해야하나요?</div>
            <div className={styles.faqAnswer}>
              멋쟁이사자처럼은 기수 단위로 운영되는 동아리이고, 이에 따라 한 기수를 잘 마무리하면 수료증이 제공됩니다! 다만 동아리 중앙 OT, 아이디어톤, 해커톤 등과 같이 필참 활동을 하지 않으면
              수료증 발급이 불가능합니다!
            </div>
          </div>

          <div className={styles.faqCard}>
            <div className={styles.faqQuestion}>주요 활동에 있는 세션은 무엇인가요?</div>
            <div className={styles.faqAnswer}>
              세션이란 각 파트별로 운영진이 아기사자 대상으로 진행하는 강의를 의미합니다! 각 파트별로 세세한 차이점이 있지만, 10주차 내외로 진행되며 불가피한 사정(학교 측에서 인정하는 유고결석)이 아니면 결석을 허용하고 있지 않습니다!
            </div>
          </div>

          <div className={styles.faqCard}>
            <div className={styles.faqQuestion}>세 파트 전부 지원할 수 있나요?</div>
            <div className={styles.faqAnswer}>
              불가능합니다. 멋쟁이사자처럼에서는 하나의 파트를 선택 후 활동을 진행해, 수료증이 나와 여러 파트의 중복 지원은 불가합니다.
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default MainPage;
