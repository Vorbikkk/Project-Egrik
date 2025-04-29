import React, { useState,useRef, useEffect } from 'react';
import cl from './Avatar.module.css'
import OptionsAvatar from './OptionsAvatar';
import ModalDefault from '../../Modal/ModalDefault';
import { useSelector } from 'react-redux';

const Avatar = ( ) => {
    const miniaturyAvatar=useSelector((state)=>state.dataAvatar)
    const [changeFoto, setChangeFoto] = useState('none')
    const [coordinat, setCoordinat] = useState({})
    const [imageData, setImageData] = useState(null);
    const [active, setActive] = useState(false)
    const [activeOptions, setActiveOptions] = useState(false)
    const avatarRef=useRef()
   
    useEffect(()=>{
        if(imageData){
            let ctx = avatarRef.current.getContext('2d');
            let {x,y,height,width}=miniaturyAvatar
            let factor=imageData.width/220
            const img = new Image();
            img.src = imageData.base64;
            img.onload = () => {
                ctx.drawImage(img,x*factor,y*factor,factor*width,factor*height,0,0,160,160);
            };
            setActiveOptions(false)
        }

    },[miniaturyAvatar,imageData])
  
    
  
    
    const foto = () => {
        setChangeFoto('none')
    }
    let placeOptions = (e) => {
        e.stopPropagation()
        setCoordinat({
            page_X: e.pageX,
            page_Y: e.pageY
        })
        setActiveOptions(true)
    }



    return (
        <div
            onMouseOver={(e) => setChangeFoto('block')}
            onMouseOut={() => foto()}
            className={cl.Avatar}
        >
            <div onClick={() => setActive(true)}>
                <div className={cl.change_avatar} onClick={(e) => placeOptions(e)} style={{ display: changeFoto }}>изменить</div>
                <OptionsAvatar
                    coordinat={coordinat}
                    activeOptions={activeOptions}
                    setActiveOptions={setActiveOptions}
                    imageData={imageData ? imageData.base64 : ''} // исправить
                    setImageData={setImageData}
                />
                <canvas ref={avatarRef} width={160} height={160}>
                
                </canvas>
            
                
            </div>
            <ModalDefault imageData={imageData} active={active} setActive={setActive}>
            <div   className={cl.children_elem}  onClick={(e)=>e.stopPropagation()}>
                {imageData && <img src={imageData.base64} alt="Предпросмотр" style={{ maxWidth: '90%' }} />}
            </div>
            </ModalDefault>
        </div>
    );
};

export default Avatar;