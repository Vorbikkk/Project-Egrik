import React, { useState } from 'react';
import cl from './FilterNotes.module.css';
import PrioritySlider from '../../UI/Slider/PrioritySlider';

const FilterNotes = ({ onApply }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const handleApply = () => {
        onApply(activeIndex + 1);
    };

    const handleReset = () => {
        onApply(null);
        setActiveIndex(0);
        setIsOpen(false);
    };

    return (
        <div className={cl.filterContainer}>
            <button 
                className={cl.filterToggle}
                onClick={() => setIsOpen(!isOpen)}
            >
                Фильтрация
                <span className={`${cl.arrow} ${isOpen ? cl.arrowDown : cl.arrowRight}`}></span>
            </button>
            
            {isOpen && (
                <div className={cl.filterDropdown}>
                    <div className={cl.filterSection}>
                        <label>По приоритету:</label>
                        <PrioritySlider 
                            activeIndex={activeIndex} 
                            setActiveIndex={setActiveIndex} 
                        />
                    </div>
                    
                    <div className={cl.filterButtons}>
                        <button 
                            className={cl.applyButton}
                            onClick={handleApply}
                        >
                            Применить
                        </button>
                        <button 
                            className={cl.resetButton}
                            onClick={handleReset}
                        >
                            Сбросить
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterNotes;