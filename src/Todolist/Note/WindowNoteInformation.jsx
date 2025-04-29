import React, { useEffect, useState } from 'react';
import cl from './WindowNoteInformation.module.css';

const WindowNoteInformation = ({ note }) => {
    const [remainderTime, setRemainderTime] = useState('');
    const { note_name, note_description, note_expiration_date } = note;

    useEffect(() => {
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

            setRemainderTime(`${days} дней ${hours} ч ${minutes} мин ${seconds} сек`);
        };

        updateRemainderTime();
        const interval = setInterval(updateRemainderTime, 1000);

        return () => clearInterval(interval);
    }, [note_expiration_date]);
    console.log(note_description)

    return (
        <div className={cl.block_information}>
            <h3 className={cl.title}>название:{note_name}</h3>
            <p className={cl.description}>описание:{note_description}</p>
            <div className={cl.timer}>
                <span>Осталось:</span>
                <span className={cl.time}>{remainderTime}</span>
            </div>
        </div>
    );
};

export default WindowNoteInformation;