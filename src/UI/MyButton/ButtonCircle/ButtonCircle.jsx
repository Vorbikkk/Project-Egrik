import React from 'react';
import styles from './ButtonCircle.module.css';

const ButtonCircle = ({ allow,...props }) => {
  return (
    <button className={`${styles.circleButton} ${allow ? styles.active : ''}`} {...props}>
      <span className={styles.circle}></span>
    </button>
  );
};

export default ButtonCircle;