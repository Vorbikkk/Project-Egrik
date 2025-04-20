import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../UI/MyButton/MyButton';
import cl from './HeaderNav.module.css'

const HeaderNav = () => {
  
    

    return (
        <div>
            <Link to={'/regist'}>
            <MyButton  >
                регистрация
            </MyButton>
            </Link>
            <Link to={'/user_profile'} >пользователь</Link>
        
        </div>
    );
};

export default HeaderNav;