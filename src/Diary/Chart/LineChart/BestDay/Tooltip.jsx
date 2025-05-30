import React from 'react';
import cl from './Tooltip.module.css';

const Tooltip = ({ data, position }) => {
  if (!data) return null;

  const { entryData = {}, ...indicator } = data;
  const keyNameEntryData = Object.keys(entryData);

  return (
    <div 
      className={cl.tooltipContainer}
      style={{
        left: position?.x - 100 || 0,
        top: (position?.y || 0) - 10, // Смещаем немного выше курсора
      }}
    >
      <div className={cl.tooltip}>
        {/* Заголовок с значением */}
        <div className={cl.header}>
          <span className={cl.indicatorName}>{indicator.name}</span>
          <span className={cl.indicatorValue}>{indicator.value}%</span>
        </div>
        
        {/* Дата */}
        {indicator.day && (
          <div className={cl.date}>
            {new Date(indicator.year, indicator.month - 1, indicator.day)
              .toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
          </div>
        )}
        
        {/* Детали */}
        <div className={cl.details}>
          {keyNameEntryData.map((key, index) => (
            <div key={index} className={cl.detailItem}>
              <span className={cl.detailLabel}>{key.replace('_', ' ')}:</span>
              <span className={cl.detailValue}>{entryData[key]}</span>
            </div>
          ))}
        </div>
        
        {/* Декоративный треугольник */}
        <div className={cl.arrow}></div>
      </div>
    </div>
  );
};

export default Tooltip;