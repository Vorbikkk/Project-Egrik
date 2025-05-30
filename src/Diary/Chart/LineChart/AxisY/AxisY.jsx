import React from 'react';

const AxisY = ({ padding, width, yScale }) => {
  return (
    <>
      {[0, 25, 50, 75, 100].map((percent) => (
        <g key={percent}>
          <line
            x1={padding.left}
            y1={yScale(percent)}
            x2={width - padding.right}
            y2={yScale(percent)}
            stroke="#e0e0e0"
            strokeDasharray="4 2"
          />
          <text
            x={padding.left - 10}
            y={yScale(percent)}
            textAnchor="end"
            fontSize="12"
            fill="#666"
          >
            {percent}%
          </text>
        </g>
      ))}
    </>
  );
};

export default AxisY;