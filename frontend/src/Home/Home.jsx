import React from "react";
import styles from "./HomeDashboard.module.css";
import Hero from "./Hero.jsx";
import LeftSection from "./LeftSection.jsx";
import History from "./History.jsx";

const HomeDashboard = () => {
  return (
    <div className={styles.container}>
      <Hero />
      <div style={{ marginTop: "2rem" }}>
        <LeftSection />
      </div>
      <div style={{ marginTop: "2rem" }}>
        <History />
      </div>
    </div>
  );
};
export default HomeDashboard;
