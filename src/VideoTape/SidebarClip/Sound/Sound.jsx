import React, { useState, useRef, useEffect,useCallback } from 'react';
import SpeakerIcon from '../IsonsClip/Speakericon';
import cl from './Sound.module.css'
import Toddler from '../../UIVideo/Toddler';

const Sound = ({setVolume}) => {
    const [isActive, setIsActive] = useState(true);
    const [activeDinamic,setActiveDinamic]=useState(false)
    const [gradientPosition, setGradientPosition] = useState('100%');
    const SoundRef=useRef()
   
     
    
    useEffect(()=>{
        let countVolume=!isActive ? 0 : (1/100)*parseFloat(gradientPosition)
       setVolume(countVolume)
       console.log(gradientPosition)
    },[gradientPosition,isActive])

  
   const openDinamic = () => {
    setActiveDinamic(true);
    
    const handleMouseOut = (e) => {
        if (!SoundRef.current.contains(e.relatedTarget)) {
            setActiveDinamic(false);
        }
    };

    const element = SoundRef.current;
    element.addEventListener('mouseout', handleMouseOut);

    return () => {
        element.removeEventListener('mouseout', handleMouseOut);
    };
};


    return (
        <div 
         className={cl.Sound} 
         ref={SoundRef}
        >
            <button 
            className={cl.btn_sound}
             onMouseOver={()=>openDinamic()}
            onClick={() => setIsActive(prev => !prev)}>
                <SpeakerIcon isActive={isActive} />
            </button>
            {activeDinamic &&
               <Toddler 
               gradientPosition={gradientPosition} 
               setGradientPosition={setGradientPosition}
               isActive={isActive}
               setIsActive={setIsActive} />
            }
        </div>
    );
};

export default Sound;