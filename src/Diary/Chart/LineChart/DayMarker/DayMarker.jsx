import React from "react";

const DayMarker = ({ day, xScale, height, padding, isDragging, maxDay }) => {

let newDay=Math.max(1,Math.min(day,maxDay))


  if (!day  ){
      return null
  }


  return (
    <line
      x1={xScale(newDay)}
      x2={xScale(newDay)}
      y1={padding.top}
      y2={height - padding.bottom}
      stroke="#333"
      strokeWidth={isDragging ? 1.5 : 1}
      strokeDasharray="3 2"
      pointerEvents="none"
    />
  );
};

export default DayMarker