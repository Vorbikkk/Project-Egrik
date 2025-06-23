import React from 'react';
import CompletedNote from '../CompletedNote/CompletedNote';
import Note from '../Note';

const DistributeNotes = ({ name_notes, props, setNote, styles,selectNotes,index,  CallNotification,noteNotificate }) => {
    switch (name_notes) {
        case 'Выполненные': return <div>
            <CompletedNote 
            props={props} 
            setNote={setNote}
            selectNotes={selectNotes}
             />
            </div>
        default: return <div>
            <Note
            key={`note-${props.id}`}
             props={props}
             index={index}
            selectNotes={selectNotes}
            setNote={setNote}
            CallNotification={CallNotification}
            noteNotificate={noteNotificate}
            styles={styles} />
            </div>

    }

};

export default DistributeNotes;