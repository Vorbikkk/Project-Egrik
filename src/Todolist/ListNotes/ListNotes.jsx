import React, { useRef, useState, useCallback, useEffect } from 'react';
import cl from './ListNotes.module.css';
import Note from '../Note/Note';
import MyButton from '../../UI/MyButton/MyButton';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';
import DistributeNotes from '../Note/DistributeNotes/DistributeNotes';
import NotificationNote from '../../UI/Notifications/NotificationNote/NotificationNote';
import { useUpdateNoteMutation } from '../../RTK/Service/NoteService';

const priorityStyles = [
  { rank: '🔵', border: '1px solid blue', stroke: 'blue' },
  { rank: '🟡', border: '1px solid yellow', stroke: 'yellow' },
  { rank: '🟠', border: '1px solid orange', stroke: 'orange' },
];

const ListNotes = ({ listNotes, setNote, page, mainNoteMark, onClick, setPage, pinNotes }) => {

  const containerRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [updateNote,]=useUpdateNoteMutation()
  const [title,setTitle]=useState()
  const [indexSelectNotes,setIndexSelectNotes]=useState({start:0,end:0})
  const [noteNotificate,setNoteNotificate]=useState()
 
  console.log(indexSelectNotes)

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 1 && !isLoading && page < 3) {
      setIsLoading(true);
      setPage(prev => prev + 1);
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [isLoading, setPage]);
  

  async function  defaultUpdateNote(note,newNote){
     await updateNote({id:note.id,note_pin:false,note_is_completed:true})
     .then((res)=>{
        if(res.data){
          setNoteNotificate(newNote)
        }
     })
  }  

  const CallNotification=(note,name='выполненные')=>{
    setTitle(name)
    if(noteNotificate?.id){
       defaultUpdateNote(noteNotificate,note)
    }
     else{
      setNoteNotificate(note)
     }
  } 
  function selectNotes(index){
     const {start,end}=indexSelectNotes
     let newStart=Math.min(start,index)
     let newEnd=Math.max(end,start,index) 
     setIndexSelectNotes({start:newStart,end:newEnd})
  }

  return (
    <div 
    className={cl.ListNotes} 
    >
      <div className={cl.box_flex}>
        <h1>{mainNoteMark.nt_mark_title}</h1>
        <MyButton onClick={onClick} className={cl.openFormBtn}>+</MyButton>
      </div>

      <span className={cl.line}></span>

      <div
        className={cl.containerScroll}
        ref={containerRef}
        onScroll={handleScroll}
      >
        {/* Вот здесь рендерится компонент закрепленных заметок */}
        {(pinNotes && pinNotes.rows.length > 0) && <CollapsibleSection
          title={'закрепленные'}
          icon={'📌'}
        >
          { pinNotes.rows.map((note,index)=>
             <Note
             key={`note-${note.id}`}
             index={index+1}
             selectNotes={selectNotes}
             props={note}
             noteNotificate={noteNotificate}
            setNote={setNote}
            CallNotification={CallNotification}
            styles={note.note_priority > 1 ? priorityStyles[note.note_priority - 2] : null} 
            /> 
           )}
        </CollapsibleSection>}


         <CollapsibleSection  title={'обычные'}>
          {listNotes.rows.length > 0 ? listNotes.rows.map((note,index) => (
            <DistributeNotes
              key={`DistributeNotes-${note.id}`}
              index={index+1}
              props={note}
              selectNotes={selectNotes}
              name_notes={mainNoteMark.nt_mark_title}
              setNote={setNote}
              noteNotificate={noteNotificate}
              CallNotification={CallNotification}
              styles={note.note_priority > 1 ? priorityStyles[note.note_priority - 2] : null}
            />
            
          ))  
         : <h2>Пока пусто</h2>
        }
        </CollapsibleSection>
      </div>
      {
        noteNotificate && 
        <NotificationNote
         text={title}
         note={noteNotificate}
         setNoteNotificate={setNoteNotificate}
        />
      }
    </div>
  );
};

export default ListNotes;