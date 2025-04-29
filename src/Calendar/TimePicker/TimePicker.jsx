import { useState, useEffect } from 'react';
import styles from './TimePicker.module.css';

const TimePicker = (props) => {
   const {  currentDate,setEndData,sendData,setSendData }=props

  const [hours, setHours] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [isDragging, setIsDragging] = useState(null);

  useEffect(()=>{
  if(sendData){
    setEndData(`${currentDate} ${hours}:${minutes}:00`)
    setSendData(false)
  }

  },[sendData])


  const handleScroll = (type, e) => {
    if (!isDragging && !e.deltaY) return;
    
    const delta = e.deltaY > 0 ? 1 : -1;
    
    
    if (type === 'hours') {
      const newHours = (hours + delta + 24) % 24;
      setHours(newHours);
    } else {
      const newMinutes = (minutes + delta + 60) % 60;
      setMinutes(newMinutes);
    }
    
    ;
  };
  
  const startDrag = (type) => {
    setIsDragging(type);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mousemove', handleMouseMove);
  };

  const stopDrag = () => {
    setIsDragging(null);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('mousemove', handleMouseMove);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const delta = e.movementY > 0 ? 1 : -1;
    
    if (isDragging === 'hours') {
      setHours(prev => (prev + delta + 24) % 24);
    } else {
      setMinutes(prev => (prev + delta + 60) % 60);
    }
  };

  const renderNumbers = (type, current) => {
    const numbers = [];
    for (let i = -2; i <= 2; i++) {
      let value;
      if (type === 'hours') {
        value = (current + i + 24) % 24;
      } else {
        value = (current + i + 60) % 60;
      }
      
      numbers.push(
        <div 
          key={i}
          className={`${styles.number} ${
            i === 0 ? styles.selected : ''
          }`}
        >
          {value.toString().padStart(2, '0')}
        </div>
      );
    }
    return numbers;
  };

  return (
    <div className={styles.timePicker}>
      <div 
        className={styles.column}
        onWheel={(e) => handleScroll('hours', e)}
        onMouseDown={() => startDrag('hours')}
      >
        {renderNumbers('hours', hours)}
      </div>
      
      <div className={styles.separator}>:</div>
      
      <div 
        className={styles.column}
        onWheel={(e) => handleScroll('minutes', e)}
        onMouseDown={() => startDrag('minutes')}
      >
        {renderNumbers('minutes', minutes)}
      </div>
    </div>
  );
};

export default TimePicker;