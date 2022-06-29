import React, { useContext, useEffect, useRef } from "react";
import { setupZero, getDateFromStartingDate, TODAY } from "@/service";
import { AgendaContext } from "@/context/AgendaContext";
import "./index.scss";


export const NavigationDay = () => {

  const { AgendaDate : date, setAgendaDate } = useContext(AgendaContext);
  let selectedDateRef: React.RefObject<HTMLDivElement>;

  /** Génération des inputs de la navigation de date */
  const DayTemplate = () => {
    const arrayDay:JSX.Element[] = [];
    const dayIndex = date.getDay() === 0?  6 : date.getDay() - 1;
    
    /** Boucle qui représente les jours de la semaine */
    for(let i = -7; i < 14; i++){
      const selectdate = i === dayIndex;
      const selectedDate = (selectdate) ? 'day--selected' : '';
      const delta = (i - (dayIndex));

      const dayForNavigation = getDateFromStartingDate(date, delta);
      const dFNDate = dayForNavigation.getDate();
      const month = dayForNavigation.toLocaleString('default', { month: 'short' });
      const weekday = dayForNavigation.toLocaleString('default', { weekday: 'short' });
      const todayIndex = TODAY.getDay() === 0 ? 6 : TODAY.getDay() - 1;
      const isToday = (i === todayIndex) && (TODAY.toDateString() === dayForNavigation.toDateString()) ? 
        'day--today' : 
        '';

      const ref = useRef<HTMLDivElement>(null);
      if(i === 0 ) selectedDateRef = ref;

      const divDay:JSX.Element = (
        <div 
          key={i}
          ref={ref}
          className={`day ${isToday} ${selectedDate} d-flex flex-column align-items-center justify-content-center`}
          onClick={() => setAgendaDate(dayForNavigation)}
        >
          <span>{weekday}</span>
          <span>{setupZero(dFNDate)}</span>
          <span>{month}</span>
        </div>
      );

      arrayDay.push(divDay);
    }
    
    return arrayDay;
  }

  useEffect(() => {
    if(selectedDateRef != undefined && selectedDateRef != null  && selectedDateRef.current){
      selectedDateRef.current.scrollIntoView({block: 'nearest', inline: 'start' });
      window.addEventListener('resize', () => {
        if(selectedDateRef != undefined && selectedDateRef != null  && selectedDateRef.current) 
          selectedDateRef.current.scrollIntoView({block: 'nearest', inline: 'start' })
      });
    } 
  }, [date]);
  

  return (
    <div className={'navigation__day mb-3'}>
      <div className="py-3">
        {DayTemplate()}
      </div>
    </div>
  )
}