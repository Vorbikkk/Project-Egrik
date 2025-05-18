import React, { useState, useRef, useEffect } from 'react';
import Avatar from './Avatar/Avatar';
import cl from './UserProfile.module.css'
import { Link } from 'react-router-dom';
import MyButton from '../UI/MyButton/MyButton';
import { useSelector } from 'react-redux';
import { giveUser } from '../RTK/app/Slice/SliceUser';

const UserProfile = () => {

    const user=useSelector(giveUser)
     
    console.log(user)

    return (
        <div>
            <div className={cl.box_inline}>
                <Avatar />
                <div className={cl.userName}>
                    {user.userName}
                </div>
                <Link to={'/edit_userProfile'}>
                    <MyButton >
                        редактировать
                    </MyButton>
                </Link>
            </div>

        </div>
    );
};

export default UserProfile;