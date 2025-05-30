import React,{useEffect, useState} from 'react';

const Comparison = ({nowDate}) => {

    const addComparisonDate=( [{ day: 1, month: 6, year: 2023,
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
     }, name: 'Качество сна', value: 87 }])

     useEffect(()=>{
       ComparisonDate()
     },[addComparisonDate,nowDate])

    const ComparisonDate=()=>{

       const nowDatePrecent=[...nowDate].reduce((sum,current)=>{
       return sum+current.value
       },0) / nowDate.length
       const addComparisonDatePrecent=[...addComparisonDate].reduce((sum,current)=>{
       return sum+current.value
       },0) / addComparisonDate.length

       console.log(nowDatePrecent,addComparisonDatePrecent)

    }
     

    return (
        <div>
            <h1></h1>
        </div>
    );
};

export default Comparison;
//в рамке указывается общий процент за пройденное время по дефолту если надо можно выбрать
//за какой именно срок за неделею потом какую именно первую вторую и тд
//так же можно и с  месяцем