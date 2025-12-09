import React, { useState } from "react";
import styles from "./LeftSection.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PhonelinkIcon from "@mui/icons-material/Phonelink";

function LeftSection() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [isMeetingExist, setIsMeetingExist] = useState(true);

  const createMeeting = async () => {
    try {
      const response = await API.post(
        "/meeting/new",
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        let meetingCode = response.data.meeting.meetingCode;
        navigate(`/roomPreview/${meetingCode}`);
      }
    } catch (err) {
      console.error("Error creating meeting:", err);
    }
  };

  const handleSubmit = async (e) => {
    if (text.trim() === "") return;
    e.preventDefault();
    try {
      const response = await API.post(
        "/meeting/join",
        {
          meetingCode: text,
        },
        {
          withCredentials: true,
        }
      );
      if (!response.data.success) {
        setIsMeetingExist(false);
        return;
      }
      navigate(`/roomPreview/${text}`);
    } catch (err) {
      console.log("error in join meeting", err);
    }
  };

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <VideoCallIcon sx={{ fontSize: "5rem", color: "#17054f98" }} />
        </div>
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
        <div className={styles.icon}>
          <PhonelinkIcon sx={{ fontSize: "5rem", color: "#17054fb7" }} />
        </div>
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
        {!isMeetingExist && (
          <p style={{ color: "red" }}>Meeting doesn't Exist</p>
        )}
        <p className={styles.cardFooter}>Enter code provided by meeting host</p>
      </div>
    </div>
  );
}

export default LeftSection;
