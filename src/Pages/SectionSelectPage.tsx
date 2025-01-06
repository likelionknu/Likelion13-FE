import { useNavigate } from "react-router-dom";

const SectionSelectPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>섹션 선택 페이지 - 각 세션 질문파트 미구현</h1>
      <div>
        <button onClick={() => navigate("/backend-question")}>백엔드 파트</button>
        <button onClick={() => navigate("/frontend-question")}>프론트엔드 파트</button>
        <button onClick={() => navigate("/design-question")}>디자인 파트 </button>
      </div>
    </div>
  )
}

export default SectionSelectPage
