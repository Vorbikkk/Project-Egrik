import React, { useState, useRef, useCallback } from 'react';
import cl from './CollapsibleSection.module.css';

const CollapsibleSection = ({
  title,
  icon = '',
  defaultOpen = true,
  children,
 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);




 

  return (
    <div
      className={cl.sectionContainer}

    >
      <div
        className={cl.sectionHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={cl.icon}>{icon}</span>
        <h3 className={cl.title}>{title}</h3>
        <span className={cl.arrow}>{isOpen ? '▼' : '▶'}</span>
      </div>

      {isOpen && (
        <div
          className={cl.containerNotes}
       >
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection