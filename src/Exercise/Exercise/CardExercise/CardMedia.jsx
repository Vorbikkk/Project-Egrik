import React, { useRef, useEffect, useState } from 'react';

const CardMedia = ({ mediaUrl }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
   
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src =`http://localhost:5000/uploads/${mediaUrl.slice(mediaUrl.indexOf('uploads')+8)}`;
    video.muted = true;
    video.preload = 'metadata';

    video.currentTime = 1.0;

    video.addEventListener('loadeddata', () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
    
      ctx.drawImage(video, 0, 0,125,125);
    });

    return () => {
      video.removeEventListener('loadeddata', () => {});
    };
  }, [mediaUrl]);

  if(!mediaUrl){
    console.log(mediaUrl)
    return null
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Скрытые элементы для генерации превью */}
      <video ref={videoRef} style={{ display: 'none' }} crossOrigin="anonymous" />
      <canvas ref={canvasRef} width={125} height={125}>

      </canvas>
    </div>
  );
};

export default CardMedia;