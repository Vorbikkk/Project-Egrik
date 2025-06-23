import React,{useState,useEffect} from 'react';
import cl from './Note.module.css';
import ModalDefault from '../../Modal/ModalDefault';
import SelectOptionsNote from './SelectOptionsNote';
import { useUpdateNoteMutation } from '../../RTK/Service/NoteService';
import NotificationNote from '../../UI/Notifications/NotificationNote/NotificationNote';

const Note = ({ props, setNote,styles,
              selectNotes,CallNotification,
              noteNotificate,index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completed,setCompleted]=useState(false)
  const { id, note_name,note_priority,note_is_completed,...remainderNote } = props;
  

  const handleNoteClick = (e) => {
    if(e.shiftKey){
      selectNotes(index)
    }
    setNote(props);
  };

  useEffect(()=>{

    
    if(noteNotificate?.id===id){
     console.log(props)
     setCompleted(true)
   }
   else{
    setCompleted(false)
   }

  },[noteNotificate])



  return (
    <div 
      className={`${cl.note}  `}
      style={{display:(completed ? 'none' : 'flex') }}
      // style={completed ? {...cl.selected} : {border:styles?.border}} по желанию 
      onClick={(e)=>handleNoteClick(e)}
    >
      {/* SVG индикатор выбора */}
      <div className={cl.checkbox} onClick={(e)=>{
        CallNotification(props,'задача выполнена')
        }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect 
            x="1" y="1" 
            width="18" height="18" 
            rx="3" 
            stroke={completed ? '#4CAF50' : `${styles?.stroke || '#BDBDBD'}`} 
            strokeWidth="2" 
            fill={completed ? '#4CAF50' : 'white'}
          />
          {completed && (
            <path 
              d="M5 10L9 14L15 6" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          )}
        </svg>
      </div>

      <div className={cl.content}>
        <h3 className={cl.title}>{note_name}</h3>
      </div>
      <div>{styles?.rank}</div>

      <div className={cl.options}>
        <SelectOptionsNote
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          note={props}
        />
      </div>
      <div className={cl.container_notifications}>
        
      </div>

    </div>
  );
};

export default Note;