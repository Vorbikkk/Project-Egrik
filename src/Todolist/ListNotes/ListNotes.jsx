import React, { useEffect } from 'react';
import cl from './ListNotes.module.css'
import Note from '../Note/Note';
import PaginationNote from '../PaginationNote/PaginationNote';

const ListNotes = ({listNotes,setNumberPagination}) => {
 
        
    return (
        <div className={cl.container_notes}>
           {
            listNotes.rows.map(note=>
                <Note key={`note${note.id}`} props={note} />
            )
           }   
           <PaginationNote count={listNotes.count} setNumberPagination={setNumberPagination} />
        </div>
    );
};

export default ListNotes;