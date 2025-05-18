import React,{useEffect,useState} from 'react';

const useActivateBlock = (elemRef) => {

    const [activateElem,setActivateElem]=useState(false)
    
    
    useEffect(() => {
        let parentElem= elemRef.current.parentNode ? elemRef.current.parentNode : document
        const handleClickOutside = (event) => {
            if (elemRef.current && !elemRef.current.contains(event.target)) {
                setActivateElem(false);
            }
        };
        
        if (activateElem) {
           parentElem.addEventListener('click', handleClickOutside);
        }

       else{
        return () => {
            parentElem.removeEventListener('click', handleClickOutside);
        };
       }
    }, [activateElem]);

    

    return [activateElem,setActivateElem]

};

export default useActivateBlock;