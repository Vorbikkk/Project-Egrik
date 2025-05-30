import React, { useState, useEffect } from 'react';
import cl from './ProgressBar.module.css'

const ProgressBar = ({ videoRef }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!videoRef.current) return;

    const updateProgress = () => {
      const { currentTime, duration } = videoRef.current;
      setProgress((currentTime / duration) * 100);
    };

    videoRef.current.addEventListener('timeupdate', updateProgress);

    return () => {
      videoRef.current.removeEventListener('timeupdate', updateProgress);
    };
  }, [videoRef.current]);

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const seekTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
  };

  return (
      <div className={cl.box_input}>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={handleSeek}
          className={cl.inputRange}
          style={{ width: '100%', cursor: 'pointer' }}
        />
  </div>
  );
};

export default ProgressBar;