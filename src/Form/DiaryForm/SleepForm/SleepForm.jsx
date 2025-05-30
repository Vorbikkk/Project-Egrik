import React, { useState } from 'react';
import styles from './SleepForm.module.css';
import {useNavigate} from 'react-router-dom'
import ModalDefault from '../../../Modal/ModalDefault'
import Calendar from '../../../Calendar/Calendar';

const SleepForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    sleep_duration: '',
    sleep_quality: 3,
    awakenings: 0
  });
  const [activeCalendar,setActiveCalendar]=useState(false)
  const navigate=useNavigate()




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const objEntry={
    entryData:{
      date:new Date(),
    sleep_duration: '',
    sleep_quality: 3,
    awakenings: 0
  },
   onClick:(day)=>{
    navigate('/todolist')
   },
  classDay:styles.classDay
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📝 Дневник сна</h2>
       <div className={styles.boxEntryDiary}>
        <p className={styles.title}>Записи дневника</p>
        <button 
        onClick={()=>setActiveCalendar(true)}
        className={styles.btnCalendar}>
          📅 
          </button>
       </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="sleep_duration" className={styles.label}>
            Продолжительность сна
          </label>
          <input
            type="time"
            id="sleep_duration"
            name="sleep_duration"
            value={formData.sleep_duration}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="sleep_quality" className={styles.label}>
            Качество сна: {formData.sleep_quality}/5
          </label>
          <input
            type="range"
            id="sleep_quality"
            name="sleep_quality"
            min="1"
            max="5"
            value={formData.sleep_quality}
            onChange={handleChange}
            className={styles.range}
          />
          <div className={styles.qualityMarks}>
            <span>😴</span>
            <span>😌</span>
            <span>😊</span>
            <span>😃</span>
            <span>🤩</span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="awakenings" className={styles.label}>
            Количество пробуждений
          </label>
          <div className={styles.counter}>
            <button
              type="button"
              className={styles.counterBtn}
              onClick={() => setFormData(prev => ({
                ...prev,
                awakenings: Math.max(0, prev.awakenings - 1)
              }))}
            >
              -
            </button>
            <span className={styles.counterValue}>{formData.awakenings}</span>
            <button
              type="button"
              className={styles.counterBtn}
              onClick={() => setFormData(prev => ({
                ...prev,
                awakenings: prev.awakenings + 1
              }))}
            >
              +
            </button>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Сохранить запись
        </button>
      </form>
      <ModalDefault active={activeCalendar} setActive={setActiveCalendar}>
        <Calendar objEntry={objEntry} />
      </ModalDefault>
    </div>
  );
};

export default SleepForm;