import React from 'react';
import cl from './SidebarClip.module.css'
import Sound from './Sound/Sound';

const SidebarClip = () => {
    return (
        <div className={cl.Sidebar}>
            <Sound />
        </div>
    );
};

export default SidebarClip;