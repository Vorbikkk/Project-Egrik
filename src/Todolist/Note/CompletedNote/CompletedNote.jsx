import React,{useState,useEffect} from 'react';
import cl from '../Note.module.css';


const CompletedNote = ({ props, setNote,selectNotes}) => {


  const { id, note_name,note_priority } = props;


  const handleNoteClick = () => {
    setNote(props);
  };

  return (
    <div 
      className={[cl.note,cl.selected].join(' ')}
      onClick={handleNoteClick}
    >
      <div className={cl.checkbox} >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect 
            x="1" y="1" 
            width="18" height="18" 
            rx="3" 
            stroke={ '#4CAF50'} 
            strokeWidth="2" 
            fill={  '#4CAF50' }
          />
            <path 
              d="M5 10L9 14L15 6" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
        </svg>
      </div>

      <div className={cl.content}>
        <h3 className={cl.title}>{note_name}</h3>
      </div>
    </div>
  );
};

export default CompletedNote;