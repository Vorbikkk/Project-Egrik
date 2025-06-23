import React, { useEffect, useState } from 'react';
import cl from './Notification.module.css';
import UndoIcon from '../../../Todolist/Note/Icons/UndoIcon';
import { useUpdateNoteMutation } from '../../../RTK/Service/NoteService';

const NotificationNote = ({
  text,
  undoTimeout = 3000,
  note,
  setNoteNotificate
}) => {
  const [timeLeft, setTimeLeft] = useState(undoTimeout);
  const [updateNote,] = useUpdateNoteMutation()

  // Таймер для анимации полоски
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 100) {
          clearInterval(timer);
          changeNote()
          setNoteNotificate(null);
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [note]);

  const handleUndo = () => {
    setNoteNotificate(null);
  };

  const changeNote = async () => {
    const { id, note_is_completed, note_pin, ...remainderNote } = note
    await updateNote(
      {
        id: id,
        note_is_completed: true,
        note_pin: false,
        ...remainderNote
      })
  }

  return (
    <div className={cl.notification}>
      <div className={cl.content}>
        <span className={cl.text}>{text}</span>
        <button
          className={cl.undoButton}
          onClick={handleUndo}
          aria-label="Отменить действие"
        >
          <UndoIcon />
        </button>
      </div>

      {/* Полоска таймера */}
      <div
        className={cl.timerLine}
        style={{ width: `${(timeLeft / undoTimeout) * 100}%` }}
      />
    </div>
  );
};

export default NotificationNote;