import {persistReducer,getStoredState} from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { UserApi } from "../Service/UserService";
import { NoteApi } from "../Service/NoteService";
import { ExerciseApi } from "../Service/ExerciseService";
import { ExerciseMarkApi } from "../Service/ExerciseMarkService";
import { VideoClipApi } from '../Service/VideoClipApi/VideoClipService';
import UserSliceReducer from '../app/Slice/SliceUser'
import NoteMarkSliceReducer from './Slice/SliceNoteMark'
import dataAvatarReducer from  './Slice/SliceAvatar'
import storage from 'redux-persist/lib/storage';
import { LikeClipApi } from '../Service/VideoClipApi/LikeClipApi';
import { NoteMarkApi } from '../Service/NoteMarkApi/NoteMarkApi';

const persistConfig={
    key:'root',
    storage,
    whitelist:[NoteApi.reducerPath]
}


const rootReducer = combineReducers( {
        dataAvatar:dataAvatarReducer,
        userReducer:UserSliceReducer,
        noteMarkReducer:NoteMarkSliceReducer,
        [UserApi.reducerPath]:UserApi.reducer,
        [VideoClipApi.reducerPath]:VideoClipApi.reducer,
        [NoteApi.reducerPath]:NoteApi.reducer,
        [ExerciseApi.reducerPath]:ExerciseApi.reducer,
        [ExerciseMarkApi.reducerPath]:ExerciseMarkApi.reducer,
        [LikeClipApi.reducerPath]:LikeClipApi.reducer,
        [NoteMarkApi.reducerPath]:NoteMarkApi.reducer,

      })

export const persistedReducer=persistReducer(persistConfig,rootReducer)
const savedStore=await getStoredState(persistConfig)

