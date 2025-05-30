import React, { useState } from 'react';
import styles from './WorkoutForm.module.css';

// Mock данные для diaryEntries
const mockDiaryEntries = [
  { entry_id: 1, date: '2023-05-01', title: 'Утренняя пробежка' },
  { entry_id: 2, date: '2023-05-02', title: 'Силовая тренировка' },
  { entry_id: 3, date: '2023-05-03', title: 'Йога' },
  { entry_id: 4, date: '2023-05-04', title: 'Плавание' },
  { entry_id: 5, date: '2023-05-05', title: 'Велоспорт' },
];

const WorkoutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    entry_id: '',
    workout_type: '',
    duration: '00:30:00', // Значение по умолчанию 30 минут
    intensity: 5
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Сброс формы после отправки
    setFormData({
      entry_id: '',
      workout_type: '',
      duration: '00:30:00',
      intensity: 5
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}> Дневник тренировок</h2>
      
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
        <label htmlFor="workout_type" className={styles.label}>
          🏋️ Тип тренировки:
        </label>
        <input
          type="text"
          id="workout_type"
          name="workout_type"
          value={formData.workout_type}
          onChange={handleChange}
          className={styles.input}
          placeholder="Например: Бег, йога, плавание..."
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="duration" className={styles.label}>
          ⏱️ Длительность:
        </label>
        <div className={styles.timeInputContainer}>
          <input
            type="time"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className={styles.timeInput}
            step="1"
            required
          />
          <span className={styles.timeHint}>HH:MM:SS</span>
        </div>
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="intensity" className={styles.label}>
          🔥 Интенсивность: <span className={styles.intensityValue}>{formData.intensity}/10</span>
        </label>
        <div className={styles.rangeContainer}>
          <input
            type="range"
            id="intensity"
            name="intensity"
            min="1"
            max="10"
            value={formData.intensity}
            onChange={handleChange}
            className={styles.range}
          />
          <div className={styles.rangeMarks}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <span key={num} className={styles.rangeMark}>{num}</span>
            ))}
          </div>
        </div>
      </div>
      
      <button type="submit" className={styles.submitButton}>
        💾 Сохранить тренировку
      </button>
    </form>
  );
};

export default WorkoutForm;