import React from "react";
import cl from './CalendarIcon.module.css'

const CalendarIcon = ({
    size =40,
    color = 'currentColor',
    strokeWidth = 2,
    showDate = false,
    date = new Date().getDate(),
    className = '',
    style = {},
    onClick
  }) => {
    return (
       <button className={cl.calendar_btn } onClick={onClick}>
         <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`calendar-icon ${className}`}
        style={style}
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        
        {showDate && (
          <text
            x="12"
            y="18"
            fontSize={size * 0.4}
            textAnchor="middle"
            fill={color}
            stroke="none"
          >
            {date}
          </text>
        )}
      </svg>
       </button>
    );
  };
  
  export default CalendarIcon;

