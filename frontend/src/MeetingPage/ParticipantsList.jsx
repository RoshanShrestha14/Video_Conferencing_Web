// Room/ParticipantsList.jsx
import React from "react";
import styles from "./Room.module.css";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';



function ParticipantsList() {
  const participants = [
    { id: 1, name: "You", isVideoOn: true, isAudioOn: true },
    { id: 2, name: "Roshan", isVideoOn: false, isAudioOn: true },
  ]

  return (
    <div className={styles.sidebarSection}>
      <h3 className={styles.sidebarTitle}>Participants</h3>
      <div className={styles.participantsList}>
        {participants.map(participant => (
          <div key={participant.id} className={styles.participantItem}>
            <span className={styles.participantAvatar}>
              {participant.name.charAt(0)}
            </span>
            <span className={styles.participantName}>
              {participant.name}
            </span>
            <div className={styles.participantStatus}>
              {participant.isAudioOn ? <MicIcon/> : <MicOffIcon/>}
              {participant.isVideoOn ? <VideocamIcon/> : <VideocamOffIcon/>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParticipantsList;