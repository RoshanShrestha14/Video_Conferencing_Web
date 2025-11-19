import React from "react";
import styles from "./History.module.css";

function History() {
  return (
    <div className={styles.historySection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Meeting History</h2>
      </div>
       <div className={styles.historyList}>
          
          {/* Meeting History Item 1 */}
          <div className={styles.historyItem}>
            <div className={styles.meetingInfo}>
              <div className={styles.meetingMeta}>
                <span>Code: <strong>ABC123DEF</strong></span>
                <span>Date: <strong>Dec 15, 2023</strong></span>
                <span>Participants: <strong>8</strong></span>
              </div>
            </div>
          </div>
    </div>
    </div>
  );
}

export default History;
