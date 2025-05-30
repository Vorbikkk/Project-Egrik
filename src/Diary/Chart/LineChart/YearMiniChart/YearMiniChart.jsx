import React from 'react';
import cl from './YearMiniChart.module.css';

const YearMiniChart = ({ data, year, width = 280, height = 120, onMonthSelect }) => {
  const padding = { top: 20, right: 20, bottom: 30, left: 30 };
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  // Фильтруем данные по году и текущей дате
  const yearData = data.filter(val => 
    val.year === year && 
    (val.year < currentYear || 
     (val.month < currentMonth) || 
     (val.month === currentMonth && val.day <= currentDay)
  )).sort((a, b) => a.month - b.month || a.day - b.day);

  if (yearData.length === 0) return null;

  // Рассчитываем масштабы
  const xScale = (month, day) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const monthWidth = (width - padding.left - padding.right) / 12;
    const dayWidth = monthWidth / daysInMonth;
    return padding.left + 
           ((month - 1) * monthWidth) + 
           ((day - 1) * dayWidth);
  };

  const yScale = (value) => {
    const maxValue = Math.max(...yearData.map(d => d.value), 100);
    return height - padding.bottom - 
           (value * (height - padding.top - padding.bottom)) / maxValue;
  };

  // Создаем путь для графика
  const createPath = () => {
    if (yearData.length < 2) return '';
    
    let path = `M${xScale(yearData[0].month, yearData[0].day)},${yScale(yearData[0].value)}`;
    
    for (let i = 1; i < yearData.length; i++) {
      path += ` L${xScale(yearData[i].month, yearData[i].day)},${yScale(yearData[i].value)}`;
    }
    
    return path;
  };

  // Эффект градиента под линией
  const createAreaPath = () => {
    if (yearData.length < 2) return '';
    
    let path = `M${xScale(yearData[0].month, yearData[0].day)},${yScale(yearData[0].value)}`;
    
    for (let i = 1; i < yearData.length; i++) {
      path += ` L${xScale(yearData[i].month, yearData[i].day)},${yScale(yearData[i].value)}`;
    }
    
    path += ` L${xScale(yearData[yearData.length-1].month, yearData[yearData.length-1].day)},${height - padding.bottom}`;
    path += ` L${xScale(yearData[0].month, yearData[0].day)},${height - padding.bottom} Z`;
    
    return path;
  };

  // Получаем позицию текущего дня
  const getCurrentDayPosition = () => {
    if (year === currentYear) {
      return xScale(currentMonth, currentDay);
    }
    return null;
  };

  return (
    <div className={cl.miniChartContainer}>
      <svg width={width} height={height} className={cl.miniChart}>
        {/* Градиент для заливки под графиком */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4e79a7" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#4e79a7" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Горизонтальные линии сетки */}
        {[0, 25, 50, 75, 100].map((val, i) => (
          <g key={`grid-${i}`}>
            <line
              x1={padding.left}
              y1={yScale(val)}
              x2={width - padding.right}
              y2={yScale(val)}
              stroke="#eee"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <text
              x={padding.left - 5}
              y={yScale(val)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="10"
              fill="#666"
            >
              {val}%
            </text>
          </g>
        ))}

        {/* Область под графиком */}
        <path
          d={createAreaPath()}
          fill="url(#gradient)"
          stroke="none"
        />

        {/* Линия графика */}
        <path
          d={createPath()}
          stroke="#4e79a7"
          strokeWidth="2"
          fill="none"
          className={cl.chartLine}
        />

        {/* Точка текущего дня */}
        {year === currentYear && (
          <circle
            cx={getCurrentDayPosition()}
            cy={yScale(yearData[yearData.length-1].value)}
            r="4"
            fill="#ff6b6b"
            stroke="white"
            strokeWidth="1.5"
          />
        )}

        {/* Подписи месяцев */}
        {Array.from({ length: 12 }).map((_, i) => {
          const month = i + 1;
          const monthX = padding.left + ((month - 0.5) * (width - padding.left - padding.right)) / 12;
          
          return (
            <text
              key={`month-${month}`}
              x={monthX}
              y={height - 10}
              textAnchor="middle"
              fontSize="10"
              fill="#666"
              // onClick={() => onMonthSelect(month)}
              className={cl.monthLabel}
            >
              {new Date(year, month-1, 1).toLocaleDateString('ru-RU', { month: 'short' })}
            </text>
          );
        })}

        {/* Вертикальная линия текущего дня */}
        {year === currentYear && (
          <line
            x1={getCurrentDayPosition()}
            y1={padding.top}
            x2={getCurrentDayPosition()}
            y2={height - padding.bottom}
            stroke="#ff6b6b"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        )}

        {/* Интерактивная зона для выбора месяца */}
        {Array.from({ length: 12 }).map((_, i) => {
          const month = i + 1;
          const monthXStart = padding.left + ((month - 1) * (width - padding.left - padding.right)) / 12;
          const monthXEnd = padding.left + (month * (width - padding.left - padding.right)) / 12;
          
          return (
            <rect
              key={`month-area-${month}`}
              x={monthXStart}
              y={padding.top}
              width={monthXEnd - monthXStart}
              height={height - padding.top - padding.bottom}
              fill="transparent"
              // onClick={() => onMonthSelect(month)}
              className={cl.monthArea}
            />
          );
        })}
      </svg>

      {/* Тултип при наведении (можно реализовать аналогично основному графику) */}
    </div>
  );
};

export default YearMiniChart;