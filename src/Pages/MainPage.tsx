import { Link } from 'react-router-dom'
import 침팬지 from '../assets/images/chim.jpg'

const MainPage = () => {
  return (
    <div>
      <h1>강남대학교 멋쟁이사자처럼 FE 개발현장 🚧</h1>

        <Link to='/SectionSelect'>
          <button>13기 참여하러 가기</button>
        </Link>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <h2> Color </h2>
        <div style={{ width: '50px', height: '50px', backgroundColor: '#165EE0' }}></div>
        <div style={{ width: '50px', height: '50px', backgroundColor: '#7899FE' }}></div>
        <div style={{ width: '50px', height: '50px', backgroundColor: '#49DAFC' }}></div>
      </div>
      <img src={침팬지} />

      <div>
        <h2>강남대학교 멋쟁이 사자처럼</h2>
        멋쟁이 사자처럼은 2013년 서울대학교에서 시작해, 올해로 13기째 활동 중인 전국 최대 규모의 웹 프로그래밍 동아리입니다. 강남대학교 멋쟁이 사자처럼은 2023년부터 11기로 활동을 시작해, 현재 3년째
        활발히 다양한 서비스를 개발하며 성장하고 있습니다. 이번 13기의 슬로건은 “Learn, Create, Elevate”로, 운영진과 아기사자가 함께 배우고, 창조하며, 성장하자는 뜻을 담고 있습니다. 우리는 이 슬로건에
        따라 서로의 부족한 부분을 채워가며 실질적인 활동 위주의 동아리 문화를 만들어가고자 합니다. 지금까지 그래왔듯, 실속 있는 활동들로 여러분들을 맞이할 준비를 마쳤습니다. 많은 관심과 지원
        부탁드립니다!
      </div>

      <div style={{ backgroundColor: '#E0E8FF' }}>
        <h2>같이 할수록 더 빛나는, 우리의 핵심 파트를 소개합니다!</h2>
        <div>
          <div>백엔드</div>
          <div>웹과 애플리케이션의 핵심 기능을 설계하고 구현하는 분야로, 주로 눈에 보이지 않는 서버와 데이터 베이스를 관리하며 서비스의 근간을 담당합니다.</div>
        </div>
        <div>
          <div>프론트엔드</div>
          <div>사용자가 서비스를 이용하는 인터페이스를 구축하는 분야로, 웹사이트와 애플리케이션의 디자인, 동작, 반응성을 설계합니다. 사용자가 직접 상호작용하는 모든 요소를 담당합니다.</div>
        </div>
        <div>
          <div>디자인</div>
          <div>
            사용자 경험과 사용자 인터페이스를 설계하여 화면과 서비스가 더 직관적이고 편리하게 사용될 수 있도록 돕는 작업을 담당합니다. 혁신적인 아이디어를 현실로 구현하는 데 중요한 역할을 합니다.{' '}
          </div>
        </div>
      </div>

      <div>
        <h2>지난 프로젝트</h2>
        <div>
          <div>팜투마켓</div>
          <div>
            온라인 거래가 없으면 수익을 내기 어려운 현대 사회에서 전자기기 사용에 어려움을 겪는 노년층은 온라인 시장에서 자연스레 소외된다. 이처럼 소외계층 중심으로 기획된 농산물 공급자와 판매자를
            중개 해주는 웹 커뮤니티 시스템 팜투마켓입니다.
          </div>
        </div>
        <div>
          <div>D.LIFEBOAT</div>
          <div>
            방대한 정보의 홍수 속에서, 사용자가 정확하고 원하는 여행 정보만을 필요로할 때 사용할 수 있는 chat gpt 챗봇 형태의 서비스 입니다. 사용자가 입력한 키워드를 기반으로 유튜브 영상까지 추천
            해줍니다.
          </div>
        </div>
        <div>
          <div>투자가머니</div>
          <div>
            라인연령제한, 지식부족, 자금부족, 사전에 정의되지 않은 주식 시장만의 용어로 인해 금융 투자에 어려움 느껴 시도조차 못하거나, 포기한 잘파세대들을 위한 블록체인 거래 기반 모의 주식 서비스
            투자가 머니 입니다.
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
