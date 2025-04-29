import React,{useState,useRef, useEffect} from 'react';
import cl from  './ModalDefault.module.css'

const ModalDefault = ({active,setActive,children}) => {

      if(active===true){
        return (
            <div className={cl.Modal} style={{zIndex:1000}} onClick={()=>setActive(false) }>
              <div   onClick={e=>e.stopPropagation()}>
              {children}
              </div>
            </div>
        );
      }
    

     
  
};

export default ModalDefault;