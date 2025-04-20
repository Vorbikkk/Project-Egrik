import { createSlice } from "@reduxjs/toolkit";

  const dataAvatarSlice=createSlice({
     
    name:'dataAvatar',
    initialState:{  x:30, y:30, width:160, height:160 },
    reducers:{
       changeSizeAvatar:(state,action)=>{
          return action.payload
       }
    }
})

export const  {changeSizeAvatar}=dataAvatarSlice.actions

 export default dataAvatarSlice.reducer



