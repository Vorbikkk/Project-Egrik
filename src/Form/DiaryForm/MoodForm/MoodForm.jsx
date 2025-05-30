import React, { useState } from 'react';
import styles from './MoodForm.module.css';

// Mock данные для diaryEntries
const mockDiaryEntries = [
  { entry_id: 1, date: '2023-05-01', title: 'Утро понедельника' },
  { entry_id: 2, date: '2023-05-02', title: 'Продуктивный день' },
  { entry_id: 3, date: '2023-05-03', title: 'Отдых' },
  { entry_id: 4, date: '2023-05-04', title: 'Встреча с друзьями' },
  { entry_id: 5, date: '2023-05-05', title: 'Выходные' },
];

// Варианты эмоций
const emotionOptions = [
  '😊 Радость', '😢 Грусть', '😠 Злость', '😨 Страх', 
  '😮 Удивление', '😌 Спокойствие', '💪 Энергия', '😴 Усталость',
  '😍 Любовь', '🤔 Задумчивость', '😖 Стресс', '🤗 Благодарность'
];

const MoodForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    entry_id: '',
    mood_rating: 5,
    emotions: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmotionChange = (emotion) => {
    setFormData(prev => {
      const newEmotions = prev.emotions.includes(emotion)
        ? prev.emotions.filter(e => e !== emotion)
        : [...prev.emotions, emotion];
      return { ...prev, emotions: newEmotions };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      emotions: formData.emotions.join(', ')
    });
    setFormData({
      entry_id: '',
      mood_rating: 5,
      emotions: []
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>📊 Запись настроения</h2>
      
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
          😃 Уровень настроения: <span className={styles.ratingValue}>{formData.mood_rating}/10</span>
        </label>
        <div className={styles.emojiScale}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <button
              key={num}
              type="button"
              className={`${styles.emojiButton} ${formData.mood_rating === num ? styles.active : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, mood_rating: num }))}
            >
              {getMoodEmoji(num)}
            </button>
          ))}
        </div>
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>
          🎭 Эмоции:
        </label>
        <div className={styles.emotionsGrid}>
          {emotionOptions.map(emotion => (
            <label key={emotion} className={styles.emotionOption}>
              <input
                type="checkbox"
                checked={formData.emotions.includes(emotion)}
                onChange={() => handleEmotionChange(emotion)}
                className={styles.emotionCheckbox}
              />
              <span className={styles.emotionText}>{emotion}</span>
            </label>
          ))}
        </div>
      </div>
      
      <button type="submit" className={styles.submitButton}>
        💾 Сохранить настроение
      </button>
    </form>
  );
};

// Функция для получения emoji по рейтингу настроения
function getMoodEmoji(rating) {
  if (rating <= 2) return '😭';
  if (rating <= 4) return '😞';
  if (rating <= 6) return '😐';
  if (rating <= 8) return '😊';
  return '😁';
}

export default MoodForm;