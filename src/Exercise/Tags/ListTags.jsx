import React from 'react';
import cl from './ListTags.module.css'

const ListTags = ({listTags,AddTag}) => {

    const listClass=[cl.listTags]

    if(listTags.length > 4){
       listClass.push(cl.scroll)
    }

    return (
        <div>
                <ul className={listClass.join(' ')}>
              {
                listTags.map((tag,index)=>
                    <li
                       key={`tag${tag.ex_mark_title}`} 
                       onClick={(e)=>AddTag(e,tag,index++)}
                       className={cl.tag}>
                        {tag.ex_mark_title}
                    </li>
               ) }
            </ul>
        </div>
    );
};

export default ListTags;