import React, { useState } from "react";
import styles from "./LeftSection.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LeftSection() {
    const navigate = useNavigate();
  const [text, setText] = useState("");

  const createMeeting = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/meeting/new",
        {},
        { withCredentials: true }
      );

      if(response.data.success)
      {
        let  meetingCode = response.data.meeting.meetingCode;
          navigate(`/home/${meetingCode}`)
      }
    } catch (err) {
      console.error("Error creating meeting:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
 

    setText("");
   
  };

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.icon}>🎥</div>
        <h2 className={styles.cardTitle}>New Meeting</h2>
        <p className={styles.cardDescription}>
          Start an instant meeting with one click
        </p>
        <button
          className={`${styles.button} ${styles.primaryButton}`}
          onClick={createMeeting}
        >
          Create New Meeting
        </button>
        <p className={styles.cardFooter}>
          No setup required • Start immediately
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>🔗</div>
        <h2 className={styles.cardTitle}>Join Meeting</h2>
        <div className={styles.inputGroup}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter meeting code (e.g., ABC123XYZ)"
              className={styles.input}
            />{" "}
            &nbsp;&nbsp;
            <button
              className={`${styles.button} ${styles.successButton}`}
              type="submit"
            >
              Join Meeting
            </button>
          </form>
        </div>
        <p className={styles.cardFooter}>Enter code provided by meeting host</p>
      </div>
    </div>
  );
}

export default LeftSection;
