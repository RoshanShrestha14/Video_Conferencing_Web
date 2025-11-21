// Room/ControlsBar.jsx
import React from "react";
import styles from "./Room.module.css";

function ControlsBar() {
  return (
    <footer className={styles.controlsBar}>
      <div className={styles.controlsLeft}>
        <span className={styles.meetingTime}>00:15:23</span>
      </div>
      
      <div className={styles.controlsCenter}>
        <button className={styles.controlButton}>
          🎤 Mute
        </button>
        <button className={styles.controlButton}>
          📹 Stop Video
        </button>
        <button className={styles.controlButton}>
          📱 Share Screen
        </button>
        <button className={styles.controlButton}>
          💬 Chat
        </button>
        <button className={styles.controlButton}>
          ⚙️ Settings
        </button>
      </div>
      
      <div className={styles.controlsRight}>
        <button className={styles.leaveButton}>
          📞 Leave Meeting
        </button>
      </div>
    </footer>
  );
}

export default ControlsBar;