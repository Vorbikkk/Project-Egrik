import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { UserApi } from "../Service/UserService";
import { NoteApi } from "../Service/NoteService";
import { ExerciseApi } from "../Service/ExerciseService";
import { ExerciseMarkApi } from "../Service/ExerciseMarkService";
import { persistedReducer } from "./PersistConfig";
import { VideoClipApi } from "../Service/VideoClipApi/VideoClipService";
import {persistStore} from 'redux-persist'
import { LikeClipApi } from "../Service/VideoClipApi/LikeClipApi";
 


 const store=configureStore({
    reducer:persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
      .concat(UserApi.middleware,NoteApi.middleware,ExerciseApi.middleware,
        ExerciseMarkApi.middleware,VideoClipApi.middleware,LikeClipApi.middleware)
})

const persistor=persistStore(store)

 export {store,persistor}


