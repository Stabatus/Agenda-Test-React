import React, { useContext } from "react";
import "./index.css";
import { NavigationDayProps } from './interface';
import { DAY_OF_WEEK, setupZero, getDateFromStartingDate, TODAY } from "../../service";
import { AgendaContext } from "../../context/AgendaContext";


export const NavigationDay = () => {

  const { date, setAgendaDate } = useContext(AgendaContext);

  const DayTemplate = () => {
    const arrayDay:JSX.Element[] = [];
    const todayIndex = date.getDay() - 1;
    
    for(let i = 0; i < 7; i++){

      const isToday = i === TODAY.getDay() - 1 ? 'day--today' : ''; 
      const delta = i - todayIndex;
      const dayForNavigation = getDateFromStartingDate(date, delta);
      const dFNDate = dayForNavigation.getDate();
      const month = dayForNavigation.toLocaleString('default', { month: 'long' });

      const divDay:JSX.Element = (
        <div 
          key={i}
          className={`day ${isToday} d-flex flex-column align-items-center justify-content-center`}
          onClick={() => setAgendaDate(dayForNavigation)}
        >
          <span>{DAY_OF_WEEK[i].substring(0, 3)}</span>
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