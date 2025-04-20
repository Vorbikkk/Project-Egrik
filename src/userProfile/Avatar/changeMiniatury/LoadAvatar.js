let AvatarChangeRef
let RefCircle
let pathToImage
let setDataAvatar


export  const LoadAvatar = (cord_x, cord_y,imageSrc,avatarRef,
    circleRef,changeAvatarRef,setDataToChangeAvatar,ImageToPath) => {


        AvatarChangeRef=changeAvatarRef
        RefCircle=circleRef
        pathToImage=ImageToPath
        setDataAvatar=setDataToChangeAvatar

let ctx = avatarRef.current.getContext('2d');
const img = new Image();
img.src = imageSrc;
let positionCircle=circleRef.current.getBoundingClientRect()
let radius=positionCircle.width / 2


const canvasRect = avatarRef.current.getBoundingClientRect();
let x = cord_x - canvasRect.left + radius;
let y = cord_y - canvasRect.top + radius;
DisplayAvatar(x, y)

img.onload = () => {
    ctx.clearRect(0, 0, 220, 220);
    ctx.drawImage(img, 0, 0, 220, 220);
    
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, 220, 220);
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    ctx.clip('evenodd');
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, 220, 220);
    
    ctx.restore();
};

}

export const DisplayAvatar = (x, y) => {
    let ctx = AvatarChangeRef.current.getContext('2d');
    let positionCircle=RefCircle.current.getBoundingClientRect()
    const img = new Image();
    let  height=positionCircle.width
    let radius=positionCircle.width / 2
    img.src = pathToImage;
    img.onload = () => {
        
        ctx.drawImage(img, x - radius, y - radius,height,height ,0,0,160,160);
    };
    setDataAvatar( { x:x - radius,y:y - radius,width:height,height:height} )
}



 
