import React from 'react';

function deformationCircle(checkRect, widthCircle, heightCircle, e) {
    let newPosX = widthCircle;
    let newPosY = heightCircle;



    if (e.clientX > checkRect.left && e.clientX < checkRect.right) {
        newPosX--;
        newPosY--;
    } else {
        newPosX++;
        newPosY++;
    }

    return { x: newPosX, y: newPosY };
}

const TransformNavigateCircle = (e, setCircleSize, setStyleCircle, circleSize, dataTrans, checkRef, circleRef,setTest) => {
    e.stopPropagation();

    let widthCircle = circleRef.current.getBoundingClientRect().width
    let heightCircle = circleRef.current.getBoundingClientRect().top
    let checkRefSize = checkRef.current.getBoundingClientRect()

    let scale = 1
    let initialState = widthCircle
    let nextState = widthCircle+1


    let i=0 //убрать

    function MouseMove(e) {
        const checkRect = circleRef.current.getBoundingClientRect();  // Get updated rect
        const { x, y } = deformationCircle(checkRect, widthCircle, heightCircle, e);

        if (widthCircle < x) {
            widthCircle = x
            nextState++
        }
        else if (widthCircle > x) {
            widthCircle = x
            nextState--
        }

        if ((checkRect.left < checkRefSize.left ||
            checkRect.top < checkRefSize.top) ||
            (checkRect.right > checkRefSize.right ||
                checkRect.bottom > checkRefSize.bottom)) {
                    
            nextState--
        }
        if (checkRect.width === 50) {
            nextState++
        }

         i++

        scale = nextState / initialState

        
        setCircleSize({
            ...circleSize,
            transformOrigin: dataTrans[0],
            transform: `scale(${scale})`
        });
        



    }

    document.addEventListener('mousemove', MouseMove);

    const stopDragging = () => {
        document.removeEventListener('mousemove', MouseMove);
        document.removeEventListener('mouseup', stopDragging);
        let circleRefPos = circleRef.current.getBoundingClientRect()

        setStyleCircle({
            left: circleRefPos.left,
            top: circleRefPos.top,

        })
        setCircleSize(
            {
                width:initialState*scale,
                height:initialState*scale
            }
        )

    }

    document.addEventListener('mouseup', stopDragging);
    e.preventDefault();
};

export default TransformNavigateCircle;