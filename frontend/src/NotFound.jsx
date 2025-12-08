import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.message}>
          Oops! The page you're looking for seems to have wandered off into the digital void.
        </p>
        <div className={styles.actions}>
          <button 
            onClick={handleGoToLogin} 
            className={styles.primaryButton}
          >
            Go to Login
          </button>
          <button 
            onClick={handleGoHome} 
            className={styles.secondaryButton}
          >
            Back to Home
          </button>
        </div>
        <div className={styles.illustration}>
          <div className={styles.astronaut}>👨‍🚀</div>
          <div className={styles.planet}>🪐</div>
          <div className={styles.stars}>
            <span>✨</span>
            <span>⭐</span>
            <span>🌟</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;