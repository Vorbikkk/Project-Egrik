 import React from "react"
 
const SpeakerIcon = ({ isActive = true }) => (
  <svg 
    width="44" 
    height="44" 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M3 9V15H7L12 20V4L7 9H3Z" 
      fill={isActive ? "#2787F5" : "#99A2AD"}
    />
    
    {isActive && (
      <>
        <path 
          d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12Z" 
          fill="#2787F5"
        />
        <path 
          d="M14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" 
          fill="#2787F5"
        />
      </>
    )}
    
    {!isActive && (
      <line 
        x1="18" 
        y1="6" 
        x2="6" 
        y2="18" 
        stroke="#FF3347" 
        strokeWidth="2"
        strokeLinecap="round"
      />
    )}
  </svg>
);;
export default SpeakerIcon