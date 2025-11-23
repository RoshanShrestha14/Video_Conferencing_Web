// Room/ChatSection.jsx
import React from "react";
import styles from "./Room.module.css";

function ChatSection() {
  
  return (
    <div className={styles.sidebarSection}>
      <h3 className={styles.sidebarTitle}>Chat</h3>
      <div className={styles.chatMessages}>
        <div className={styles.message}>
          <strong>Me:</strong> hi
        </div>
        
      </div>
      <div className={styles.chatInput}>
        <input 
          type="text" 
          placeholder="Type a message..."
          className={styles.messageInput}
        />
        <button className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatSection;