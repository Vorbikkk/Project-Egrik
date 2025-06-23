import React, { useEffect, useState } from "react";
import cl from './GroupsManager.module.css'
import CreateGroup from '../CreateGroup/CreateGroup'
import GroupsList from '../GroupsList/GroupsList'
import { useGetNoteMarkQuery } from "../../../RTK/Service/NoteMarkApi/NoteMarkApi";
import PrioritySlider from "../../../UI/Slider/PrioritySlider";
import FilterNotes from "../../FilterNotes/FilterNotes";
import { addNoteMark } from "../../../RTK/app/Slice/SliceNoteMark";
import { useDispatch } from "react-redux";

const GroupsManager = ({onApply}) => {
  const [limit, setLimit] = useState(5); // Начальный лимит 5
  const { data } = useGetNoteMarkQuery({ page: 1, limit });
  const dispatch=useDispatch()

  function showNotes(name,id){

    const group={id:id,nt_mark_title:name}

    dispatch( addNoteMark(group))
  }


  return (
    <div className={cl.container}>
      <h2 className={cl.title}>Мои группы</h2>
      <CreateGroup />

        {data && (
        <GroupsList
          groups={data.rows}
          limit={limit}
          setLimit={setLimit}
          totalGroups={data.count} // Общее количество групп
        />
      )}
      <hr className={cl.line} />
               <FilterNotes onApply={onApply} />
      <hr className={cl.line} />
      
        <div>
          <button onClick={()=>showNotes('Выполненные','1')}>Выполненные</button>
          <button onClick={()=>showNotes('Не выполненные','2')}>Не выполненные</button>
        </div>

    </div>
  );
};

export default GroupsManager;