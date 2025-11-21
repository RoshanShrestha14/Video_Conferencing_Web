import React from "react";
import styles from "./allComponents.module.css";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import PeopleIcon from "@mui/icons-material/People";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>Add Participants</h1>
          <h5 className={styles.title1}>Meeting Code :</h5>
        </div>
        
        <div className={styles.navBtns}>
          <button className={styles.btn}>
            <CopyAllIcon sx={{ color: '#053971bd' }}/> Copy Invite
          </button>
          <button className={styles.btn}>
            <PeopleIcon sx={{ color: '#053971bd'  }}/> Participants (2)
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;