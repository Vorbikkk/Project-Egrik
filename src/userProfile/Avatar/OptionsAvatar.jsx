import React,{useState} from 'react';
import cl from './OptionsAvatar.module.css'
import ChangeMiniatury from './changeMiniatury/ChangeMiniatury';
import ModalDefault from '../../Modal/ModalDefault';

const OptionsAvatar = ({coordinat,activeOptions,setActiveOptions,imageData,setImageData}) => {


      const [active,setActive]=useState()
     
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
    
        if (file) {
    
          const reader = new FileReader();
    
          reader.onload = (e) => {
            console.log(e.target)
            const base64Image = e.target.result; 
    
            const img = new Image();
            img.onload = () => {
              setImageData({
                name: file.name,
                size: file.size,
                type: file.type,
                width: img.width,
                height: img.height,
                base64: base64Image, 
              });
            };
            img.src = base64Image;
          };
    
          reader.readAsDataURL(file); 
        }

      };

     let stop=(e)=>{
       e.stopPropagation()
      setActiveOptions(false)
     }


  if(activeOptions===true){
    return (
        <div  className={cl.modal_options} onClick={(e)=>stop(e)}>
            <div className={cl.options} style={{marginTop:`${coordinat.page_Y}px`,marginLeft:`${coordinat.page_X}px`}} onClick={(e)=>e.stopPropagation()}>
               <label className={cl.input_file} htmlFor="input-file">выбрать файл</label>
               <input type="file" onChange={(e)=>handleImageChange(e)} id='input-file' style={{display:'none'}} />
               <button onClick={()=>setActive(true)} className={cl.btn_miniatury} >изменить миниатюру</button>
            </div>
            <ModalDefault active={active} setActive={setActive}>
               {imageData &&   <ChangeMiniatury imageSrc={imageData} />}
            </ModalDefault>
        </div>
    );
  }
  else{
    return(<div style={{display:"none"}}></div>)
  }
    
};

export default OptionsAvatar;