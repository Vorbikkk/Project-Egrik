import React,{useState,useEffect} from 'react';
import cl from './ComparisonSummary.module.css';

const ComparisonSummary = ({comparison,selectedDay}) => {
  const isPositive = parseFloat(comparison.difference) >= 0;
  let { days, currentValue, compareValue, difference }=comparison
     console.log(comparison)

      return (
    <div className={cl.container}>
      <h4 className={cl.header}>{`Сравнение за ${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}`}</h4>
      
      <div className={cl.values}>
        <div className={cl.valueBlock}>
          <div className={cl.label}>Текущий месяц:</div>
          <div className={cl.value}>{currentValue}</div>
        </div>
        
        <div className={cl.valueBlock}>
          <div className={cl.label}>Сравнение:</div>
          <div className={cl.value}>{ `${compareValue}%`}</div>
        </div>
        
        <div className={cl.valueBlock}>
          <div className={cl.label}>Разница:</div>
          <div className={`${cl.value} ${isPositive ? cl.positive : cl.negative}`}>
            {`${isPositive ? '+' : ''}${difference}% `}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSummary;