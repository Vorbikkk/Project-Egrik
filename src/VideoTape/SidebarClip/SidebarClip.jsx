import React from 'react';
import cl from './SidebarClip.module.css'
import Sound from './Sound/Sound';
import ProgressBar from './ProgressBar/ProgressBar';
import LikeIcon from './IsonsClip/LikeIcon/LikeIcon';

const SidebarClip = ({setVolume,clip }) => {


    return (
        <div className={cl.Sidebar}>
            <Sound setVolume={setVolume} />
            <LikeIcon clipId={clip.id}/>
        </div>
    );
};

export default SidebarClip;