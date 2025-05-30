import React,{useState} from 'react';
import cl from './SliderDrink.module.css'

// Варианты напитков
const drinkOptions = [
  { emoji: '💧', name: 'Вода' },
  { emoji: '🍵', name: 'Чай' },
  { emoji: '☕', name: 'Кофе' },
  { emoji: '🧃', name: 'Сок' },
  { emoji: '🥤', name: 'Лимонад' },
  { emoji: '🍹', name: 'Коктейль' },
  { emoji: '🥛', name: 'Молоко' },
  { emoji: '🍶', name: 'Другое' },
];

const SliderDrink = ({setFormData,formData}) => {

   const [indexDrink,setIndexDrink]=useState(0)

  const handleDrinkSelect = (drink) => {
    setFormData(prev => ({ ...prev, drink_type: `${drink.emoji} ${drink.name}` }));
  };

    return (
     <div className={cl.container_drink}>
               <span className={cl.arrow} onClick={() => setIndexDrink(indexDrink > drinkOptions.length - 2 ? 0 : indexDrink + 1)}>
                &lt;
                </span>
               <div className={cl.drinkGrid}>
                   <button
                     key={drinkOptions[indexDrink].name}
                     type="button"
                     className={`${cl.drinkButton} ${formData.drink_type.includes(drinkOptions[indexDrink].name) ? cl.active : ''}`}
                     onClick={() => handleDrinkSelect(drinkOptions[indexDrink])}
                   >
                     <span className={cl.drinkEmoji}>{drinkOptions[indexDrink].emoji}</span>
                     <span className={cl.drinkName}>{drinkOptions[indexDrink].name}</span>
                   </button>
               </div>
               <span className={cl.arrow} onClick={() => setIndexDrink(indexDrink < 1 ? drinkOptions.length - 1 : indexDrink - 1)}>
                &gt;
                </span>
             </div>
    );
};

export default SliderDrink;