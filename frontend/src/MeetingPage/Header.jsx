// Room/Header.jsx
import React from "react";
import styles from "./Room.module.css";

function Header() {
  const meetingCode = "ABC123XYZ";
  const participantsCount = 4;

  return (
    <header className={styles.header}>
      <div className={styles.meetingInfo}>
        <h1 className={styles.meetingTitle}>Team Standup</h1>
        <div className={styles.meetingCode}>
          Meeting Code: <strong>{meetingCode}</strong>
        </div>
      </div>
      <div className={styles.headerActions}>
        <button className={styles.inviteButton}>
          📋 Copy Invite
        </button>
        <button className={styles.participantsButton}>
          👥 Participants ({participantsCount})
        </button>
      </div>
    </header>
  );
}

export default Header;