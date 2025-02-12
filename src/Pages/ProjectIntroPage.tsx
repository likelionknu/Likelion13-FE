import { useState } from "react";

import styles from  '../assets/ProjectIntroPage.module.css';
import Project1 from '../assets/images/Project1.png';
import Project2 from '../assets/images/Project2.png';
import Project3 from '../assets/images/Project3.png';
import Project4 from '../assets/images/Project4.png';
import Project5 from '../assets/images/Project5.png';
import Project6 from '../assets/images/Project6.png';
import Project7 from '../assets/images/Project7.png';
import Project8 from '../assets/images/Project8.png';
import Project9 from '../assets/images/Project9.png';
import Project10 from '../assets/images/Project10.png';
import Project11 from '../assets/images/Project11.png';
import Project12 from '../assets/images/Project12.png';
import Project13 from '../assets/images/Project13.png';
import Project14 from '../assets/images/Project14.png';

const ProjectIntroPage = () => {
  const [currentGeneration, setCurrentGeneration] = useState("12기");

  const projects = [
    {
      generation: "11기",
      projects: [
        { title: "팜투마켓", description: "온라인 거래가 없으면 수익을 내기 어려운 현대 사회에서 전자기기 사용에 어려움을 겪는 노년층은 온라인 시장에서 자연스레 소외된다. 이처럼 소외계층 중심으로 기획된 농산물 공급자와 판매자를 중개 해주는 웹 커뮤니티 시스템 팜투마켓입니다.", image: Project1 },
        { title: "D.LIFEBOAT", description: "방대한 정보의 홍수 속에서, 사용자가 정확하고 원하는 여행 정보만을 필요로할 때 사용할 수 있는 chat gpt 챗봇 형태의 서비스 입니다. 사용자가 입력한 키워드를 기반으로 유튜브 영상까지 추천 해줍니다.", image: Project2},
        { title: "투자가머니", description: "라인연령제한, 지식부족, 자금부족, 사전에 정의되지 않은 주식 시장만의 용어로 인해 금융 투자에 어려움 느껴 시도조차 못하거나, 포기한  잘파세대들을 위한 블록체인 거래 기반 모의 주식 서비스 투자가 머니 입니다.", image: Project3},
        { title: "안전행", description: "외교부 정보를 바탕으로 여행 경보 단계 확인, 유의할 점 제시 등 해외 안전 정보를 사용자에게 간단하고 알기 쉽게 전달하며, 안전 커뮤니티를 통해 모든 유저가 서로 안전 정보를 공유 할 수 있는 서비스 입니다.", image: Project4},
        { title: "코인슈터", description: "진입 장벽이 높은 가상화폐 거래, ‘디지털 격차’를 해소하기 위해 ‘암호화폐’와 ‘가상화폐 거래소 이용 방법’에 대한 다양한 문제들을 사용자가 직접 풀어보며 단순히 지식 전달이아닌 지식 학습이 가능한 웹 서비스 코인슈터입니다.", image: Project5},
        { title: "미미키", description: "세대 간의 깊어지는 언어 격차를 극복하고자 기획한 서비스입니다. 예전에 사용했던 용어, 현재 뜨는 밈 등 세대가 지나며 새로 생긴 모든 유행어들을 모아 놓은 웹 커뮤니티 서비스 미미키입니다.", image: Project6},
        { title: "시니어몬드", description: "시니어몬드는 어르신들을 고려하지 않고 UI를 단순히 제공하기만 하는 현 시대의 문제점을 발견하였습니다. 아무리 좋은 UX여도 사용하는 방법 자체가 어려운 어르신들께 UI 교육을 제공하는 교육 멘토 플랫폼을 개발하였습니다.", image: Project7},
        { title: "Challengers", description: "교내의 사이드 프로젝트 추적이 가능한 저장소 서비스입니다. 전교 학생들의 사이드 프로젝트 참여율과 동기부여를 높이고, 학교의 개발 문화도 외부로 알릴 수 있는 메리트가 있습니다.", image: Project8},
        { title: "Apply", description: "강대 멋사만의 아기사자들을 모집하기 위해 필요한 지원 페이지를 지속 가능하게 개발하는 팀입니다. 예비 아기사자들을 위한 지원 페이지부터, 유저의 정보, 권한을 수정하고 지원서를 보며 결과를 정하는 운영진 페이지까지 제작합니다.", image: Project9},
      ],
    },
    {
      generation: "12기",
      projects: [
        { title: "Node", description: "Node는  4D블럭이라는 별도의 매개체와 AI의 이미지 학습을 통해 사용자가 여러가지 블럭을 조합하고 정확도를 평가하고 기록해 나가는 서비스입니다. ", image: Project10 },
        { title: "프롬프렌", description: "프롬프렌은 AI 사용이 어려운 사람들도 효과적으로 사용할 수 있도록 돕는 프롬포트 공유 서비스입니다. 다양한 카테고리의 프롬포트를 검색하고, 공유해 다양한 프롬포트를 활용할 수 있고, 관련 예시를 제공합니다. ", image: Project11},
        { title: "FRESH-TIME", description: "FRESH-TIME은 사용자의 행동 패턴을 분석하고 알림을 통해, 바른 자세의 유지를 통해 신체 건강의 유지를 촉진하는 서비스입니다.  사용자의 활동 데이터를 기반으로 시각화 된 통계를 제공하고, 도전과제와 출석 기능을 통해 적극적인 참여를 유도합니다.", image: Project12},
        { title: "NEWSPECT", description: "필터버블과 확증편향에 치우져진 현대 사회의 정신 건강을 해결하기 위한 서비스로서, 특정 주제에 관한 키워드를 다양한 언론사에서 제공하는 기사를 보여주고, 편향적이지 않은 객관적이고 정보만을 제공합니다.", image: Project13},
        { title: "TIME2DO", description: "TIME2DO는 2024년의 신규 키워드 도파밍(Dopamine + Farming)을 해결하기 위한 서비스입니다.  도파민 중독에서 벗어나 업무 집중도와 효율성을 높이기 위해 뽀모도로 기능과 투두리스트를 통한 사용자의 업무 및 휴식 관리를 유도합니다.", image: Project14},
      ],
    },
  ];

  const filteredProjects = projects.find(
    (p) => p.generation === currentGeneration
  )?.projects || []; 

  return (
    <div className={styles.ProjectIntroPage}>
      <header className={styles.header}>
      <h1 className={styles.title}>프로젝트</h1>
      <div className={styles.generationButtons}>
          <button
            onClick={() => setCurrentGeneration("11기")}
            className={
              currentGeneration === "11기"
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
          >
            11기
          </button>
          <button
            onClick={() => setCurrentGeneration("12기")}
            className={
              currentGeneration === "12기"
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
          >
            12기
          </button>
        </div>
      </header>

      <main className={styles.projectsContainer}>
        {filteredProjects.map((project, index) => {

const columnIndex = index % 3;
const backgroundColor =
            columnIndex === 0
              ? "#E2FFF8"
              : columnIndex === 1
              ? "#EAFFE4"
              : "#DCDBFF";
              
        return (
          <div key={index} className={styles.projectCard}
          style={{ animationDelay: `${index * 0.1}s` }}  >
            <div className={styles.cardImgContainer}
            style={{textAlign: 'center', backgroundColor }}
            ><img src={project.image} alt={project.title} className={styles.image} /></div>
            <div className={styles.projectTitle}>{project.title}</div>
            <p className={styles.projectDescription}>{project.description}</p>
          </div>
        );
        })}
      </main>
    </div>
  );
};

export default ProjectIntroPage;