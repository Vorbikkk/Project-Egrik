import React, { useEffect, useState } from 'react';
import MyButton from '../UI/MyButton/MyButton';
import ModalDefault from '../Modal/ModalDefault'
import ListNotes from './ListNotes/ListNotes'
import Loading from '../UI/Loading/Loading';
import { useGetNoteQuery } from '../RTK/Service/NoteService';
import ToDoForm from '../Form/ToDoForm/ToDoForm';

const ToDoList = () => {

  const [notes, setNotes] = useState([])
  const [numberPagination,setNumberPagination]=useState(1)
  const [activeFormToDo, setActiveFormToDo] = useState(false)
  const {data,isError,isLoading,isSuccess}=useGetNoteQuery({page:numberPagination,limit:5})
  

  if(isError){
    <h1>Ошибка</h1>
  }
  if(data){
    console.log(data.rows)
  }

  return (
    <div>
      <MyButton onClick={() => setActiveFormToDo(true)}>Добавить заметку</MyButton>
      <ModalDefault active={activeFormToDo} setActive={setActiveFormToDo}>
        <ToDoForm
          setNotes={setNotes}
          notes={notes}
          setActiveFormToDo={setActiveFormToDo}
        />
      </ModalDefault>
      {isLoading &&  <Loading />}
      {isSuccess &&  <ListNotes listNotes={data} setNumberPagination={setNumberPagination} />  }
      
    </div>
  )


};

export default ToDoList;