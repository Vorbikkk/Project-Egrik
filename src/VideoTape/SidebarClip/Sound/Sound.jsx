import React, { useState, useRef, useEffect } from 'react';
import SpeakerIcon from '../IsonsClip/Speakericon';
import cl from './Sound.module.css'

const Sound = () => {
    const [isActive, setIsActive] = useState(true);
    const [circlePosition, setCirclePosition] = useState({ top: '20%' });
    const [gradientPosition, setGradientPosition] = useState('20%');
    const circleRef = useRef();
    const lineDinamicRef = useRef();

    useEffect(() => {
        // Синхронизируем позицию градиента с позицией кружка
        setGradientPosition(circlePosition.top);
    }, [circlePosition]);

    const navigateCursor = (e) => {
        const circleRect = circleRef.current.getBoundingClientRect();
        const lineRect = lineDinamicRef.current.getBoundingClientRect();
        const initialY = e.clientY - circleRect.top;

        function mouseMove(e) {
            let newTop = e.clientY - initialY - lineRect.top;
            
            // Ограничиваем движение в пределах линии
            newTop = Math.max(0, Math.min(newTop, lineRect.height - circleRect.height));
            
            const newPosition = `${(newTop / lineRect.height) * 100}%`;
            setCirclePosition({ top: newPosition });
            setGradientPosition(newPosition);
        }

        function mouseUp() {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
        }

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
        e.preventDefault();
    };

    return (
        <div>
            <button className={cl.btn_sound} onClick={() => setIsActive(prev => !prev)}>
                <SpeakerIcon isActive={isActive} />
            </button>
            <div className={cl.dinamic_volume}>
                <div 
                    ref={lineDinamicRef} 
                    className={cl.lineDinamic}
                    style={{
                        background: `linear-gradient(to top, #1E90FF ${gradientPosition}, #D3D3D3 ${gradientPosition})`
                    }}
                >
                    <div 
                        style={{ top: circlePosition.top }} 
                        ref={circleRef} 
                        onMouseDown={navigateCursor}  
                        className={cl.circle}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sound;