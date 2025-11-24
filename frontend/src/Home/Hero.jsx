import React from "react";
import styles from "./Hero.module.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Hero({user}) {
  return (
    <div className={styles.container}>
  <h1 className={styles.mainHeading}>
      <AccountCircleIcon sx={{fontSize:"3rem"}}/>&nbsp; {user}
  </h1>
  <h5 className={styles.subHeading}>
    Start, Join and Manage your meetings with ease.
  </h5>
</div>
  );
}

export default Hero;
