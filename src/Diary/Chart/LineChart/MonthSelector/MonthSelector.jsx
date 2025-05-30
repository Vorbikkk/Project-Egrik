import React from 'react';
import cl from './MonthSelector.module.css';

const MonthSelector = ({ selectedMonth, onChange }) => {
  const months = [
    { value: 1, label: 'Январь' },
    { value: 2, label: 'Февраль' },
    { value: 3, label: 'Март' },
    { value: 4, label: 'Апрель' },
    { value: 5, label: 'Май' },
    { value: 6, label: 'Июнь' },
    { value: 7, label: 'Июль' },
    { value: 8, label: 'Август' },
    { value: 9, label: 'Сентябрь' },
    { value: 10, label: 'Октябрь' },
    { value: 11, label: 'Ноябрь' },
    { value: 12, label: 'Декабрь' },
  ];

  const handleChange = (e) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    onChange(value);
  };

  return (
    <div className={cl.monthSelector}>
      <label htmlFor="compare-month">Сравнить с:</label>
      <select
        id="compare-month"
        value={selectedMonth || ''}
        onChange={handleChange}
        className={cl.select}
      >
        <option value="">-- Не выбрано --</option>
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
      
      {selectedMonth && (
        <button 
          onClick={() => onChange(null)}
          className={cl.clearButton}
        >
          × Очистить
        </button>
      )}
    </div>
  );
};

export default MonthSelector;