import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SignupPage from "./Authpage/SignupPage.jsx";
import LoginPage from "./Authpage/loginPage.jsx";
import LandingPage from "./LandingPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeDashboard from "./Home/Home.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomeDashboard />} />
      </Routes>
    </Router>
  </StrictMode>
);
