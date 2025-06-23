import React, { useEffect, useRef, useState } from 'react';
import cl from './SlidingWindow.module.css';

const SlidingWindow = ({ left, center, right }) => {
  const [leftWidth, setLeftWidth] = useState(300);
  const [rightWidth, setRightWidth] = useState(300);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const dragType = useRef(null); // 'left' или 'right'

  // Инициализация и обработка ресайза
  useEffect(() => {
    const updateSizes = () => {
      const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
      setRightWidth(Math.min(rightWidth, containerWidth - 600)); // Минимум 300px для всех блоков
    };
    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);

  // Логика перетаскивания
  const startDrag = (type, e) => {
    e.preventDefault();
    isDragging.current = true;
    dragType.current = type;
    document.body.style.userSelect = 'none';
  };

  const handleDrag = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const totalWidth = containerRect.width;

    if (dragType.current === 'left') {
      const newLeft = Math.max(300, Math.min(mouseX, totalWidth - rightWidth - 300));
      setLeftWidth(newLeft);
    } else {
      const newRight = Math.max(300, Math.min(totalWidth - mouseX, totalWidth - leftWidth - 300));
      setRightWidth(newRight);
    }
  };

  const stopDrag = () => {
    isDragging.current = false;
    document.body.style.userSelect = '';
  };

  // Подписка на события мыши
  useEffect(() => {
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', stopDrag);
    };
  }, [leftWidth, rightWidth]);

  return (
    <div className={cl.container} ref={containerRef}>
      {/* Левый блок (ширина изменяется) */}
      <div 
        className={cl.leftPanel} 
        style={{ width: `${leftWidth}px`, minWidth: '300px' }}
      >
        {left}
      </div>

      {/* Левая ручка перетаскивания */}
      <div
        className={`${cl.handle} ${cl.handleLeft}`}
        onMouseDown={(e) => startDrag('left', e)}
      />

      {/* Центральный блок (автоматическая ширина) */}
      <div className={cl.centerPanel}>
        {center}
      </div>

      {/* Правая ручка перетаскивания */}
      <div
        className={`${cl.handle} ${cl.handleRight}`}
        onMouseDown={(e) => startDrag('right', e)}
      />

      {/* Правый блок (ширина изменяется) */}
      <div 
        className={cl.rightPanel} 
        style={{ width: `${rightWidth}px`, minWidth: '300px' }}
      >
        {right}
      </div>
    </div>
  );
};

export default SlidingWindow;