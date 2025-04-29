import React,{useState} from 'react';
import cl from './WindowClarify.module.css'
import MyButton from '../../UI/MyButton/MyButton';
import { useDeleteNoteMutation } from '../../RTK/Service/NoteService';

const WindowClarify = ({answer,id,setActive}) => {

    const [deleteNote,]=useDeleteNoteMutation()
 

   async function PositiveAnswer(){
        if(answer==='delete'){
            await deleteNote(id)
            .then(res=>
                console.log(res)
            )
        }
        else{
         //тут будет про выполнено
        }
        setActive(false)
    }

    return (
        <div className={cl.WindowClarify }>
            <p>вы точно хотите выбрать {answer}</p>
            <div className={cl.container_btn}>
               <MyButton onClick={()=>PositiveAnswer()}>Да</MyButton>
               <MyButton onClick={()=>setActive(false)}>Нет</MyButton>
            </div>
        </div>
    );
};

export default WindowClarify;