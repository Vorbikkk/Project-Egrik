import React from 'react';
import cl from './MyButton.module.css'

const MyButton = ({children,...props}) => {

    const {className,...remeinder}={...props}
    const classDefault=[cl.my_btn]
    
     if(className){
        classDefault.push(className)
     }

    return (
       <button className={classDefault.join(' ')}   {...remeinder}>
        {children}
       </button>
    );
};

export default MyButton;