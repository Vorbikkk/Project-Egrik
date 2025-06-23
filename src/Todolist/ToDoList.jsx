import React, { useEffect, useState } from 'react';
import cl from './ToDoList.module.css'
import MyButton from '../UI/MyButton/MyButton';
import ModalDefault from '../Modal/ModalDefault'
import ListNotes from './ListNotes/ListNotes'
import Loading from '../UI/Loading/Loading';
import { useGetPinNotesQuery, useGetNoteQuery,useGetCompleteNotesQuery } from '../RTK/Service/NoteService';
import ToDoForm from '../Form/ToDoForm/ToDoForm';
import SlidingWindow from './SlidingWindow/SlidingWindow';
import WindowNoteInformation from './Note/WindowNoteInformation';
import GroupsManager from './Groups/GroupsManager/GroupsManager';
import { useDispatch, useSelector } from 'react-redux';
import { getNoteMark } from '../RTK/app/Slice/SliceNoteMark';


const ToDoList = () => {
  const [note, setNote] = useState()
  const [priorityFilter, setPriorityFilter] = useState(null)
  const mainNoteMark = useSelector(getNoteMark)
  const [numberPagination, setNumberPagination] = useState(1)
  const [activeFormToDo, setActiveFormToDo] = useState(false)
  const [pinNotes,setPinNotes]=useState()
  const isCompleted=mainNoteMark.nt_mark_title === 'Выполненные'
  const { data: pin } = useGetPinNotesQuery({ noteMarkId: mainNoteMark.id },{skip:isCompleted})
  const { data:allNotes, isError, isLoading, isSuccess } = useGetNoteQuery(
    {
      page: numberPagination,
      limit: 15,
      noteMarkId:isCompleted ? null : mainNoteMark.id,
      note_is_completed:isCompleted,
      note_pin:false,
      note_priority:isCompleted ? null : priorityFilter
    },)

   useEffect(()=>{
      if(isCompleted){
         setPinNotes()
      }
      else{
        setPinNotes(pin)
      }
   },[isCompleted,pin])


   useEffect(()=>{
      setNumberPagination(1)
   },[mainNoteMark])


  if (isError) {
    return <h1>Ошибка</h1>
  }


  return (
    <div className={cl.ToDoList}>
      <ModalDefault active={activeFormToDo} setActive={setActiveFormToDo}>
        <ToDoForm
          noteMarkId={mainNoteMark.id}
          setActiveFormToDo={setActiveFormToDo}
        />
      </ModalDefault>
      {isLoading && <Loading />}
      {allNotes &&
        <SlidingWindow
          left={
          <GroupsManager 
          onApply={(priority) => setPriorityFilter(priority)}
          />
        }
          center={
            <ListNotes
              listNotes={allNotes}
              page={numberPagination}
              setNote={setNote}
              setPage={setNumberPagination}
              mainNoteMark={mainNoteMark}
              pinNotes={pinNotes}
              onClick={() => setActiveFormToDo(true)}
            />
          }
          right={note && <WindowNoteInformation note={note} />}
        />
      }
    </div>
  );
};

export default ToDoList;