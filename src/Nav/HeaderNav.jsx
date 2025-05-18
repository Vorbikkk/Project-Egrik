import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../UI/MyButton/MyButton';
import Authentificate from '../Form/Authentificate/Authentificate'
import ModalDefault from '../Modal/ModalDefault'
import cl from './HeaderNav.module.css'

const HeaderNav = () => {

      

    return (
        <div>
            <Link to={'/regist'}>
            <MyButton  >
                регистрация
            </MyButton>
            </Link>    
        </div>
    );
};

export default HeaderNav;