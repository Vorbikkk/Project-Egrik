import React, { useState } from "react";
import cl from "./PauseIcon.module.css";

const PauseIcon = ({ videoRef }) => {

  const [pause, setPause] = useState(videoRef.current.paused)

  if (pause) {
    videoRef.current.pause()
  }
  else {
    videoRef.current.play()
  }


  return (
    <div
      onClick={() => setPause(prev => !prev)}
      className={cl.container}>
      <div className={cl.blockPause}>
          {
            pause ? <div className={cl.triangle}></div>
              :
              <div className={cl.pauseBars}>
                <div className={cl.bar}></div>
                <div className={cl.bar}></div>
              </div>
          }
        </div>
    </div>
  );
};

export default PauseIcon;