import React from "react";
import styles from "./HomeDashboard.module.css";
import Hero from "./Hero.jsx";
import LeftSection from "./LeftSection.jsx";
import History from "./History.jsx";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const HomeDashboard = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3002/auth/check",
          {},
          { withCredentials: true }
        );
        const { success, user } = data;
        if (success) {
          setUsername(user);
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        removeCookie("token");
        navigate("/login");
      }
    };

    verifyCookie();
  }, []);

  return (
    <div className={styles.container}>
      <Hero user={username} />
      <div style={{ marginTop: "2rem" }}>
        <LeftSection />
      </div>
      <div style={{ marginTop: "2rem" }}>
        <History />
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomeDashboard;
