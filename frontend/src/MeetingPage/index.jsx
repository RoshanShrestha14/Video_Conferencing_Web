import React, { useEffect } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/socketContext";

import MainContent from "./MainContent";
import ControlsBar from "./ControlsBar";
import styles from "./Room.module.css";

function Room() {
  const { meetingCode } = useParams();
  const socket = useSocket();
  useEffect(() => {
    if (!socket || !meetingCode) return;

    socket.on("connect", () => {
      console.log("Connected with ID:", socket.id);
    });
    return () => {
      socket.off("connect", handleConnect);
    };
  }, [socket, meetingCode]);

  return (
    <div className={styles.roomContainer}>
      <Header code={meetingCode} />
      <MainContent />
      <ControlsBar />
    </div>
  );
}

export default Room;
