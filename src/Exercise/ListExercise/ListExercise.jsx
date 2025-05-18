import React, { useEffect } from 'react';
import cl from './ListExercise.module.css'
import ExerciseCard from '../Exercise/CardExercise/ExerciseCard';
import PaginationNote from '../../Todolist//PaginationNote/PaginationNote';

const ListExercise = ({listExercise,setNumberPagination}) => {
 

        
    return (
        <div className={cl.container_exercises} >
           {
            listExercise.rows.map(exercise=>
                <ExerciseCard exercise={exercise} key={`exercise${exercise.id}`}   />
            )
           }   
           <PaginationNote 
           count={listExercise.count} 
           setNumberPagination={setNumberPagination} 
           limit={3}/>
        </div>
    );
};

export default ListExercise;