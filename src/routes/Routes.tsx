import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from '../components/Nav'
import MainPage from '../Pages/MainPage'
import MyPage from '../Pages/MyPage'
import LoginPage from '../Pages/LoginPage'
import SignupPage from '../Pages/SignupPage'
import SectionSelectPage from '../Pages/SectionSelectPage'
import BackendQuestionPage from '../Pages/BackendQuestionPage'
import FrontendQuestionPage from '../Pages/FrontendQuestionPage'
import DesignQuestionPage from '../Pages/DesignQuestionPage'
import FrontIntroPage from '../Pages/FrontIntroPage'
import BackIntroPage from '../Pages/BackIntroPage'
import DesignIntroPage from '../Pages/DesignIntroPage'


import Footer from '../components/Footer'
import WarningPage from '../Pages/WarningPage'
import CompletedPage from '../Pages/CompletedPage'
import ProjectIntroPage from '../Pages/ProjectIntroPage'

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
          path='/project-introduce'
          element={<ProjectIntroPage />}
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
        <Route
          path='/SectionSelect'
          element={<SectionSelectPage />}
        />
        <Route
          path='/backend-question'
          element={<BackendQuestionPage />}
        />
        <Route
          path='/frontend-question'
          element={<FrontendQuestionPage />}
        />
        <Route
          path='/design-question'
          element={<DesignQuestionPage />}
        />
        <Route
          path='/FrontIntro'
          element={<FrontIntroPage/>}
        />
        <Route
          path='/BackIntro'
          element={<BackIntroPage/>}
        />
        <Route
          path='/DesignIntro'
          element={<DesignIntroPage/>}
        />
        <Route
          path='/warning'
          element={<WarningPage />}
        />
        <Route
          path='/complete'
          element={<CompletedPage />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Router
