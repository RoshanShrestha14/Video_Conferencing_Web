// Room/MainContent.jsx
import React from "react";
import VideoSection from "./VideoSection";
import Sidebar from "./SlideBar";
import styles from "./Room.module.css"

function MainContent({userName,userId}) {
  return (
    <div className={styles.mainContent}>
      <VideoSection  username={userName}  userId={userId}/>
      <Sidebar />
    </div>
  );
}

export default MainContent;