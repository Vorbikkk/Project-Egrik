// components/DayComparisonDetails/DayComparisonDetails.jsx
import React from 'react';
import cl from './DayComparisonDetails.module.css';

const DayComparisonDetails = ({ currentDay, compareDay }) => {
  if (!currentDay) return null;

  return (
    <div className={cl.comparisonContainer}>
      <h4 className={cl.header}>Сравнение дня {currentDay.day}</h4>
      
      <div className={cl.columns}>
        <div className={cl.column}>
          <h5>Текущий месяц</h5>
          <div className={cl.value}>{currentDay.value}%</div>
          {renderMetrics(currentDay.entryData)}
        </div>
        
        {compareDay && (
          <div className={cl.column}>
            <h5>Сравниваемый месяц</h5>
            <div className={cl.value}>{compareDay.value}%</div>
            {renderMetrics(compareDay.entryData)}
          </div>
        )}
      </div>
    </div>
  );
};

const renderMetrics = (data) => (
  <ul className={cl.metricsList}>
    {Object.entries(data).map(([key, value]) => (
      <li key={key}>
        <span className={cl.metricName}>{key}:</span>
        <span className={cl.metricValue}>{value}</span>
      </li>
    ))}
  </ul>
);

export default DayComparisonDetails;