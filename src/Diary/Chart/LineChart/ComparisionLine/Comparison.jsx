// components/ComparisonLine/ComparisonLine.jsx
import React from 'react';
import cl from './Comparison.module.css';

const ComparisonLine = ({ 
  data, 
  color, 
  width, 
  height, 
  padding, 
  xScale, 
  yScale,
  label 
}) => {
  if (!data || data.length === 0) return null;

  const pathData = data
    .map(item => `${xScale(item.day)},${yScale(item.value)}`)
    .join(' L');

  return (
    <>
      <path
        d={`M${pathData}`}
        stroke={color}
        strokeWidth="2"
        strokeDasharray="4 2"
        fill="none"
        className={cl.comparisonLine}
      />
      <text
        x={width - padding.right - 10}
        y={yScale(data[data.length - 1].value) - 10}
        fill={color}
        textAnchor="end"
        className={cl.lineLabel}
      >
        {label}
      </text>
    </>
  );
};

export default ComparisonLine;