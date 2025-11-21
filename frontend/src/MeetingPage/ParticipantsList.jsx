// Room/ParticipantsList.jsx
import React from "react";
import styles from "./Room.module.css";

function ParticipantsList() {
  const participants = [
    { id: 1, name: "You", isVideoOn: true, isAudioOn: true },
    { id: 2, name: "John Doe", isVideoOn: true, isAudioOn: false },
    { id: 3, name: "Jane Smith", isVideoOn: false, isAudioOn: true },
    { id: 4, name: "Mike Johnson", isVideoOn: true, isAudioOn: true }
  ];

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
              {participant.isAudioOn ? '🎤' : '🔇'}
              {participant.isVideoOn ? '📹' : '❌'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParticipantsList;