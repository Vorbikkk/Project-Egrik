import React,{useEffect, useRef} from 'react';
import cl from './VideoClip.module.css'
import SidebarClip from '../SidebarClip/SidebarClip';

const VideoClip = ({clip}) => {

    const videoRef=useRef()
    
    useEffect(()=>{

    },[videoRef])



    return (
        <div className={cl.container_videoClip}>
          <video ref={videoRef} controls src={`http://localhost:5000/uploads/${clip.clip_video}`}>
            
          </video>
          <SidebarClip />
        </div>
    );
};

export default VideoClip;