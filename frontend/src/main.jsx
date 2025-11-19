import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SignupPage from './Authpage/SignupPage.jsx'
import LoginPage from './Authpage/loginPage.jsx'
import LandingPage from './LandingPage.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LandingPage />
  </StrictMode>,
)
