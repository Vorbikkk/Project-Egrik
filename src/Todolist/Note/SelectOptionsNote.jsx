import React, { useState, useRef, useEffect } from 'react';
import cl from './SelectOptionsNote.module.css';
import ModalDefault from '../../Modal/ModalDefault';
import EditNoteForm from './EditNote/EditNote';
import { useUpdateNoteMutation } from '../../RTK/Service/NoteService';
import DeleteIcon from './Icons/DeleteIcon'
import EditIcon from './Icons/EditIcon'
import PinIcon from  './Icons/PinIcon/PinIcon'

const SelectOptionsNote = ({ note, setIsModalOpen, isModalOpen }) => {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [activeEditModal, setActiveEditModal] = useState(false);
    const [updateNote] = useUpdateNoteMutation();
    const selectRef = useRef(null);
    const [stylePos, setStylePos] = useState({});

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsSelectOpen(false);
            }
        };

        if (isSelectOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => document.removeEventListener('click', handleClickOutside);
    }, [isSelectOpen]);

    const handleUpdateNote = async (updates) => {
      

        await updateNote(({ id: note.id, ...updates  }))
        .then(res=>console.log(res))
        setIsSelectOpen(false);
    };

    const toggleSelect = (e) => {
        e.stopPropagation();
        setIsSelectOpen(prev => !prev);
        setStylePos({
            left: e.clientX - 150 + 'px',
            top: e.clientY + 'px'
        });
    };

    return (
        <div className={cl.container_select} ref={selectRef}>
            <div
                className={cl.blockOpenSelect}
                onClick={toggleSelect}
                aria-expanded={isSelectOpen}
                aria-haspopup="true"
            >
                <span className={cl.openSelect}>...</span>
            </div>

            {isSelectOpen && (
                <ul
                    onClick={(e) => e.stopPropagation()}
                    style={stylePos}
                    className={cl.selectNote}
                >
                    <p>Приоритет</p>
                    <li className={cl.rankNotes}>
                        {[4, 3, 2, 1].map((priority) => (
                            <span 
                                key={priority} 
                                onClick={() => handleUpdateNote({ note_priority: priority, })}
                            >
                                {['⚪','🔵','🟡', '🟠'][priority - 1]}
                            </span>
                        ))}
                    </li>
                    <li
                        className={cl.option}
                        onClick={() => handleUpdateNote({ note_pin: !note.note_pin })}
                    >
                        {!note.note_pin ? 'закрепить' : 'открепить'} <PinIcon active={note.note_pin} />
                    </li>
                    <li 
                        className={cl.option} 
                        onClick={() => setActiveEditModal(true)}
                    >
                        Редактировать <EditIcon />
                    </li>
                    <li
                        className={cl.option}
                        style={{ color: 'red' }}
                    >
                        Удалить <DeleteIcon />
                    </li>
                </ul>
            )}

            <ModalDefault active={activeEditModal} setActive={setActiveEditModal}>
                <EditNoteForm note={note} setActiveEditModal={setActiveEditModal} />
            </ModalDefault>
        </div>
    );
};

export default SelectOptionsNote;