import React from 'react';
import cl from './MyInput.module.css'

const MyInput = (props) => {

  const {className,...remainder}=props
  const classDefault=[cl.MyInput]

      
       if(className){
          classDefault.push(className)
       }
     

    return (
        <input
        placeholder='введите название...'
        type='text'
         className={classDefault.join(' ')} 
         {...remainder} />
    );
};

export default MyInput;