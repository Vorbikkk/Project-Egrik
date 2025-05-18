import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Header from '../HeaderComponents/Header';
import Registration from '../Form/FormRegistration/FormRegistration'
import UserProfile from '../UserProfile/UserProfile';
import EditUserProfile from '../UserProfile/EditUserProfile/EditUserProfile';
import SidebarRouters from '../Sidebar/SidebarRouters';
import Authentificate from '../Form/Authentificate/Authentificate';

const HeadersRouter = () => {
    
  const user= {
      userName: "johndoe42",
      lastName: "Doe",
      firstName: "John",
      birthDate: "1990-05-15",
      email: "john.doe@example.com",
      city: "New York",
      country: "USA",
      role: "user"
    } 
 
    
    
    return (
          <Routes>
            <Route path='/' element={<Header/>}>
              <Route path='regist' element={<Registration/>} />
              <Route path='edit_userProfile' element={<EditUserProfile user={user}/>}  />
              <Route path='login' element={<Authentificate />}  />
              <Route path='/*' element={<SidebarRouters/>}  />
            </Route>
           
          </Routes>
    );
};

export default HeadersRouter;