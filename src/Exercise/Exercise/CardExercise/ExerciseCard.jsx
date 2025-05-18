import React,{useEffect, useState} from 'react';
import cl from './ExerciseCard.module.css';
import {useNavigate,Route,Routes, Link} from 'react-router-dom'
import CardDescription from './CardDescription';
import CardMedia from './CardMedia';
import CardTags from './CardTags';

export const CardHeader = ({ title, difficulty }) => (
  <div className={cl.header}>
    <h3 className={cl.title}>{title}</h3>
    <div className={`${cl.difficulty} ${cl[difficulty]}`}>
      {getDifficultyLabel(difficulty)}
    </div>
  </div>
);

 


const ExerciseCard = ({ exercise }) => {

  const navigate=useNavigate()
  const {
    exercise_name = 'Без названия',
    exercise_description = '',
    difficulty = 'medium',
    exercise_media = '',
    exerciseMarks = []
  } = exercise;

  
   

  return (
    <div className={cl.card}>
      <CardHeader title={exercise_name} difficulty={difficulty} />
       <div className={cl.container_flex}>
       <CardMedia mediaUrl={exercise_media} />
       <CardDescription description={exercise_description} />
       </div>
      <div className={cl.footer}>
        <CardTags tags={exerciseMarks} />
       <button className={cl.moreBtn} onClick={()=>navigate(`/exercise/${exercise.id}`)}>
          Подробнее
        </button>
      </div>
      {/* <CardFooter tags={exerciseMarks} onMoreClick={onMoreClick} /> */}
       
    </div>
  );
};

const getDifficultyLabel = (level) => {
  const levels = {
    easy: 'Начинающий',
    medium: 'Средний',
    hard: 'Продвинутый'
  };
  return levels[level] || level;
};

export default ExerciseCard;