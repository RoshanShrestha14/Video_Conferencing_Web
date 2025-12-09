// Room/ParticipantsList.jsx
import React, { useEffect,useState } from "react";
import styles from "./Room.module.css";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { useSocket } from "../context/socketContext";

function ParticipantsList() {
  const socket = useSocket();
const [participants,setParticipants] = useState([]);
  useEffect(() => {
    if(!socket) return
    socket.on("participants", (data) => {
      console.log(data);

      setParticipants(data)
    });
  }, [socket]);

  return (
    <div className={styles.sidebarSection}>
      <h3 className={styles.sidebarTitle}>Participants  {participants.length}</h3>
      <div className={styles.participantsList}>
        {participants.map((participant) => (
          <div key={participant.userId} className={styles.participantItem}>
            <span className={styles.participantAvatar}>
              {participant.name.charAt(0)}
            </span>
            <span className={styles.participantName}>{participant.name}</span>
            <div className={styles.participantStatus}>
              {participant.isAudioOn ? <MicIcon /> : <MicOffIcon />}
              {participant.isVideoOn ? <VideocamIcon /> : <VideocamOffIcon />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParticipantsList;
