import React from 'react';
import cl from './DiaryEntry.module.css'
import sleepImage from '../ImageDiary/sleep.png'
import nutritionImage from '../ImageDiary/food.png'
import workoutImage from '../ImageDiary/workout.png'
import waterImage from '../ImageDiary/water.png'
import moodImage from '../ImageDiary/mood.png'
import {Link} from 'react-router-dom'


const DiaryEntry = () => {


   const indicators=[
    {src:sleepImage,path:'./sleep'},
    {src:workoutImage,path:'./workout'},
    {src:waterImage,path:'./water'},
    {src:moodImage,path:'./mood'},
    {src:nutritionImage,path:'./nutrition'}
   ]

    return (
        <div>
            <h3>Мои цели</h3>
            <ul className={cl.indicators}>
               {
                indicators.map(elem=>
                    <li  >
                    <Link to={elem.path}>
                        <img src={elem.src} width={160}/>
                    </Link>
                    </li>
                )
               }
            </ul>
        </div>
    );
};

export default DiaryEntry;