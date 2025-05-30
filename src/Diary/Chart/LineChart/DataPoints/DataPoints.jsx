import React from 'react';

const DataPoints = ({ data, xScale, yScale, onMouseOver, onMouseOut }) => {
  return (
    <>
      {data.map((item, index) => (
        <circle
          key={index}
          onMouseOver={(e) => onMouseOver(e, item)}
          onMouseOut={onMouseOut}
          cx={xScale(item.day)}
          cy={yScale(item.value)}
          r="4"
          fill="#fff"
          stroke="#e15759"
          strokeWidth="1"
        />
      ))}
    </>
  );
};

export default DataPoints;