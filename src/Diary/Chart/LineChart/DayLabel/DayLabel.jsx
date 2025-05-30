import React from 'react';

const DayLabels = ({ daysInMonth, xScale, padding }) => {

  return (
    <>
      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
        <text
          key={day}
          x={xScale(day)}
          y={padding.top - 10}
          textAnchor="middle"
          fontSize="10"
          fill="#666"
        >
          {day}
        </text>
      ))}
    </>
  );
};

export default DayLabels;