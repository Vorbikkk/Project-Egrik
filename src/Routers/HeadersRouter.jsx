import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Header from '../HeaderComponents/Header';
import Registration from '../Form/FormRegistration/FormRegistration'
import UserProfile from '../UserProfile/UserProfile';
import EditUserProfile from '../UserProfile/EditUserProfile/EditUserProfile';
import SidebarRouters from '../Sidebar/SidebarRouters';

const HeadersRouter = () => {
    
    
    
    return (
          <Routes>
            <Route path='/' element={<Header/>}>
              <Route path='regist' element={<Registration/>} />
              <Route path='edit_userProfile' element={<EditUserProfile/>}  />
              <Route path='/*' element={<SidebarRouters/>}  />
            </Route>
           
          </Routes>
    );
};

export default HeadersRouter;