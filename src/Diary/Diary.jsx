import React, { useState } from 'react';
import cl from './Diary.module.css'
import SleepForm from '../Form/DiaryForm/SleepForm/SleepForm';
import NutritionForm from '../Form/DiaryForm/NurationForm/NurationForm';
import WorkoutForm from '../Form/DiaryForm/WorkoutForm/WorkoutForm';
import MoodForm from '../Form/DiaryForm/MoodForm/MoodForm';
import HydrationForm from '../Form/DiaryForm/HydrationForm/HydrationForm';
import ArrowLeft from '../SVGIcons/Arrow/ArrowLeft';
import DiaryEntry from './DiaryEntry/DiaryEntry';
import LineGraph from './Chart/LineChart/LineGraph';

const Diary = () => {

    const [indexForm, setIndexForm] = useState(0)
    const ArrForm = [
        <SleepForm />,
        <NutritionForm />,
        <WorkoutForm />,
        <MoodForm />,
        <HydrationForm />,
    ]

    console.log(ArrForm.length, indexForm)

    // return (
    //     <div className={cl.SliderDiary}>
    //         <div 
    //         className={cl.btn_center}
    //         onClick={() => setIndexForm(indexForm > ArrForm.length - 2 ? 0 : indexForm + 1)}>
    //              <ArrowLeft/>
    //         </div>

    //         <div>
    //             {ArrForm[indexForm]}
    //         </div>
    //         <div 
    //         className={cl.btn_center}
    //         onClick={() => setIndexForm(indexForm < 1 ? ArrForm.length - 1 : indexForm - 1)}>
    //             <div className={cl.arrowRight}>
    //                  <ArrowLeft/>
    //             </div>
    //         </div>
    //     </div>
    // );
      const chartData = [
    { name: 'Категория 1', value: 50 },
    { name: 'Категория 2', value: 50 },
    { name: 'Категория 3', value: 50 },
    { name: 'Категория 4', value: 50 },
    { name: 'Категория 5', value: 50},
  ];
    
    return (
        <div>
            <LineGraph data={chartData} />
            <DiaryEntry />
        </div>
    )
};

export default Diary;



