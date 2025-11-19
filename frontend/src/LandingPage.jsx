import React from "react";
import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <>
      <div className={styles.landingPage}>
        <div className={styles.animatedBg}></div>
        
        <div className={styles.container}>
          <div className={styles.nav}>
            <div><a className={styles.navLink}>Register</a></div>
            <div><a className={styles.navLink}>Log In</a></div>
          </div>

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Share moments with your loved ones,
              <span className={styles.highlight}> anytime, anywhere.</span>
            </h1>
            
            <p className={styles.heroSubtitle}>
              Connect instantly with friends and family through seamless video calls, 
              messaging, and shared experiences.
            </p>

            <div className={styles.features}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🎥</span>
                <span>Join Meeting Calls</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>💬</span>
                <span> Messaging</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🔒</span>
                <span>Secure & Private</span>
              </div>
            </div>

            <div className={styles.btnBox}>
              <button className={styles.amazingBtn}>
                <span className={styles.btnText}>Get Started Free</span>
                <span className={styles.btnArrow}>→</span>
              </button>
              <p className={styles.ctaNote}>No credit card required • Free forever</p>
            </div>
          </div>

          <div className={styles.floatingElement1}></div>
          <div className={styles.floatingElement2}></div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;