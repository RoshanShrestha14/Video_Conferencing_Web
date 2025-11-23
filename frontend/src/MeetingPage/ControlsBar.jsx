// Room/ControlsBar.jsx
import React from "react";
import styles from "./Room.module.css";
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';


function ControlsBar() {
  return (
    <footer className={styles.controlsBar}>
      <div className={styles.controlsLeft}>
        <span className={styles.meetingTime}>00:15:23</span>
      </div>
      
      <div className={styles.controlsCenter}>
        <button className={styles.controlButton}>
          <MicOffIcon/> Mute
        </button>
        <button className={styles.controlButton}>
          <VideocamOffIcon/> Stop Video
        </button>
        <button className={styles.controlButton}>
          <ScreenShareIcon/> Share Screen
        </button>
        <button className={styles.controlButton}>
          <ChatIcon/>Chat
        </button>

      </div>
      
      <div className={styles.controlsRight}>
        <button className={styles.leaveButton}>
          <PhoneEnabledIcon/> Leave Meeting
        </button>
      </div>
    </footer>
  );
}

export default ControlsBar;