// MonthLabels.js
import React from 'react';

const MonthLabels = ({ xScale, padding }) => {
  const months = [
    'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
  ];

  return (
    <>
      {months.map((month, i) => {
        const monthNumber = i + 1;
        return (
          <text
            key={month}
            x={xScale(monthNumber)}
            y={padding.top + 20}
            textAnchor="middle"
            fontSize="12"
          >
            {month}
          </text>
        );
      })}
    </>
  );
};

export default MonthLabels;