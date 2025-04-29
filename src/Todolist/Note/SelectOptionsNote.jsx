import React, { useEffect, useState, useRef } from 'react';
import cl from './SelectOptionsNote.module.css';
import ModalDefault from '../../Modal/ModalDefault';
import WindowNoteInformation from './WindowNoteInformation';
import DeleteIcon from './Icons/DeleteIcon';
import EditIcon from './Icons/EditIcon';
import EditNoteForm from './EditNote/EditNote';

const SelectOptionsNote = (props) => {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [activeEditModal,setActiveEditModal]=useState(false)

    const { note ,setIsModalOpen,isModalOpen,CallWindowClarify}=props
    const selectRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsSelectOpen(false);
            }
        };

        if (isSelectOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isSelectOpen]);

    const toggleSelect = (e) => {
        e.stopPropagation();  
        setIsSelectOpen(prev => !prev);
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
                <ul className={cl.selectNote}>
                    <li 
                        className={cl.option} 
                        onClick={() => {
                            setIsModalOpen(true);
                            setIsSelectOpen(false);
                        }}
                    >
                        подробнее
                    </li>
                    <li 
                    className={cl.option} 
                    onClick={() => CallWindowClarify('delete')}
                    style={{color:'red'}}>
                    удалить
                    <DeleteIcon  />
                    </li>
                    <li  className={cl.option} onClick={()=>setActiveEditModal(true)} >
                      редактирвоать  <EditIcon />
                    </li>
                </ul>
            )}
            
            <ModalDefault active={isModalOpen} setActive={setIsModalOpen}>
                <WindowNoteInformation note={note} />
            </ModalDefault>
            <ModalDefault active={activeEditModal} setActive={setActiveEditModal}>
                <EditNoteForm note={note} setActiveEditModal={setActiveEditModal}/>
            </ModalDefault>

        </div>
    );
};

export default SelectOptionsNote;