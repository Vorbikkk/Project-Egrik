import React from "react";
import styles from './PinIcon.module.css'; // Импортируем стили под любым именем (не обязательно 'cl')

const PinIcon = ({ isActive = false }) => {
  

  return (
     <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`${styles.pin_icon} ${isActive ? styles.active : ''}`} // Используем styles вместо cl
  >
    <path 
      d="M16 3V5H8V3H6V5H5V7H4V9H5V15L3 17V19H5L7 17H13L15 19H17V17L15 15V9H16V7H15V5H14V3H12Z" 
      fill="currentColor"
    />
    <path 
      d="M8 9H16V15H14V11H10V15H8V9Z" 
      fill="currentColor"
    />
  </svg>
  )
};

export default PinIcon;