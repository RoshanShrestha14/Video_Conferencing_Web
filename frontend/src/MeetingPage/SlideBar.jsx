// Room/Sidebar.jsx
import React from "react";
import ParticipantsList from "./ParticipantsList";
import ChatSection from "./ChatSection";
import styles from "./Room.module.css";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <ParticipantsList/>
      <ChatSection />
    </aside>
  );
}

export default Sidebar;