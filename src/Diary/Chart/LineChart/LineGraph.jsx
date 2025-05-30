import React, { useState, useEffect, useRef } from 'react';
import cl from './LineGraph.module.css';
import Tooltip from './BestDay/Tooltip';
import AxisY from './AxisY/AxisY';
import DayLabels from './DayLabel/DayLabel';
import DataPoints from './DataPoints/DataPoints';
import ArrowLeft from '../../../SVGIcons/Arrow/ArrowLeft';
import MonthSelector from './MonthSelector/MonthSelector';
import DayMarker from './DayMarker/DayMarker';
import ComparisonSummary from './ComparisonSummary/ComparisonSummary';

const LineChart = ({ data, width = 800, height = 400 }) => {
  const [indexMonth, setIndexMonth] = useState(new Date().getMonth() + 1);
  const [compareMonth, setCompareMonth] = useState(null);
  const [entrysData, setEntrysData] = useState([]);
  const [compareData, setCompareData] = useState([]);
  const [precentDay, setPrecentDay] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [visibleLines, setVisibleLines] = useState({
    main: 'block',  // Видимость основной линии
    compare: 'block' // Видимость линии сравнения
  });
  const lastDayRef = useRef(selectedDay);
  const svgRef = useRef();

  // Настройки отступов
  const padding = { top: 50, right: 80, bottom: 100, left: 60 };

  useEffect(() => {
    const currentMonthData = data.filter(val => val.month === indexMonth).sort((a, b) => a.day - b.day);
    const comparisonMonthData = compareMonth
      ? data.filter(val => val.month === compareMonth).sort((a, b) => a.day - b.day)
      : [];

    setEntrysData(currentMonthData);
    setCompareData(comparisonMonthData);
    setSelectedDay(null);
  }, [indexMonth, compareMonth, data]);





  // Рассчитываем максимальное количество дней в текущем месяце
  const daysInCurrentMonth = entrysData.length > 0
    ? new Date(entrysData[0]?.year, entrysData[0]?.month, 0).getDate()
    : 0;

  // Масштабирование
  const xScale = (day) => {
    return padding.left + ((day - 1) * (width - padding.left - padding.right)) / (daysInCurrentMonth - 1);
  };

  const yScale = (value) => {
    return height - padding.bottom - (value * (height - padding.top - padding.bottom)) / 100;
  };

  const showPrecent = (e, item) => {
    setPrecentDay({
      data: item,
      style: {
        y: e.clientY,
        x: e.clientX
      }
    });
  };

  const leafing = (number) => {
    if (number > 12 || number < 1) return;
    setIndexMonth(number);
  };

  const handleDaySelect = (e) => {
    const svgRect = svgRef.current.getBoundingClientRect();
    const xPos = e.clientX - svgRect.left;
    const dayWidth = (width - padding.left - padding.right) / (daysInCurrentMonth - 1);
    const day = Math.min(
      Math.max(1, Math.round((xPos - padding.left) / dayWidth) + 1),
      entrysData.length
    );
    lastDayRef.current = Math.max(1, day)


    setSelectedDay(Math.max(1, day));
  };


  // Формируем путь для текущего месяца (синяя линия)
  const currentPathData = () => {
    const points = [];
    let lastValue = 0;

    for (let day = 1; day <= entrysData.length; day++) {
      const dataPoint = entrysData.find(d => d.day === day);
      const value = dataPoint?.value || 0;
      points.push(`${xScale(day)},${yScale(value)}`);
      lastValue = value;
    }

    return points.join(' L');
  };

  // Формируем путь для сравниваемого месяца (красная линия)
  const comparePathData = () => {
    if (!compareMonth || compareData.length === 0) return '';

    const points = [];
    const minDays = Math.max(entrysData.length, compareData[compareData.length - 1].day);

    for (let day = 1; day <= minDays; day++) {
      const dataPoint = compareData.find(d => d.day === day);
      const value = dataPoint?.value || 0;
      points.push(`${xScale(day)},${yScale(value)}`);
    }

    return points.join(' L');
  };

  // Рассчитываем накопленные проценты за N дней
  const calculateCumulative = (data, days) => {
    const relevantDays = data.filter(d => d.day <= days);
    if (relevantDays.length === 0) return 0;

    const sum = relevantDays.reduce((total, day) => total + day.value, 0);
    return (sum / relevantDays.length).toFixed(1);
  };

  // Получаем данные для сравнения
  const getComparisonData = () => {
    if (!selectedDay || !compareMonth) return null;


    const currentCumulative = calculateCumulative(entrysData, selectedDay);
    const compareCumulative = calculateCumulative(compareData, selectedDay);


    return {
      days: lastDayRef.current,
      currentValue: currentCumulative,
      compareValue: compareCumulative,
      difference: (currentCumulative - compareCumulative).toFixed(1)
    };
  };

  const comparison = getComparisonData()

  const toggleLineVisibility = (line) => {
    setVisibleLines(prev => ({
      ...prev,
      [line]: prev[line] === 'block' ? 'none' : 'block'
    }));
  };

  return (
    <div style={{ margin: '20px' }}>
      <h3 style={{ textAlign: 'center' }}>
        {entrysData[0]?.name || 'Показатель'} ({entrysData[0]?.month}.{entrysData[0]?.year})
      </h3>

      <MonthSelector
        selectedMonth={compareMonth}
        onChange={setCompareMonth}
      />

      <div className={cl.LineGraph}>
        <button
          onClick={() => leafing(indexMonth - 1)}
          className={cl.btn_arrow}
        >
          <ArrowLeft />
        </button>

        <svg
          ref={svgRef}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ border: '1px solid #eee', borderRadius: '8px' }}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseMove={isDragging ? handleDaySelect : null}
          onClick={handleDaySelect}
        >
          {/* Основные оси */}
          <AxisY padding={padding} width={width} height={height} yScale={yScale} />
          <DayLabels daysInMonth={daysInCurrentMonth} xScale={xScale} padding={padding} />

          {/* Основная линия (текущий месяц) */}
          <g style={{ display: visibleLines.main }}>
              <path
            d={`M${currentPathData()}`}
            stroke="#4e79a7"
            strokeWidth="3"
            fill="none"
            className={cl.mainLine}
          />
            {/* Точки данных текущего месяца */}
          <DataPoints
            data={entrysData}
            xScale={xScale}
            yScale={yScale}
            onMouseOver={showPrecent}
            onMouseOut={() => setPrecentDay(null)}
            color="#4e79a7"
          />
          </g>

          <g style={{ display: visibleLines.compare }}>
             {compareMonth && (
            <path
              d={`M${comparePathData()}`}
              stroke="#e15759"
              strokeWidth="3"
              fill="none"
              className={cl.compareLine}
            />
          )}
             {compareData.map((item) => (
            item.day <= daysInCurrentMonth && (
              <circle
                key={`compare-${item.day}`}
                cx={xScale(item.day)}
                cy={yScale(item.value)}
                r="4"
                fill="#e15759"
                stroke="white"
                strokeWidth="1"
              />
            )
          ))}
          </g>

          {/* Вертикальный маркер */}
          {compareMonth && <DayMarker
            day={selectedDay}
            xScale={xScale}
            height={height}
            padding={padding}
            isDragging={isDragging}
            maxDay={entrysData.length}
          />}

        

          {/* Точки данных сравниваемого месяца */}
       

          {/* Легенда */}
          <g transform={`translate(${padding.left + 10}, ${height - padding.bottom})`}>
            <rect
              onClick={() => toggleLineVisibility('main')}
              x="0" y="0"
              width="12" height="12"
              fill="#4e79a7"
            />
            <text x="20" y="12" fontSize="12">Текущий месяц</text>

            {compareMonth && (
              <>
                <rect
                  onClick={() => toggleLineVisibility('compare')}
                  x="0" y="20"
                  width="12" height="12"
                  fill="#e15759"
                />
                <text x="20" y="32" fontSize="12">
                  {new Date(entrysData[0]?.year, compareMonth - 1, 1).toLocaleDateString('ru-RU', { month: 'long' })}
                </text>
              </>
            )}
          </g>
        </svg>

        <button
          onClick={() => leafing(indexMonth + 1)}
          className={[cl.btn_arrow, cl.left].join(' ')}
        >
          <ArrowLeft />
        </button>
      </div>

      {precentDay && <Tooltip data={precentDay.data} position={precentDay.style} />}

      {comparison && (
        <ComparisonSummary
          comparison={comparison}
          selectedDay={lastDayRef.current}
        />
      )}
    </div>
  );
};

export default LineChart;