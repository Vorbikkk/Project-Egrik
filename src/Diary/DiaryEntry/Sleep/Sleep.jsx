import React from 'react';
import SleepForm from '../../../Form/DiaryForm/SleepForm/SleepForm';
import LineChart from '../../Chart/LineChart/LineGraph';

const Sleep = () => {
   const testData = [
    { day: 1, month: 5, year: 2023, entryData: {
      sleep_duration: '8 часов',
      sleep_quality: 5,
      awakenings: 0
    }, name: 'Качество сна', value: 75 },
    { day: 2, month: 5, year: 2023, entryData: {
      sleep_duration: '8 часов',
      sleep_quality: 5,
      awakenings: 0
    }, name: 'Качество сна', value: 82 },
    { day: 3, month: 5, year: 2023, entryData: {
      sleep_duration: '8 часов',
      sleep_quality: 5,
      awakenings: 0
    }, name: 'Качество сна', value: 68 },
    { day: 4, month: 5, year: 2023, entryData: {
      sleep_duration: '8 часов',
      sleep_quality: 5,
      awakenings: 0
    }, name: 'Качество сна', value: 91 },
    { day: 5, month: 5, year: 2023,
      entryData: {
      sleep_duration: '8 часов',
      sleep_quality: 5,
      awakenings: 0
     }, name: 'Качество сна', value: 77 },
    { day: 1, month: 6, year: 2023,
      entryData: {
      sleep_duration: '8 часов',
      sleep_quality: 5,
      awakenings: 0
     }, name: 'Качество сна', value: 77 },
    { day: 2, month: 6, year: 2023,
      entryData: {
      sleep_duration: '8 часов',
      sleep_quality: 5,
      awakenings: 0
     }, name: 'Качество сна', value: 77 },

  ];

  return(
     <LineChart data={testData} />
     
  )
};

export default Sleep;