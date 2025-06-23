import React, { useState, useRef } from 'react';
import styles from './PrioritySlider.module.css';

const PrioritySlider = ({activeIndex,setActiveIndex}) => {

   

  const priorities = [
    { emoji: '⚪', color: '#e0e0e0' },
    { emoji: '🔵', color: '#42a5f5' },
    { emoji: '🟡', color: '#ffca28' },
    { emoji: '🟠', color: '#ff7043' }
  ];

  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleInteraction = (clientX) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const newIndex = Math.round((x / rect.width) * (priorities.length - 1));
    
    setActiveIndex(newIndex);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleInteraction(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const currentPriority = priorities[activeIndex];

  return (
    <div className={styles.container}>
      <div 
        ref={sliderRef}
        className={styles.track}
        onClick={(e) => handleInteraction(e.clientX)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className={styles.progress} 
          style={{
            width: `${(activeIndex / (priorities.length - 1)) * 100}%`,
            backgroundColor: currentPriority.color,
            transition: isDragging ? 'none' : 'width 0.2s ease'
          }}
        />
        
        <div 
          className={styles.thumb}
          style={{
            left: `${(activeIndex / (priorities.length - 1)) * 100}%`,
            backgroundColor: currentPriority.color,
            transition: isDragging ? 'none' : 'left 0.2s ease'
          }}
        />

        {priorities.map((_, index) => (
          <div 
            key={index}
            className={styles.mark}
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(index);
            }}
            style={{
              left: `${(index / (priorities.length - 1)) * 100}%`,
              backgroundColor: index <= activeIndex ? currentPriority.color : '#ddd',
              transition: isDragging ? 'none' : 'background-color 0.2s ease'
            }}
          />
        ))}
      </div>


     
    </div>
  );
};

export default PrioritySlider;