import React from 'react';
import cl from './MyInput.module.css'

const MyInput = (props) => {

  const {className,...remainder}=props
  const classDefault=[cl.MyInput]

      
       if(className){
          classDefault.push(className)
          console.log(className)
       }
     

    return (
        <input className={classDefault.join(' ')} {...remainder} />
    );
};

export default MyInput;