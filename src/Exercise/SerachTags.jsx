import React,{useState} from 'react';
import cl from './SearchTags.module.css'

const SerachTags = ({tags,setTags}) => {

    const [title,setTitle]=useState('')

    const searchTags=(e)=>{
        setTitle(e.target.value)
       
        setTags([...tags].filter((tag)=>{
          return  tag.name.includes(e.target.value)
        }))

    }
    
    return (
        <input 
        type="text"
        value={title}
        onChange={e=>searchTags(e)}
        placeholder='введите название тэга'
        className={cl.inputSearchTags}
        />
    );
};

export default SerachTags;