// Room/index.js
import React from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import ControlsBar from "./ControlsBar";
import styles from "./Room.module.css";

function Room() {
  return (
    <div className={styles.roomContainer}>
      <Header />
      <MainContent />
      <ControlsBar />
    </div>
  );
}

export default Room;