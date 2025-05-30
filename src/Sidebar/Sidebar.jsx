import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../UI/MyButton/MyButton';
import ModalDefault from '../Modal/ModalDefault';
import cl from './Sidebar.module.css'

const Sidebar = () => {

    const [activeSideBar, setActiveSideBar] = useState(false)

    const MainPath = [
        { path: '/profile', name: 'профиль' },
        { path: '/todolist', name: 'тудулист' },
        { path: '/exercise', name: 'упражнения' },
        { path: '/video_tape', name: 'видео клипы' },
        { path: '/diary', name: 'дневник' },
    ]



    return (
        <div>
            <MyButton onClick={() => setActiveSideBar(true)}>Сайдбар</MyButton>

            <ModalDefault active={activeSideBar} setActive={setActiveSideBar}>
                <ul className={cl.Sidebar}>
                    {
                        MainPath.map((elem) => {
                            return (
                                <Link to={elem.path}  key={`sections${elem.name}`} className={cl.sidebar_link}>
                                    <li
                                        className={cl.sidebar_elem}
                                        onClick={() => setActiveSideBar(false)}>
                                           {elem.name}
                                    </li>
                                </Link>
                            )

                        })
                    }


                </ul>
            </ModalDefault>
        </div>
    );
};

export default Sidebar;