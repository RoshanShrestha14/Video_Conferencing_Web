import React from "react";
import styles from "./Room.module.css";
import MicOffIcon from '@mui/icons-material/MicOff';

function VideoSection() {
  const participants = []

  return (
    <div className={styles.videoSection}>
      <div className={styles.videoGrid}>
        {participants.map((participant) => (
          <div key={participant.id} className={styles.videoTile}>
            <div className={styles.videoPlaceholder}>
              {participant.isVideoOn ? (
                <div className={styles.videoStream}>
                  <div className={styles.videoOverlay}>
                    <span className={styles.participantName}>
                      {participant.name}
                    </span>
                    {!participant.isAudioOn && (
                      <span className={styles.mutedIndicator}><MicOffIcon/></span>
                    )}
                  </div>
                </div>
              ) : (
                <div className={styles.avatarPlaceholder}>
                  <div className={styles.avatar}>
                    {participant.name ? participant.name.charAt(0) : '?'}
                  </div>
                  <span className={styles.participantName}>
                    {participant.name}
                  </span>
                  {!participant.isAudioOn && (
                    <span className={styles.mutedIndicator}><MicOffIcon/></span>
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
