import React from "react";
import { useEffect, useRef } from "react";
import styles from "../Room.module.css";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from '@mui/icons-material/Mic';


const VideoTile = ({ participant }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && participant.stream) {
      videoRef.current.srcObject = participant.stream;
      videoRef.current.play().catch(console.error);
    }
  }, [participant.stream]);

  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className={styles.videoTile}>
      <div className={styles.videoPlaceholder}>
        {participant.stream ? (
          <div className={styles.videoStream}>
            <video
              ref={videoRef}
              autoPlay
              muted={participant.isLocal}
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div className={styles.videoOverlay}>
              <span className={styles.participantName }>
                {participant.name} {participant.isLocal && "(You)"}
              </span>
                {!participant.isLocal && participant.isAudioOn?<MicIcon/>:<MicOffIcon/>}
            </div>
          </div>
        ) : (
          <div className={styles.avatarPlaceholder}>
            <div className={styles.avatar}>
              {participant.name?.charAt(0) || "?"}
            </div>
            <span className={styles.participantName}>
              {participant.name} {participant.isLocal && "(You)"}
            </span>
            {participant.isAudioOn?<MicIcon/>:<MicOffIcon/>}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(VideoTile);
