import React from 'react';
import cl from './Header.module.css'
import HeaderNav from '../Nav/HeaderNav'
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';


const Headers = () => {
    return (
       <div>
         <header className={cl.header}>
            <Sidebar/>
            <HeaderNav/>
       </header>
            <Outlet/>
       </div>
    );
};

export default Headers;