// Room/VideoSection.jsx
import React from "react";
import styles from "./Room.module.css";

function VideoSection() {
  const participants = [
    { id: 1, name: "You", isVideoOn: true, isAudioOn: true },
    { id: 2, name: " Roshan", isVideoOn: true, isAudioOn: false },
     { id: 2, name: " Roshan", isVideoOn: true, isAudioOn: false },
      { id: 2, name: " Roshan", isVideoOn: true, isAudioOn: false },
       { id: 2, name: " Roshan", isVideoOn: true, isAudioOn: false },
        { id: 2, name: " Roshan", isVideoOn: true, isAudioOn: false },

  ];

  return (
    <div className={styles.videoSection}>
      <div className={styles.videoGrid}>
        {participants.map(participant => (
          <div key={participant.id} className={styles.videoTile}>
            <div className={styles.videoPlaceholder}>
              {participant.isVideoOn ? (
                <div className={styles.videoStream}>
                  <div className={styles.videoOverlay}>
                    <span className={styles.participantName}>
                      {participant.name}
                    </span>
                    {!participant.isAudioOn && (
                      <span className={styles.mutedIndicator}>🔇</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className={styles.avatarPlaceholder}>
                  <div className={styles.avatar}>
                    {participant.name.charAt(0)}
                  </div>
                  <span className={styles.participantName}>
                    {participant.name}
                  </span>
                  {!participant.isAudioOn && (
                    <span className={styles.mutedIndicator}>🔇</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoSection;