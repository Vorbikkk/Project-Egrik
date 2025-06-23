import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserProfile from '../UserProfile/UserProfile';
import ToDoList from '../Todolist/ToDoList';
import Exercises from '../Exercise/Exercise/Exercises';
import PageFullExercise from '../Exercise/PageFullExercise/PageFullExercise';
import Diary from '../Diary/Diary';
import VideoTape from '../VideoTape/VideoTape';
import RoutersDiaryEntry from '../Diary/RoutersDiaryEntry/RoutersDiaryEntry';

const SidebarRouters = () => {
    return (
        <Routes>
            <Route path='profile' element={<UserProfile />} />
            <Route path='todolist' element={<ToDoList />} />
            <Route path='exercise' element={<Exercises />}/>
            <Route path='exercise/:id' element={<PageFullExercise />} />
            <Route path='video_tape' element={<VideoTape />} />
            <Route path='diary' element={<Diary />}/>
            <Route path='diary/*' element={<RoutersDiaryEntry/>} />
        </Routes>

    );
};

export default SidebarRouters;