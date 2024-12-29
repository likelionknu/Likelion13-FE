const MyPage = () => {
  return (
    <div>
      <h1>마이페이지</h1>
      <form>
        <button
          onClick={() => {
            alert('정보수정 미구현, 새로고침 됩니다')
          }}
        >
          내 정보를 수정할래요
        </button>
        <button
          onClick={() => {
            alert('합격 페이지 미구현, 새로고침 됩니다')
          }}
        >
          합격결과 볼래요
        </button>
      </form>
    </div>
  )
}

export default MyPage
