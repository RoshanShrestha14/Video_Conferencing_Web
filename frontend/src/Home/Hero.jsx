import React from "react";
import styles from "./Hero.module.css";

function Hero() {
  return (
    <div className={styles.container}>
  <h1 className={styles.mainHeading}>
    Video Meet
  </h1>
  <h5 className={styles.subHeading}>
    Start, Join and Manage your meetings with ease.
  </h5>
</div>
  );
}

export default Hero;
