import React, { useEffect, useState } from 'react';
import cl from './FilterExercices.module.css'
import MyInput from '../../UI/MyInput/MyInput'

const FilterExercices = ({ setDataFilter }) => {
  const [textFilter, setTextFilter] = useState('')
  const [methodFilter, setMethodFilter] = useState('тэги')
  const [activeList, setActiveList] = useState(false)
  const options = ['упражнения', 'тэги']

  useEffect(() => {
    setDataFilter({
      method: methodFilter,
      text: textFilter
    })
  }, [methodFilter, textFilter])

  const changeMetodFilter = (name) => {
    setMethodFilter(name)
    setActiveList(false)
  }

  return (
    <div className={cl.mainBlock}>
      <div className={cl.filterHeader}>
        Фильтрация по "{methodFilter}"
        <button
          className={cl.dropdownButton}
          onClick={() => setActiveList(prev => !prev)}
        >
          <span className={`${cl.dropdownIcon} ${activeList ? cl.active : ''}`}>▼</span>
        </button>
      </div>

      {activeList && (
        <ul className={cl.containerOptions}>
          {options.map(option => (
            <li
              key={`optionMethod${option}`}
              onClick={() => changeMetodFilter(option)}
              className={cl.optionMethod}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      <MyInput
        value={textFilter}
        onChange={(e) => setTextFilter(e.target.value)}
        className={cl.filterExercises}
        placeholder={`Введите ${methodFilter} для поиска...`}
      />
    </div>
  )
}

export default FilterExercices;