import React,{useState,useEffect,useRef} from 'react';
import cl from './Exercise.module.css'
import SerachTags from './SerachTags';

const Exercise = () => {

    const [tags,setTags]=useState([{
        id:new Date().getTime(),
        name:'#gagasgda'
    }]) //убрать отсюда объект
    const [addTags,setAddTags]=useState([])
    const [searchTags,setSearchTags]=useState(false)
    const SearchTagsRef=useRef()

    useEffect(() => {
            const handleClickOutside = (event) => {
                if (SearchTagsRef.current && !SearchTagsRef.current.contains(event.target)) {
                    setSearchTags(false);
                }
            };
    
            if (searchTags) {
                document.addEventListener('click', handleClickOutside);
            }
    
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }, [searchTags]);
    

    const newTag={
        id:new Date().getTime(),
        name:'#gagasgda'
    }

    return (
        <div ref={SearchTagsRef} onClick={()=>setSearchTags(true)} className={cl.searchTags}>
           
           {
             searchTags &&  <ul onClick={e=>e.stopPropagation()} className={cl.selectListTags}>
             {tags.map(tag=>
              <li 
              onClick={()=>setAddTags(...addTags,tag)}
              className={cl.tag}>{tag.name}</li>
             )}
          </ul> 
           }
           <div>
             {addTags.map((addTag)=>{
              return  <span className={cl.addTag}>{addTag.name}</span>
             })}
             { searchTags && <SerachTags tags={tags} setTags={setTags}/>   }
          </div>

           
        </div>
    );
};

export default Exercise;