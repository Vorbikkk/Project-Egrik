import { configureStore } from "@reduxjs/toolkit";
import { UserApi } from "../Service/UserService";
import { NoteApi } from "../Service/NoteService";
import dataAvatarReducer from  './Slice/SliceAvatar'
 


export const store=configureStore({
    reducer: {
      dataAvatar:dataAvatarReducer,
        [UserApi.reducerPath]:UserApi.reducer,
        [NoteApi.reducerPath]:NoteApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
      .concat(UserApi.middleware,NoteApi.middleware)
})

 


