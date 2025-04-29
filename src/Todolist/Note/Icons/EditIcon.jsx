import React from "react"
import cl from './EditIcon.module.css'


const EditIcon = () => {

    return (
        
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={cl.edit_icon}
            >
              <path
                d="M15 5l4 4M5 19l4-4L19 5l-4-4-4 4-10 10v4h4z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              <path
                d="M3 21h18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
      
    )
}

export default EditIcon