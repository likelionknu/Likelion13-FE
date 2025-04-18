import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'

import gsap from 'gsap'

import Nav from '../components/Nav'
import MainPage from '../Pages/MainPage'
import MyPage from '../Pages/MyPage'
import AdminPage from '../Pages/AdminPage'
import LoginPage from '../Pages/LoginPage'
import SignupPage from '../Pages/SignupPage'
import ForgotPasswordPage from '../Pages/ForgotPasswordPage'
import BackendQuestionPage from '../Pages/BackendQuestionPage'
import FrontendQuestionPage from '../Pages/FrontendQuestionPage'
import DesignQuestionPage from '../Pages/DesignQuestionPage'
import FrontIntroPage from '../Pages/FrontIntroPage'
import BackIntroPage from '../Pages/BackIntroPage'
import DesignIntroPage from '../Pages/DesignIntroPage'
import Footer from '../components/Footer'
import ProjectIntroPage from '../Pages/ProjectIntroPage'
import SubmitPage from '../Pages/SubmitPage'

import './Routes.css'

import { ReactNode } from 'react'

const PageTransition = ({ children }: { children: ReactNode }) => {
  const element = useRef(null)
  const location = useLocation()

  useEffect(() => {
    // 진입 애니메이션
    gsap.fromTo(
      element.current,
      {
        opacity: 0,
        y: 1,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1, // 1.5초 동안
        ease: 'power1.out',
      }
    )
  }, [location])

  return <div ref={element}>{children}</div>
}

const ScrollToTop = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return null
}

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className='pages-container'>
        <Nav />
        <Routes>
          <Route
            path='/'
            element={
              <PageTransition>
                <MainPage />
              </PageTransition>
            }
          />
          <Route
            path='/*'
            element={<MainPage />}
          />
          <Route
            path='/project-introduce'
            element={
              <PageTransition>
                <ProjectIntroPage />
              </PageTransition>
            }
          />
          <Route
            path='/mypage'
            element={<MyPage />}
          />

          <Route
            path='/admin'
            element={<AdminPage />}
          />
          
          <Route
            path='/login'
            element={
              <PageTransition>
                <LoginPage />
              </PageTransition>
            }
          />
          <Route
            path='/signup'
            element={<SignupPage />}
          />
          <Route
            path='forgot-password'
            element={<ForgotPasswordPage />}
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
            element={<FrontIntroPage />}
          />
          <Route
            path='/BackIntro'
            element={<BackIntroPage />}
          />
          <Route
            path='/DesignIntro'
            element={<DesignIntroPage />}
          />
          <Route
            path='/submit'
            element={<SubmitPage />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default Router
