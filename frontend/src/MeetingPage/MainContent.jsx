// Room/MainContent.jsx
import React from "react";
import VideoSection from "./VideoSection";
import Sidebar from "./SlideBar";
import styles from "./Room.module.css"

function MainContent({userName,pUserId}) {

  return (
    <div className={styles.mainContent}>
      <VideoSection  username={userName}  pUserId={pUserId}/>
      <Sidebar  />
    </div>
  );
}

export default MainContent;