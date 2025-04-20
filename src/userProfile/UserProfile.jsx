import React,{useState,useRef, useEffect} from 'react';
import Avatar from './Avatar/Avatar';
import UserName from './UserName'
import cl from './UserProfile.module.css'
import { Link } from 'react-router-dom';
import MyButton from '../UI/MyButton/MyButton';

const UserProfile = () => {

    const [pathToImage,setPathToImage]=useState('')
    let canvasRef=useRef(null )



const UserData={
    url:'./default_user_profile.jpg'
}

  
const Canvas=()=>{
let ctx=canvasRef.current.getContext('2d')

        ctx.clearRect(0, 0, 220, 220);
        
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, 220, 220);
        ctx.arc(100,100,80, 0, 2 * Math.PI, true);
        ctx.clip('evenodd');
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, 220, 220);
        
        ctx.restore();
}
  
  
 

    return (
        <div>
            <div className={cl.box_inline}>
            <Avatar url={UserData.url}/>
            <UserName/>
            <Link to={'/edit_userProfile'}>
             <MyButton >
                редактировать
             </MyButton>
            </Link>
            <MyButton onClick={()=>Canvas()}>
                dsgsdgdssf
            </MyButton>
            <canvas ref={canvasRef} width={220} height={220}>
                
            </canvas>
            </div>
            
        </div>
    );
};

export default UserProfile;