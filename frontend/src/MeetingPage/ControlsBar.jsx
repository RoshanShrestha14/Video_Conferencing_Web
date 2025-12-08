// Room/ControlsBar.jsx
import React from "react";
import styles from "./Room.module.css";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import ChatIcon from "@mui/icons-material/Chat";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { useMedia } from "../context/MediaProvider";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { useSocket } from "../context/socketContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ControlsBar() {
  const {
    isVideoOn,
    isAudioOn,
    toggleVideo,
    toggleAudio,
    stopAllTracks,
    isScreenSharing,
    startScreenShare,
    stopScreenShare,
  } = useMedia();
  const socket = useSocket();
  const { meetingCode } = useParams();
  const navigate = useNavigate();

  const handleScreenShare = async () => {
    if (isScreenSharing) {
      await stopScreenShare();
    } else {
      await startScreenShare();
    }
  };

  const handleAudio = () => {
    const audioStatus = toggleAudio();
    socket.emit("audio-status", {
      socketId: socket.id,
      meetingCode: meetingCode,
      audioStatus: audioStatus,
    });
  };

  const handleVideo = () => {
    const videoStatus = toggleVideo();
    socket.emit("video-status", {
      socketId: socket.id,
      meetingCode: meetingCode,
      videoStatus: videoStatus,
    });
  };

  const handleQuit = () => {
     socket.emit("leave-meeting", {
      socketId: socket.id,
      meetingCode: meetingCode,
    });
   
    let message = "Bye Bye leaving the meeting !"
    socket.emit("send-messages",{
      message:message,
      code:meetingCode
    })
    stopAllTracks();
    navigate("/home");
   
  };
  return (
    <footer className={styles.controlsBar}>
      <div className={styles.controlsLeft}>
        <span className={styles.meetingTime}>time</span>
      </div>

      <div className={styles.controlsCenter}>
        <button className={styles.controlButton} onClick={handleAudio}>
          {isAudioOn ? <MicIcon /> : <MicOffIcon />}
        </button>
        <button className={styles.controlButton} onClick={handleVideo}>
          {isVideoOn ? <VideocamIcon /> : <VideocamOffIcon />}
        </button>
        <button onClick={handleScreenShare} className={styles.controlButton}>
          <ScreenShareIcon /> {isScreenSharing?"Stop Screen Share":"Start Screen Share"}
        </button>
        <button className={styles.controlButton}>
          <ChatIcon />
          Chat
        </button>
      </div>

      <div className={styles.controlsRight}>
        <button className={styles.leaveButton} onClick={handleQuit}>
          <PhoneEnabledIcon /> Leave Meeting
        </button>
      </div>
    </footer>
  );
}

export default ControlsBar;
