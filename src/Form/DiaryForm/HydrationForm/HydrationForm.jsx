import React, { useState } from 'react';
import styles from './HydrationForm.module.css';
import SliderDrink from './SliderDrink';

// Mock данные для diaryEntries
const mockDiaryEntries = [
  { entry_id: 1, date: '2023-05-01', title: 'Утро понедельника' },
  { entry_id: 2, date: '2023-05-02', title: 'Тренировочный день' },
  { entry_id: 3, date: '2023-05-03', title: 'Офисный день' },
  { entry_id: 4, date: '2023-05-04', title: 'Выходной' },
  { entry_id: 5, date: '2023-05-05', title: 'Активный отдых' },
];



const HydrationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    entry_id: '',
    amount: 500,
    drink_type: '💧 Вода',
    time: new Date().toTimeString().substr(0, 5),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;


    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      entry_id: '',
      amount: 500,
      drink_type: '💧 Вода',
      time: new Date().toTimeString().substr(0, 5),
    });
  };




  const addAmount = (value) => {
    setFormData(prev => ({
      ...prev,
      amount: Math.max(0, Math.min(prev.amount + value, 2000))
    }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>💦 Трекер гидратации</h2>

      <div className={styles.formGroup}>
        <label htmlFor="entry_id" className={styles.label}>
          📅 Запись в дневнике:
        </label>
        <select
          id="entry_id"
          name="entry_id"
          value={formData.entry_id}
          onChange={handleChange}
          className={styles.select}
          required
        >
          <option value="">-- Выберите запись --</option>
          {mockDiaryEntries.map(entry => (
            <option key={entry.entry_id} value={entry.entry_id}>
              {new Date(entry.date).toLocaleDateString()} - {entry.title}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          🕒 Время:
        </label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className={styles.timeInput}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          🥤 Тип напитка:
        </label>
        <SliderDrink formData={formData} setFormData={setFormData}/>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          💧 Количество: <span className={styles.amountValue}>{formData.amount} мл</span>
        </label>
        <div className={styles.amountControls}>
          <button
            type="button"
            className={styles.amountButton}
            onClick={() => addAmount(-100)}
          >
            -100
          </button>
          <div className={styles.waterBottle}>
            <div
              className={styles.waterFill}
              style={{ height: `${Math.min(100, formData.amount / 20)}%` }}
            />
            <div className={styles.waterAmount}>{formData.amount} мл</div>
          </div>
          <button
            type="button"
            className={styles.amountButton}
            onClick={() => addAmount(100)}
          >
            +100
          </button>
        </div>
        <input
          type="range"
          name="amount"
          min="0"
          max="2000"
          step="50"
          value={formData.amount}
          onChange={handleChange}
          className={styles.rangeSlider}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        💾 Сохранить данные
      </button>
    </form>
  );
};

export default HydrationForm;