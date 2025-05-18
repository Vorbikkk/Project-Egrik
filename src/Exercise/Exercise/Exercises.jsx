import React, { useEffect, useState } from 'react';
import FormExercise from '../../Form/FormExercise/FormExercise';
import Loading from '../../UI/Loading/Loading'
import { useGetExercisesQuery } from '../../RTK/Service/ExerciseService';
import cl from './Exercises.module.css'
import MyButton from '../../UI/MyButton/MyButton';
import ModalDefault from '../../Modal/ModalDefault';
import ListExercise from '../ListExercise/ListExercise';
import FilterExercices from './FilterExercices'
import PageFullExercise from '../PageFullExercise/PageFullExercise';
import { Outlet } from 'react-router-dom';

const Exercises = () => {
  
  const [numberPagination, setNumberPagination] = useState(5)
  const [activeFormExercise, setActiveFormExercise] = useState(false)
  const [dataFilter,setDataFilter]=useState( {method:'тэги',text:''})
  const  requestData ={
    params: {
      page: numberPagination,
      limit: 3
    },
    dataFilter:{...dataFilter}
  } 
  const { data, isError, isLoading, isSuccess } = useGetExercisesQuery(requestData)


  if (isError) {
    <h1>Ошибка</h1>
  }
   if(data){
    console.log(data.rows[0])
   }


  return (
    <div>
      <MyButton onClick={() => setActiveFormExercise(true)}>Добавить упражнение</MyButton>
      <FilterExercices setDataFilter={setDataFilter} />
      <ModalDefault active={activeFormExercise} setActive={setActiveFormExercise}>
        <FormExercise setActive={setActiveFormExercise} />
      </ModalDefault>
      {isLoading && <Loading />}
      {(data && data.rows.length > 0) ? <ListExercise listExercise={data} setNumberPagination={setNumberPagination} />
      : <h3 className={cl.notFound }>По вашему запросу "{dataFilter.text}" ни чего не найдено</h3>}
      {/* {(data && data.rows.length > 0) && < PageFullExercise exercise={data.rows[0]}    />   } */}


    </div>
  )
};

export default Exercises;