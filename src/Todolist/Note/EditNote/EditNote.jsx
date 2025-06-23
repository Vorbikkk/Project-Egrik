import React, { useEffect, useState } from 'react';
import cl from './EditNote.module.css';
import MyButton from '../../../UI/MyButton/MyButton';
import ModalDefault from '../../../Modal/ModalDefault';
import Calendar from '../../../Calendar/Calendar'
import { useUpdateNoteMutation } from '../../../RTK/Service/NoteService';
import { useGetNoteMarkQuery } from '../../../RTK/Service/NoteMarkApi/NoteMarkApi';
import GroupSelect from './GroupSelect/GroupSelect';
import CalendarIcon from '../../../SVGIcons/CalendarIcon'

const EditNoteForm = ( {note,setActiveEditModal}  ) => {

   const {id,note_name,note_description,note_expiration_date,noteMarkId,...remainderNote}=note 
  const [activeCalendar,setActiveCalendar]=useState(false)
  const [date, setDate] = useState(note_expiration_date);
   const [noteData, setNoteData] = useState({
    name: note_name,
    description: note_description,
    noteMarkId: noteMarkId
  });
  console.log(noteMarkId)
  
  const { data: groups } = useGetNoteMarkQuery({ page: 1, limit: 20 });
  const [updateNote,] = useUpdateNoteMutation();

  const handleUpdate = async () => {
    await updateNote({
      id: note.id,
      note_name: noteData.name,
      note_description: noteData.description,
      note_expiration_date: noteData.date,
      noteMarkId: noteData.noteMarkId,
      ...remainderNote
    })
    .then(res=>console.log(res))
    setActiveEditModal(false);
  };
  
  if(groups){
       console.log(groups)

  }

  useEffect(()=>{
    setActiveCalendar(false)
  },[date])



  return (
    <div className={cl.edit_form_container}>
      <h2 className={cl.form_title}>Редактирование заметки</h2>
      
      <div className={cl.form_group}>
        <label className={cl.input_label}>Название заметки</label>
        <input
          type="text"
          value={noteData.name}
          onChange={(e) => setNoteData({...noteData,name:e.target.value})}
          className={cl.text_input}
        />
      </div>
      
      <div className={cl.form_group}>
        <label className={cl.input_label}>Описание</label>
        <textarea
          value={noteData.description}
          onChange={(e) => setNoteData({...noteData,description:e.target.value})}
          className={cl.textarea_input}
          rows="4"
        />
      </div>
      {/* группы заметок */}
        <div className={cl.form_group}>
        <label className={cl.input_label}>Группа</label>
       {groups &&   <GroupSelect 
          groups={groups?.rows} 
          initialnoteMarkId={noteMarkId}
          onSelect={(id) => setNoteData({...noteData, noteMarkId: id})}
        />}
      </div>



      <div className={cl.form_group}>
        <label className={cl.input_label}>Дата завершения</label>
       <div className={cl.container_flex}>
       <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={cl.date_input}
        />
        
          <CalendarIcon onClick={()=>setActiveCalendar(true)} />
       </div>
      </div>
      
      <div className={cl.buttons_container}>
        <button className={cl.cancel_button} onClick={()=>setActiveEditModal(false)} >
          Отмена
        </button>
        <button className={cl.save_button} onClick={()=>handleUpdate()}>
          Сохранить изменения
        </button>
      </div>
      <ModalDefault active={activeCalendar} setActive={setActiveCalendar} >
        <Calendar setEndData={setDate} />
      </ModalDefault>
    </div>
  );
};

export default EditNoteForm;