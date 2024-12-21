import { useState } from 'react'
import 침팬지 from '../assets/images/chim.jpg'

const MainPage = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>강남대학교 멋쟁이사자처럼 FE 개발현장 🚧</h1>
      <img src={침팬지} />
      <div>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>

      <div>
        <h2> Color </h2>
        <div style={{ width: '50px', height: '50px', backgroundColor: '#4A7EDC' }}></div>
      </div>
    </div>
  )
}

export default MainPage
