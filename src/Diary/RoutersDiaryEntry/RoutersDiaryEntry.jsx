import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Sleep from '../DiaryEntry/Sleep/Sleep';
import Workout from '../DiaryEntry/Workout/Workout';
import Water from '../DiaryEntry/Water/Water';
import Mood from '../DiaryEntry/Mood/Mood';
import Nutrition from '../DiaryEntry/Nutrition/Nutrition';

const RoutersDiaryEntry = () => {
    return (
        <Routes>
            <Route path={'sleep'} element={<Sleep />}/>
            <Route path={'workout'} element={<Workout/>}/>
            <Route path={'water'} element={<Water />}/>
            <Route path={'mood'} element={<Mood/>}/>
            <Route path={'nutrition'} element={<Nutrition/>}/>
        </Routes>
    );
};

export default RoutersDiaryEntry;