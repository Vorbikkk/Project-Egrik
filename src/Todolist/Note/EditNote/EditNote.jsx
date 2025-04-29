import React, { useEffect, useState } from 'react';
import cl from './EditNote.module.css';
import MyButton from '../../../UI/MyButton/MyButton';
import ModalDefault from '../../../Modal/ModalDefault';
import Calendar from '../../../Calendar/Calendar'
import { useUpdateNoteMutation } from '../../../RTK/Service/NoteService';

const EditNoteForm = ( {note,setActiveEditModal}  ) => {

   const {id,note_name,note_description,note_expiration_date,...remainderNote}=note 
  const [noteName, setNoteName] = useState(note_name);
  const [description, setDescription] = useState(note_description);
  const [activeCalendar,setActiveCalendar]=useState(false)
  const [date, setDate] = useState(note_expiration_date);
  const [updateNote,]=useUpdateNoteMutation()
  

  useEffect(()=>{
    setActiveCalendar(false)
  },[date])

  const updateDataNote=async ()=>{
   let newNote={
    note_name:noteName,
    note_description: description,
    note_expiration_date:date,
    ...remainderNote

   }

    await updateNote({id,...newNote})
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
    setActiveEditModal(false)
  }

  return (
    <div className={cl.edit_form_container}>
      <h2 className={cl.form_title}>Редактирование заметки</h2>
      
      <div className={cl.form_group}>
        <label className={cl.input_label}>Название заметки</label>
        <input
          type="text"
          value={noteName}
          onChange={(e) => setNoteName(e.target.value)}
          className={cl.text_input}
        />
      </div>
      
      <div className={cl.form_group}>
        <label className={cl.input_label}>Описание</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={cl.textarea_input}
          rows="4"
        />
      </div>
      
      <div className={cl.form_group}>
        <label className={cl.input_label}>Дата завершения</label>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={cl.date_input}
        />
        <MyButton onClick={()=>setActiveCalendar(true)}>кал</MyButton>
      </div>
      
      <div className={cl.buttons_container}>
        <button className={cl.cancel_button}  >
          Отмена
        </button>
        <button className={cl.save_button} onClick={()=>updateDataNote()}>
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