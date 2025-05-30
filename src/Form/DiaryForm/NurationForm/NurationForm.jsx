import React, { useState } from 'react';
import styles from './NurationForm.module.css';

const NutritionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    meal_count: 3,
    calories: 2000,
    macros: { protein: 0, carbs: 0, fat: 0 },
    supplements: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMacroChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      macros: { ...prev.macros, [name]: parseInt(value) || 0 }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🍎 Дневник питания</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="meal_count" className={styles.label}>
            Количество приёмов пищи: {formData.meal_count}
          </label>
          <input
            type="range"
            id="meal_count"
            name="meal_count"
            min="1"
            max="10"
            value={formData.meal_count}
            onChange={handleChange}
            className={styles.range}
          />
          <div className={styles.mealIcons}>
            {[...Array(10)].map((_, i) => (
              <span key={i} className={i < formData.meal_count ? styles.activeMeal : ''}>
                {i < 3 ? '🍽️' : i < 6 ? '🥗' : '🍏'}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="calories" className={styles.label}>
            Калории: {formData.calories} ккал
          </label>
          <input
            type="range"
            id="calories"
            name="calories"
            min="800"
            max="4000"
            step="50"
            value={formData.calories}
            onChange={handleChange}
            className={styles.range}
          />
          <div className={styles.calorieMeter}>
            <span>🥬 Мало</span>
            <span>⚖️ Норма</span>
            <span>🏋️ Много</span>
          </div>
        </div>

        <div className={styles.macrosGrid}>
          <h3 className={styles.macroTitle}>Макронутриенты (г)</h3>
          <div className={styles.macroInput}>
            <label htmlFor="protein">🥩 Белки</label>
            <input
              type="number"
              id="protein"
              name="protein"
              value={formData.macros.protein}
              onChange={handleMacroChange}
              min="0"
              className={styles.macroNumber}
            />
          </div>
          <div className={styles.macroInput}>
            <label htmlFor="carbs">🍞 Углеводы</label>
            <input
              type="number"
              id="carbs"
              name="carbs"
              value={formData.macros.carbs}
              onChange={handleMacroChange}
              min="0"
              className={styles.macroNumber}
            />
          </div>
          <div className={styles.macroInput}>
            <label htmlFor="fat">🥑 Жиры</label>
            <input
              type="number"
              id="fat"
              name="fat"
              value={formData.macros.fat}
              onChange={handleMacroChange}
              min="0"
              className={styles.macroNumber}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="supplements" className={styles.label}>
            Добавки/Дополнения
          </label>
          <textarea
            id="supplements"
            name="supplements"
            value={formData.supplements}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Витамины, протеин и т.д."
            rows="3"
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Сохранить питание
        </button>
      </form>
    </div>
  );
};

export default NutritionForm;