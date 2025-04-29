import React, { useEffect, useState } from 'react';
import cl from './Note.module.css';
import DeleteIcon from './Icons/DeleteIcon';
import ModalDefault from '../../Modal/ModalDefault';
import WindowClarify from './WindowClarify';
import SelectOptionsNote from './SelectOptionsNote';

const Note = ({ props }) => {

  const [selectBtn, setSelectBtn] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active, setActive] = useState(false)
  const { id, note_name, note_description, } = props


  function CallWindowClarify(str) {
    setActive(true)
    setSelectBtn(str)
  }


  return (
    <div className={cl.note}>
      <div >
        <h3 className={cl.noteTitle}> {note_name}</h3>
        <p className={cl.noteDesc}>
          {note_description.slice(0, 100)}
          {note_description.length > 100 &&
            <span onClick={() => setIsModalOpen(true)} className={cl.FullNoteInformation}>
              показать полностью...
            </span>}
        </p>
      </div>
      <div className={cl.container_btn}>
        <SelectOptionsNote
          CallWindowClarify={CallWindowClarify}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          note={props} />
      </div>
      <ModalDefault active={active} setActive={setActive}>
        <WindowClarify id={id} answer={selectBtn} setActive={setActive} />
      </ModalDefault>
    </div>
  );
};

export default Note;