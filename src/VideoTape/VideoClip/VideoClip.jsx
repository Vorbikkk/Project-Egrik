import React, { useEffect, useState, useRef } from 'react';
import cl from './VideoClip.module.css'
import SidebarClip from '../SidebarClip/SidebarClip';
import ProgressBar from '../SidebarClip/ProgressBar/ProgressBar';
import PauseIcon from '../SidebarClip/IsonsClip/Pauseicon/Pauseicon';

const VideoClip = ({ clip }) => {

  let videoRef = useRef()
  let inputRef = useRef()
  const [activeSideBar, setActiveSideBar] = useState(false)
    const [controlsVideo, setcontrolsVideo] = useState(false)
  const [volume, setVolume] = useState(1)


  useEffect(() => {
    if (videoRef.current) {
      setActiveSideBar(true)

    }
    console.log(videoRef.current.volume)
  }, [videoRef])
  
  useEffect(() => {
    videoRef.current.volume = volume
     if(inputRef.current){
    console.log(inputRef.current.value)
  }
  }, [volume])
  
   function openPause(e) {
    setcontrolsVideo(true)
    const removeEvent = () => {
      setcontrolsVideo(false)
      e.target.removeEventListener('mouseout', removeEvent)
    }
    e.target.addEventListener('mouseout', removeEvent)
  }


  return (
    <div className={cl.container_videoClip}>
      <div className={cl.blockClip} onMouseOver={(e) => openPause(e)}>
        <video ref={videoRef}  src={`http://localhost:5000/uploads/${clip.clip_video}`}>

        </video>
        {
          (activeSideBar && controlsVideo) ?
          <div 
          >
            <ProgressBar videoRef={videoRef} />
            <PauseIcon videoRef={videoRef} />
          </div> : null
        }
      </div>
      {activeSideBar && <SidebarClip clip={clip} setVolume={setVolume} />}
    </div>
  );
};

export default VideoClip;