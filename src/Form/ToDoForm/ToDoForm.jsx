import React, { useState, useEffect } from 'react';
import MyButton from '../../UI/MyButton/MyButton';
import cl from './ToDoForm.module.css';
import ModalDefault from '../../Modal/ModalDefault';
import Calendar from '../../Calendar/Calendar';
import { useCreateNoteMutation } from '../../RTK/Service/NoteService';
import CalendarIcon from '../../SVGIcons/CalendarIcon';


const ToDoForm = ({  notes, setActiveFormToDo }) => {

  const [nameNote, setNameNote] = useState('');
  const [description, setDescription] = useState('');
  const [activeCalendar, setActiveCalendar] = useState(false)
  const [endData, setEndData] = useState('')
  const [createNote, { }] = useCreateNoteMutation()
  const serialNumber = notes.length >= 1 ? notes[notes.length - 1].numberNotes + 1 : 1
  useEffect(() => {
    setActiveCalendar(false)
  }, [endData])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newNote = {
      id: new Date().getTime(),
      note_name: nameNote,
      note_description: description,
      note_expiration_date: endData,
    }

    await createNote(newNote)
      .then(res =>
        console.log(res)
      )

    setNameNote('');
    setDescription('');
    setActiveFormToDo(false)
  };

  function ActivatedCalendar(e){
    e.preventDefault()
    setActiveCalendar(true)
  }

  return (
    <div className={cl.todoFormContainer}>
      <h2 className={cl.formTitle}>Создать новую заметку</h2>
      <form className={cl.todoForm}>
        <div className={cl.formGroup}>
          <label htmlFor="title" className={cl.label}>Название</label>
          <div className={cl.block_flex}>
            <input
              type="text"
              value={nameNote}
              onChange={(e) => setNameNote(e.target.value)}
              placeholder="Введите название"
              className={cl.input}
              required
            />
            <div className={cl.block_flex}>
              <input
                type="text"
                value={endData}
                placeholder="дата окончания"
                className={[cl.input, cl.input_calendar].join(' ')}
                required
              />
              <CalendarIcon onClick={(e) => ActivatedCalendar(e)} />
            </div>
          </div>
        </div>
        <div className={cl.formGroup}>
          <label   className={cl.label}>Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Добавьте описание"
            rows="5"
            className={cl.textarea}
          />
        </div>
        <MyButton onClick={(e) => handleSubmit(e)} className={cl.submitBtn}>
          Сохранить
        </MyButton>
      </form>
      <ModalDefault active={activeCalendar} setActive={setActiveCalendar}>
        <Calendar setEndData={setEndData} />
      </ModalDefault>
    </div>
  );
};

export default ToDoForm;