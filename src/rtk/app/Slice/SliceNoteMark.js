import { createSlice } from "@reduxjs/toolkit";

  const NoteMarkSlice=createSlice({
     
    name:'NoteMark',
    initialState:{  id:1,nt_mark_title:'Входящие' },
    reducers:{
       addNoteMark:(state,action)=>{
           console.log(action.payload)

          return action.payload
       }
    }
})

export const  {addNoteMark}=NoteMarkSlice.actions
export const  getNoteMark=(state)=>state.noteMarkReducer


 export default NoteMarkSlice.reducer



