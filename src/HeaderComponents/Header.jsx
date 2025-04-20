import React from 'react';
import cl from './Header.module.css'
import HeaderNav from '../Nav/HeaderNav'
import { Outlet } from 'react-router-dom';
import FormExercise from '../Form/FormExercise/FormExercise';


const Headers = () => {
    return (
       <div>
         <header className={cl.header}>
            <HeaderNav/>
       </header>
            <Outlet/>
       </div>
    );
};

export default Headers;