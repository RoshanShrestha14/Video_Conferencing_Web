// Room/MainContent.jsx
import React from "react";
import VideoSection from "./VideoSection";
import Sidebar from "./SlideBar";
import styles from "./Room.module.css"

function MainContent() {
  return (
    <div className={styles.mainContent}>
      <VideoSection />
      <Sidebar />
    </div>
  );
}

export default MainContent;