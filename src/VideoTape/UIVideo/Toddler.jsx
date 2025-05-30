import React, { useState, useRef, useEffect } from 'react';
import cl from './Toddler.module.css'

const Toddler = ({ gradientPosition, setGradientPosition,isActive,setIsActive }) => {

    const [circlePosition, setCirclePosition] = useState({ top: `${100 - parseFloat(gradientPosition)}%` });
    const circleRef = useRef();
    const lineDinamicRef = useRef();
    

    const navigateCursor = (e) => {
        const circleRect = circleRef.current.getBoundingClientRect();
        const lineRect = lineDinamicRef.current.getBoundingClientRect();
        const initialY = e.clientY - circleRect.top;
        let defaultTop = e.clientY - lineRect.top;
        defaultTop = Math.max(0, Math.min(defaultTop, lineRect.height));
        const defaultPosition = `${(defaultTop / lineRect.height) * 100}`;
        setCirclePosition({ top: `${defaultPosition}%` });
        setGradientPosition(`${100 - defaultPosition}%`);
        setIsActive(true)

        function mouseMove(e) {
            let newTop = e.clientY - lineRect.top;
            newTop = Math.max(0, Math.min(newTop, lineRect.height));


            const newPosition = `${(newTop / lineRect.height) * 100}`;
            setCirclePosition({ top: `${newPosition}%` });
            setGradientPosition(`${100 - newPosition}%`);
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
            <div className={cl.dinamic_volume}>
                <div
                    ref={lineDinamicRef}
                    className={cl.lineDinamic}
                    onMouseDown={navigateCursor}
                    style={{
                        background: `linear-gradient(to top, #1E90FF ${!isActive ? '0%' :gradientPosition},
                                     #D3D3D3 ${!isActive ? '0%' :gradientPosition})`
                    }}
                >
                    <div
                        style={{ top:!isActive ? '100%' : circlePosition.top }}
                        ref={circleRef}
                        className={cl.circle}
                    />
                </div>
            </div>
        </div>
    );
};

export default Toddler;