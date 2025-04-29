import React from 'react';
import { Routes,Route } from 'react-router-dom';
import UserProfile from '../UserProfile/UserProfile';
import ToDoList from '../Todolist/ToDoForm/ToDoList';
import FormExercise from '../Form/FormExercise/FormExercise'

const SidebarRouters = () => {
    return (
                 <Routes>
                     <Route path='profile' element={<UserProfile/>}/>
                     <Route path='todolist' element={<ToDoList/>}/>
                     <Route path='exercise' element={<FormExercise/>}/>
                 </Routes>
               
    );
};

export default SidebarRouters;