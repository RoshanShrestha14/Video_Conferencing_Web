import React, { useEffect, useRef, useState } from "react";
import styles from "./Room.module.css";
import MicOffIcon from "@mui/icons-material/MicOff";
import { useMedia } from "../context/MediaProvider";

function VideoSection({ username, userId }) {
  const { localStream, isVideoOn, isAudioOn } = useMedia();

  const [participants, setParticipants] = useState([]);
  const videoRefs = useRef({});
  useEffect(() => {

  
    if (userId && username && localStream) {
      const newParticipant = {
        id: userId,
        name: username,
        isVideoOn: isVideoOn,
        isAudioOn: isAudioOn,
      };
        setParticipants((prev)=>[
          ...prev,
          newParticipant]);
    }
  }, [userId, username, localStream, isVideoOn, isAudioOn]);

useEffect(() => {
  if (localStream && participants.length > 0) {
    const videoEl = videoRefs.current[userId];
    if (videoEl) {
      videoEl.srcObject = localStream;
      videoEl.play().catch((err) => {
        console.error("Error playing video:", err);
      });
    }
  }


}, [localStream, participants]);

  const setVideoRef = (element, participantId) => {
    if (element) {
      videoRefs.current[participantId] = element;
    }
  };

  return (
    <div className={styles.videoSection}>
      <div className={styles.videoGrid}>
        {participants.map((participant) => (
          <div key={participant.id} className={styles.videoTile}>
            <div className={styles.videoPlaceholder}>
              {participant.isVideoOn ? (
                <div className={styles.videoStream}>
                  <video
                    ref={(el) => setVideoRef(el, participant.id)}
                    autoPlay
                    muted
                    playsInline
                    className={styles.videoElement}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      backgroundColor: "#000",
                    }}
                  />
                  <div className={styles.videoOverlay}>
                    <span className={styles.participantName}>
                      {participant.name}
                    </span>
                    {!participant.isAudioOn && (
                      <span className={styles.mutedIndicator}>
                        <MicOffIcon />
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className={styles.avatarPlaceholder}>
                  <div className={styles.avatar}>
                    {participant.name ? participant.name.charAt(0) : "?"}
                  </div>
                  <span className={styles.participantName}>
                    {participant.name}
                  </span>
                  {!participant.isAudioOn && (
                    <span className={styles.mutedIndicator}>
                      <MicOffIcon />
                    </span>
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
