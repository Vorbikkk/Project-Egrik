import React, { useEffect, useState } from 'react';
import Loading from '../../UI/Loading/Loading';
import cl from './WindowNoteInformation.module.css';

const WindowNoteInformation = ({ note }) => {
    const [remainderTime, setRemainderTime] = useState('');
    const { note_name, note_description, note_expiration_date } = note;

      const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

    useEffect(() => {
        setIsLoading(true); // Устанавливаем загрузку при изменении заметки
        
        const updateRemainderTime = () => {
            const timeLeft = new Date(note_expiration_date).getTime() - new Date().getTime();
            
            if (timeLeft <= 0) {
                setRemainderTime('Время истекло!');
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            setRemainderTime(`${days} д. ${hours} ч. ${minutes} мин ${seconds} сек`);
        };

        updateRemainderTime();
        const interval = setInterval(updateRemainderTime, 1000);

        // Добавляем небольшую задержку для плавности
        const timeout = setTimeout(() => setIsLoading(false), 300);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [note.note_expiration_date]);

    if (isLoading) {
      return  <Loading/>;
    }
    return (
        <div className={cl.block_information}>
            <h3 className={cl.title}>{note_name}</h3>
            <p className={cl.description}>{'описание:' + note_description}</p>
            <div className={cl.timer}>
                <span>Осталось:</span>
                <span className={cl.time}>{'осталось:' + remainderTime}</span>
            </div>
        </div>
    );
};

export default WindowNoteInformation;