import React, {  useRef, useEffect,useCallback } from 'react';
import TransformNavigateCircle from './TransformNavigateCircle';
import cl from './ChangeMiniatury.module.css'
import { useDispatch,useSelector } from 'react-redux';
import {changeSizeAvatar} from '../../../rtk/app/Slice/SliceAvatar'
import MyButton from '../../../UI/MyButton/MyButton';
import {LoadAvatar} from './LoadAvatar';

const ChangeMiniatury = ({ imageSrc }) => {
  

    const checkRef = useRef();
    const dispatch=useDispatch()
    const [ImageToPath,setImageToPath]=React.useState('')
    const [styleCircle, setStyleCircle] = React.useState({ top: 0, left: 0 });
    const [dataToChangeAvatar,setDataToChangeAvatar]=React.useState({})
    const avatarRef = useRef();
    const circleRef = useRef();
    const changeAvatarRef = useRef();
    const blockMiniaturyRef = useRef();
    const [circleSize, setCircleSize] = React.useState({ width: 160, height: 160 });
    const [test,setTest]=React.useState('')

    useEffect(() => {
        if (checkRef.current && circleRef.current) {
            const { top, left} = checkRef.current.getBoundingClientRect();
            const { width, height } = circleRef.current.getBoundingClientRect();
             
            setStyleCircle({ top: top, left: left });
            setCircleSize({ width: width, height: height })
        }
        let ctx = avatarRef.current.getContext('2d');
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            
            ctx.drawImage(img,  0, 0, 220, 220);
            setImageToPath(avatarRef.current.toDataURL('image/png'))
        };
        
    }, [imageSrc]);

    useEffect(()=>{

        const checkRect = circleRef.current.getBoundingClientRect();
        let cord_x = checkRect.left;
        let cord_y =  checkRect.top 
        
        LoadAvatar(cord_x, cord_y,imageSrc,avatarRef,
            circleRef,changeAvatarRef,setDataToChangeAvatar,ImageToPath)
        setTest(`${circleSize.width}`)
            
    },[circleSize])


   
    
    const navigateCursor = (e) => {
        let {left,top,...circleRemainder}=circleSize
         
        setCircleSize(circleRemainder)
        const checkRect = checkRef.current.getBoundingClientRect();
        const circleWidth = circleSize.width;
        const circleHeight = circleSize.height;
        let shiftX = e.clientX - styleCircle.left;
        let shiftY = e.clientY - styleCircle.top;
    
        
        
        function MouseMove(e) {
            let newTop = e.clientY - shiftY;
            let newLeft = e.clientX - shiftX;
            
            
            // Ограничиваем движение по вертикали
            if (newTop < checkRect.top) {
                newTop = checkRect.top;

            }
            if (newTop + circleHeight > checkRect.bottom) {
                newTop = checkRect.bottom - circleHeight;

            }
            
            // Ограничиваем движение по горизонтали
            if (newLeft < checkRect.left) {
 
                newLeft = checkRect.left;

            }
            if (newLeft + circleWidth > checkRect.right) {
                newLeft = checkRect.right - circleWidth;
            }
            
             
            setStyleCircle({
                top: newTop,
                left: newLeft,
                
            });
             
            LoadAvatar(newLeft, newTop ,imageSrc,avatarRef,
                circleRef,changeAvatarRef,setDataToChangeAvatar,ImageToPath)
        }
        
        document.addEventListener('mousemove', MouseMove);
        
        const stopDragging = () => {
            document.removeEventListener('mousemove', MouseMove);
            document.removeEventListener('mouseup', stopDragging); 
        }
        
        document.addEventListener('mouseup', stopDragging);
        e.preventDefault();  
    } 
    
    function dragnDrop(e,dataTrans){
        TransformNavigateCircle(e, setCircleSize,setStyleCircle,circleSize,  dataTrans, checkRef,circleRef,setTest)
        
    }

    const changeMiniaturyAvatar=()=>{
        dispatch(changeSizeAvatar(dataToChangeAvatar))
    }
    
    return (
        <div className={cl.container_miniatury}>
            <div ref={blockMiniaturyRef} className={cl.block_miniatury}>
                <div data-testid='moving-circle' style={{...styleCircle,...circleSize}} ref={circleRef} onMouseDown={(e)=>navigateCursor(e)} className={cl.navigate_circle}>
                  <span  className={[cl.transform_circle,cl.trans1].join(' ')} onMouseDown={(e)=>dragnDrop(e,['right bottom'])}></span>
                  <span className={[cl.transform_circle,cl.trans2].join(' ')} onMouseDown={(e)=>dragnDrop(e,['left bottom'])}></span>
                  <span className={[cl.transform_circle,cl.trans3].join(' ')} onMouseDown={(e)=>dragnDrop(e,['left top'])}></span>
                  <span data-testid='transform-circle4' className={[cl.transform_circle,cl.trans4].join(' ')} onMouseDown={(e)=>dragnDrop(e,['right top'])}></span>
                </div>
                <div ref={checkRef} data-testid='checkRect'  className={cl.parentImage}>
                    <canvas ref={avatarRef} data-testid='cut-out-avatar' width={'220px'} height={'220px'}>

                    </canvas>
                </div>
                <canvas ref={changeAvatarRef} className={cl.change_avatar} width={'160px'} height={'160px'}>

                </canvas>
            </div>
            <MyButton onClick={()=>changeMiniaturyAvatar()}>сохранить данные</MyButton>
            <p>{test}</p> 
        </div>
    );
};

export default ChangeMiniatury;


