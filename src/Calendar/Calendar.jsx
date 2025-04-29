import { useState, useMemo } from 'react';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    getDay,
    addDays,
    setHours as setDateHours,
    setMinutes as setDateMinutes
} from 'date-fns';
import cl from './Calendar.module.css';
import TimePicker from './TimePicker/TimePicker';
import MyButton from '../UI/MyButton/MyButton';

const Calendar = ({ setEndData }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [sendData,setSendData]=useState()

    // Генерация дней календаря
    const monthDays = useMemo(() => {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);
        const startDay = getDay(start);
        const startDate = addDays(start, -startDay);
        return eachDayOfInterval({ start: startDate, end });
    }, [currentMonth]);

    const handleDateSelect = (day) => {
        setSelectedDate(day);
        setShowTimePicker(true);
    };


    if (showTimePicker) {
        return (
            <div className={cl.timePicker}>
                <h3>Выберите время окончания:</h3>
                <TimePicker
                    currentDate={format(selectedDate,'yyyy-MM-dd')}
                    sendData={sendData}
                    setSendData={setSendData}
                    setEndData={setEndData}
                />
                <div className={cl.container_btn}>
                    <MyButton 
                        className={cl.confirmButton}
                        onClick={() => setShowTimePicker(false)}
                    >
                        Назад
                    </MyButton>
                    <MyButton
                        className={cl.confirmButton}
                        onClick={()=>setSendData(true)}
                    >
                        Установить дату окончания
                    </MyButton>
                </div>
            </div>
        );
    }

    return (
        <div className={cl.container}>
            <div className={cl.calendar}>
                <div className={cl.header}>
                    <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                        &lt;
                    </button>
                    <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
                    <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                        &gt;
                    </button>
                </div>

                <div className={cl.daysGrid}>
                    {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                        <div key={day} className={cl.dayHeader}>{day}</div>
                    ))}

                    {monthDays.map(day => {
                        const isCurrent = selectedDate && isSameDay(day, selectedDate);
                        const isOtherMonth = !isSameMonth(day, currentMonth);

                        return (
                            <div
                                key={day.toString()}
                                className={`${cl.day} ${isOtherMonth ? cl.otherMonth : ''} ${isCurrent ? cl.selected : ''}`}
                                onClick={() => handleDateSelect(day)}
                            >
                                {format(day, 'd')}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Calendar;