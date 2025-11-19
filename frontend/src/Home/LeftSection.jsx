import React from "react";
import styles from "./LeftSection.module.css";
function LeftSection() {
  return (
    <div className={styles.grid} >
      <div className={styles.card}>
        <div className={styles.icon}>🎥</div>
        <h2 className={styles.cardTitle}>New Meeting</h2>
        <p className={styles.cardDescription}>
          Start an instant meeting with one click
        </p>
        <button className={`${styles.button} ${styles.primaryButton}`}>
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
          <input
            type="text"
            placeholder="Enter meeting code (e.g., ABC123XYZ)"
            className={styles.input}
          />
          <button className={`${styles.button} ${styles.successButton}`}>
            Join Meeting
          </button>
        </div>
        <p className={styles.cardFooter}>Enter code provided by meeting host</p>
      </div>
    </div>
  );
}

export default LeftSection;
