import React from "react";
import styles from "./Room.module.css";
import PeopleIcon from '@mui/icons-material/People';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Header({code,userName}) {
  const meetingCode = code;
  const participantsCount = null;

  return (
    <header className={styles.header}>
      <div className={styles.meetingInfo}>
        <h1 className={styles.meetingTitle}><AccountCircleIcon/>{userName}</h1>
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