// Room/MainContent.jsx
import React,{useState} from "react";
import VideoSection from "./VideoSection";
import Sidebar from "./SlideBar";
import styles from "./Room.module.css"

function MainContent({userName,pUserId}) {
  const [sharedParticipants, setSharedParticipants] = useState([]);
  
  // This function receives updated participants
  const handleParticipantsUpdate = (newParticipants) => {
    setSharedParticipants(newParticipants);
  };


  return (
    <div className={styles.mainContent}>
      <VideoSection  username={userName}  pUserId={pUserId}  onParticipantsChange={handleParticipantsUpdate}/>
      <Sidebar  participants={sharedParticipants} />
    </div>
  );
}

export default MainContent;