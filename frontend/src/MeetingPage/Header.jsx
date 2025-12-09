import React,{useState} from "react";
import styles from "./Room.module.css";
import PeopleIcon from '@mui/icons-material/People';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Header({code,userName}) {
  const meetingCode = code;
    const [copied, setCopied] = useState(false);

   const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(meetingCode);
      setCopied(true);


      setTimeout(() => setCopied(false), 2000); // Remove message after 2 sec
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.meetingInfo}>
        <h1 className={styles.meetingTitle}><AccountCircleIcon/>{userName.toUpperCase()}</h1>
        <div className={styles.meetingCode}>
         Meeting Code: <strong>{meetingCode}</strong>
        </div>
      </div>
      <div className={styles.headerActions}>
        <button onClick={handleCopy} className={styles.inviteButton}>
        
           <CopyAllIcon/> {copied?"Copied Meeting Code":"Copy Meeting Code"}
        </button>
     
      </div>
    </header>
  );
}

export default Header;