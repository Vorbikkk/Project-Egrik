import React, { useState } from 'react';
import styles from './DropDownList.module.css';

const DropdownList = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen)
};

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.button} 
        onClick={toggleDropdown}
      >
        {selectedItem || 'Выберите элемент'}
      </button>
      
      {isOpen && (
        <ul className={`${styles.list} ${items.length > 5 ? styles.scrollable : ''}`}>
          {items.map((item, index) => (
            <li
              key={index}
              className={styles.item}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownList;