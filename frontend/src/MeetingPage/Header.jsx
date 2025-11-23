import React from "react";
import styles from "./Room.module.css";
import PeopleIcon from '@mui/icons-material/People';
import CopyAllIcon from '@mui/icons-material/CopyAll';

function Header({code}) {
  const meetingCode = code;
  const participantsCount = null;

  return (
    <header className={styles.header}>
      <div className={styles.meetingInfo}>
        <h1 className={styles.meetingTitle}>Collab Anytime</h1>
        <div className={styles.meetingCode}>
         Meeting Code: <strong>{meetingCode}</strong>
        </div>
      </div>
      <div className={styles.headerActions}>
        <button className={styles.inviteButton}>
           <CopyAllIcon/> Copy Invite
        </button>
        <button className={styles.participantsButton}>
          <PeopleIcon/> Participants ({participantsCount})
        </button>
      </div>
    </header>
  );
}

export default Header;