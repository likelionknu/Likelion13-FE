const SignupPage = () => {
  return (
    <div>
      <h1>회원가입</h1>
      <form>
        <input
          type='text'
          placeholder='아이디'
        />
        <input
          type='password'
          placeholder='비밀번호'
        />
        <button onClick={()=>{alert('회원가입 기능 미구현')}}>가입하기</button>
      </form>
    </div>
  )
}

export default SignupPage
