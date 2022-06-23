import React, { useContext } from "react";
import "./index.css";
import { NavigationDayProps } from './interface';
import { DAY_OF_WEEK, setupZero, getDateFromStartingDate, TODAY } from "../../service";
import { AgendaContext } from "../../context/AgendaContext";


export const NavigationDay = () => {

  const { AgendaDate : date, setAgendaDate } = useContext(AgendaContext);

  const DayTemplate = () => {
    const arrayDay:JSX.Element[] = [];
    const dayIndex = date.getDay() === 0?  6 : date.getDay() - 1;
    
    for(let i = 0; i < 7; i++){

      const selectedDate = (i === dayIndex) ? 'day--selected' : '';
      const delta = i - dayIndex;
      const dayForNavigation = getDateFromStartingDate(date, delta);
      const dFNDate = dayForNavigation.getDate();
      const month = dayForNavigation.toLocaleString('default', { month: 'long' });
      const weekday = dayForNavigation.toLocaleString('default', { weekday: 'long' });
      const todayIndex = TODAY.getDay() === 0 ? 6 : TODAY.getDay() - 1;
      const isToday = (i === todayIndex) && (TODAY.toDateString() === dayForNavigation.toDateString()) ? 
        'day--today' : 
        ''; 

      const divDay:JSX.Element = (
        <div 
          key={i}
          className={`day ${isToday} ${selectedDate} d-flex flex-column align-items-center justify-content-center`}
          onClick={() => setAgendaDate(dayForNavigation)}
        >
          <span>{weekday.substring(0, 3)}</span>
          <span>{setupZero(dFNDate)}</span>
          <span>{month}</span>
        </div>
      );

      arrayDay.push(divDay);
    }
    
    return arrayDay;
  }

  return (
    <div className="px-4 py-3 d-flex justify-content-between align-items-center">
      {DayTemplate()}
    </div>
  )
}