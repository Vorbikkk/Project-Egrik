import React,{useState} from "react";
import cl from './CreateGroup.module.css'
import { useCreateNoteMarkMutation } from "../../../RTK/Service/NoteMarkApi/NoteMarkApi";


const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [createNoteMark,]=useCreateNoteMarkMutation()

  const handleSubmit =async  (e) => {
    e.preventDefault();
    if (groupName.trim()) {
       
      await   createNoteMark({nt_mark_title:groupName})
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
      setGroupName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cl.createGroup}>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Название группы"
        className={cl.input}
        maxLength={30}
        required
      />
      <button type="submit" className={cl.createButton}>
        +
      </button>
    </form>
  );
};

export default CreateGroup