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
import { SocketProvider } from "./context/socketContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <CookiesProvider>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomeDashboard />} />
            <Route path="/home/:meetingCode" element={<Index />} />
          </Routes>
        </Router>
      </SocketProvider>
    </CookiesProvider>
  // </StrictMode>
);
