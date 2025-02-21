// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <App />

  // 개발모드 검사도구, console 두번찍힘
  // <StrictMode>
  //     <App />
  // </StrictMode>
)
