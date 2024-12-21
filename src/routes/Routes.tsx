import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from '../components/Nav'
import MainPage from '../Pages/MainPage'
import MyPage from '../Pages/MyPage'
import LoginPage from '../Pages/LoginPage'
import SignupPage from '../Pages/SignupPage'

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route
          path='/'
          element={<MainPage />}
        />
        <Route
          path='/*'
          element={<MainPage />}
        />
        <Route
          path='/mypage'
          element={<MyPage />}
        />
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          path='/signup'
          element={<SignupPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
