import { configureStore } from "@reduxjs/toolkit";
import { UserApi } from "../Service/UserService";
import dataAvatarReducer from  './Slice/SliceAvatar'
 


export const store=configureStore({
    reducer: {
      dataAvatar:dataAvatarReducer,
        [UserApi.reducerPath]:UserApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
      .concat(UserApi.middleware )
})

 


