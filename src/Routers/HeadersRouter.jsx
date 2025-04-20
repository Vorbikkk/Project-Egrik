import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Header from '../HeaderComponents/Header';
import Registration from '../Form/FormRegistration/FormRegistration'
import UserProfile from '../userProfile/UserProfile';
import EditUserProfile from '../userProfile/EditUserProfile/EditUserProfile';

const HeadersRouter = () => {
    
  console.log(  UserProfile())
    
    
    return (
          <Routes>
            <Route path='/' element={<Header/>}>
              <Route path='regist' element={<Registration/>} />
              <Route path='edit_userProfile' element={<EditUserProfile/>}  />
              <Route path='user_profile' element={<UserProfile/>}  />
            </Route>
          </Routes>
    );
};

export default HeadersRouter;