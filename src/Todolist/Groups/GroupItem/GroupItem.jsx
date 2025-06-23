import React from "react";
import cl from './GroupItem.module.css'
import { useDispatch } from "react-redux";
import { addNoteMark } from "../../../RTK/app/Slice/SliceNoteMark";

const GroupItem = ({ group, onOptionsClick }) => {
   
  const dispatch=useDispatch()


  return (
    <div 
    key={`noteMark${group.id}`} 
    className={cl.groupItem}
     onClick={(e) => {
          e.stopPropagation();
          dispatch( addNoteMark(group));
        }}
    >
      <span className={cl.groupName}>{group.nt_mark_title}</span>
      <button 
        className={cl.optionsButton}
       
      >
        <span className={cl.dot}></span>
        <span className={cl.dot}></span>
        <span className={cl.dot}></span>
      </button>
    </div>
  );
};

export default GroupItem