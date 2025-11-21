import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SignupPage from "./Authpage/SignupPage.jsx";
import LoginPage from "./Authpage/loginPage.jsx";
import LandingPage from "./LandingPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeDashboard from "./Home/Home.jsx";
import { CookiesProvider } from "react-cookie";
import Index from "./MeetingPage/index.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CookiesProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomeDashboard />} />
         <Route path="/home/room" element={<Index />} />
      </Routes>
    </Router>
   </CookiesProvider>
  </StrictMode>
);
