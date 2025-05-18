import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserProfile from '../UserProfile/UserProfile';
import ToDoList from '../Todolist/ToDoList';
import Exercises from '../Exercise/Exercise/Exercises';
import PageFullExercise from '../Exercise/PageFullExercise/PageFullExercise';
import VideoTape from '../VideoTape/VideoTape';

const SidebarRouters = () => {
    return (
        <Routes>
            <Route path='profile' element={<UserProfile />} />
            <Route path='todolist' element={<ToDoList />} />
            <Route path='exercise' element={<Exercises />}/>
            <Route path='exercise/:id' element={<PageFullExercise />} />
            <Route path='video_tape' element={<VideoTape />} />
            

        </Routes>

    );
};

export default SidebarRouters;