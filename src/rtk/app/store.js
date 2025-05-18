import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { UserApi } from "../Service/UserService";
import { NoteApi } from "../Service/NoteService";
import { ExerciseApi } from "../Service/ExerciseService";
import { ExerciseMarkApi } from "../Service/ExerciseMarkService";
import { persistedReducer } from "./PersistConfig";
import { VideoClipApi } from "../Service/VideoClipService";
import {persistStore} from 'redux-persist'
 


 const store=configureStore({
    reducer:persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
      .concat(UserApi.middleware,NoteApi.middleware,ExerciseApi.middleware,
        ExerciseMarkApi.middleware,VideoClipApi.middleware)
})

const persistor=persistStore(store)

 export {store,persistor}


