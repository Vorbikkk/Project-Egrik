//глобализирвоать user
import { createSlice } from "@reduxjs/toolkit";

  const UserSlice=createSlice({
     
    name:'User',
    initialState:{ 
        userName:'Без ',
        lastName:'Имени',
        userAvatar:'',
        country:'',
        city:''
     },
    reducers:{
       installUser:(state,action)=>{
          return action.payload
       }
    }
})

export const  {installUser}=UserSlice.actions

export const  giveUser=(state)=>state.userReducer

 export default UserSlice.reducer



