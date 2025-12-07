import React, { useEffect, useRef, useState } from "react";
import styles from "../Room.module.css";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

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
              display: participant.isVideoOn ? "block" : "none",
            }}
          />
          {participant.isVideoOn && participant.stream &&(
            <div className={styles.videoOverlay}>
              <span className={styles.participantName}>
                {participant.name} {participant.isLocal && "(You)"}
                &nbsp;
                {participant.isAudioOn ? <MicIcon /> : <MicOffIcon />}
            
              
              </span>
            </div>
          )}
        </div>

        {!participant.isVideoOn && (
          <div className={styles.avatarPlaceholder}>
            <div className={styles.avatar}>
              {participant.name?.charAt(0) || "?"}
            </div>
            <span className={styles.participantName}>
              {participant.name} {participant.isLocal && "(You)"}
            </span>
            {participant.isAudioOn ? <MicIcon /> : <MicOffIcon />}
            <VideocamOffIcon />
          </div>
        )}
     {!participant.stream && (
          <div className={styles.avatarPlaceholder}>
            <div className={styles.avatar}>
              {participant.name?.charAt(0) || "?"}
            </div>
            <p style={{color:"#392c2cff"}}>
               Camera and Mic permission denied !
            </p>
           
          </div>
        )}


      </div>
    </div>
  );
};

export default React.memo(VideoTile);
