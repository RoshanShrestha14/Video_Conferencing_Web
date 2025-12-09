import React, { useEffect, useState } from "react";
import styles from "./History.module.css";
import API from "../api/api";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await API.get("/meeting/history", {
          withCredentials: true,
        });
        if (response.data.success) {
          setHistory(response.data.history);
        }
      } catch (err) {
        console.error("Error in fetching history:", err);
      }
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    console.log("hsitory is", history);
  }, [history]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.historySection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Meeting History</h2>
      </div>
      <div className={styles.historyList}>
        {history.map((h) => (
          <div className={styles.historyItem}>
            <div className={styles.meetingInfo}>
              <div className={styles.meetingMeta}>
                <span>
                 Meeting Code: <strong>{h.meetingCode}</strong>
                </span>
                <span>
                  Date: <strong>{formatDate(h.date)}</strong>
                </span>
                <span>
                  Participants: <strong>{h.totalParticipants}</strong>
                </span>
                <span>
                  Host Name: <strong>{h.hostName}</strong>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {history.length===0 && (
        <div className={styles.historyItem}>
            <div className={styles.meetingInfo}>
              <div className={styles.meetingMeta}>
                <span>
                 <strong> You have'nt joined any meetings </strong>
                </span>
               
              </div>
            </div>
          </div>


      )}
    </div>
  );
}

export default History;
