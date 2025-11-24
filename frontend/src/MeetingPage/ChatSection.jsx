// ChatSection.jsx
import React, { useEffect, useState } from "react";
import styles from "./Room.module.css";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/socketContext";

function ChatSection() {
  const { meetingCode } = useParams();
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();
  if (text.trim() === "") return;
  
  socket.emit("send-messages", {
    message: text,
    code: meetingCode
  });

  setText("");
};

useEffect(() => {
  if (!socket) return;

  socket.on("receive", (data) => {
    setMessages((prev) => [
      ...prev,
      {
        name: data.name,
        message: data.messages,
      },
    ]);
  });

  return () => {
    socket.off("receive");
  };
}, [socket]);

  return (
    <div className={styles.sidebarSection}>
      <h3 className={styles.sidebarTitle}>Chat</h3>

      <div className={styles.chatMessages}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.message}>
            <strong>{msg.name}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={styles.chatInput}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message for everyone....."
          className={styles.messageInput}
        />
        <button type="submit" className={styles.sendButton}>
          Send
        </button>
      </form>
    </div>
  );
}
export default ChatSection;
