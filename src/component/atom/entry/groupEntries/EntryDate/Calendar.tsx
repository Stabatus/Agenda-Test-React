import React, { useContext, useState, useEffect } from "react";
import { DateTransform, getDateFromStartingDate, numberOfWeek, TODAY } from '@/service';
import { CalendarContext } from "./context.js";
import { changeEventProps } from '../interfaces';

enum TYPE_CALENDAR {
  DAY = 'day',
  YEAR = 'year',
  MONTH = 'mois'
}

const MONTHS = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre'] as const;

export const Calendar = ({changeEvent}:changeEventProps) => {

  const {stateCalendar, setStateCalendar} = useContext(CalendarContext);

  let [stateC, setStateC] = useState({
    open : stateCalendar.open,
    date : new Date(stateCalendar.date),
    type: TYPE_CALENDAR.DAY
  });

  const openCalendar = `calendar--open`;

  const toggleCalendar = () => setStateC(
    prevState => {
        return {
        open : !prevState.open,
        date: prevState.open ? prevState.date : new Date(stateCalendar.date),
        type: !prevState.open ? TYPE_CALENDAR.DAY : prevState.type
      }
    }
  );

  const changeAction = (index : number) => {
    setStateC( prevState => {
      const objDate = prevState.date;
      let newDate = new Date(objDate.getFullYear(), objDate.getMonth() + index, 1);
      
      if(stateC.type === TYPE_CALENDAR.MONTH) 
        newDate = new Date(objDate.getFullYear() + index, objDate.getMonth(), 1);
      if(stateC.type === TYPE_CALENDAR.YEAR) 
        newDate = new Date(objDate.getFullYear()+ (index*10), objDate.getMonth() + index, 1);
      
      return {
        date : newDate, 
        open : prevState.open,
        type: prevState.type 
      }
    });
  }
  
  const changeDate = (dateCalendar:Date) => {
    setStateC( prevState => stateC = {
      date : dateCalendar, 
      open : prevState.open,
        type: prevState.type 
    });
    setStateCalendar({
      date : new DateTransform(stateC.date).YMD('-'),
      open : stateC.open
    });
  }

  const changeCalendarType = (type: TYPE_CALENDAR) => {
    setStateC( prevState => stateC = {
      date : prevState.date, 
      open : prevState.open,
      type: type 
    });
  }

  const getClassCalendarName = (isDefault:boolean) => {
    if(isDefault) return '';
    return (stateC.type === TYPE_CALENDAR.MONTH) ? 'calendar__body--month' : 'calendar__body--year';
  }
  
  const setupCalendar = () => {
    if(!stateC.open) return;
    const dateObj = stateC.date;
    const calendarArray:JSX.Element[] = setupBodyContent();

    const isDefault = stateC.type === TYPE_CALENDAR.DAY;
    const typeToUpgrade = isDefault ? TYPE_CALENDAR.MONTH : TYPE_CALENDAR.YEAR;
    const classCalendarType = getClassCalendarName(isDefault);

    return (
      <div className={`calendar ${stateC.open && openCalendar}`}>
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <strong 
              className="calendar__month" 
              onClick={() => changeCalendarType(typeToUpgrade)}
            >
              {`${isDefault ? dateObj.toLocaleDateString('default', {month:'long'}) : ''} ${dateObj.getFullYear()}`}
            </strong>
            <div className="d-flex justify-content-end align-item-center gap-3">
              <button 
                className="action__month action__month--before" 
                onClick={() => changeAction(-1)}
              ></button>
              <button 
                className="action__month action__month--next" 
                onClick={() => changeAction(1)}
              ></button>
            </div>
          </div>
          {isDefault && <div className="calendar__header">
            <span>Lun.</span>
            <span>Mar.</span>
            <span>Mer.</span>
            <span>Jeu.</span>
            <span>Ven.</span>
            <span>Sam.</span>
            <span>Dim.</span>
          </div>}
          <div className={`calendar__body ${classCalendarType}`}>
            {calendarArray}
          </div>
        </div>
      </div>
    )
  }

  const changeMonth = (indexMonth: number) => {
    setStateC( prevState => {
      console.log(indexMonth, new Date(prevState.date.getFullYear(), indexMonth, 1));
      return  {
        date : new Date(prevState.date.getFullYear(), indexMonth, 1), 
        open : prevState.open,
        type: TYPE_CALENDAR.DAY
      }
    });
  }

  const changeYear = (year: number) => {
    setStateC( prevState => {
      return  {
        date : new Date(year, 1, 1), 
        open : prevState.open,
        type: TYPE_CALENDAR.MONTH
      }
    });
  }

  const setupDayCalendar = () => {
    const array:JSX.Element[] = [];
    const dateObj = stateC.date;
    const startMonth = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);

    for(let i = 0, max = numberOfWeek(startMonth) * 7; i < max; i++){
      const dayIndex = startMonth.getDay() === 0 ? 6 : startMonth.getDay() - 1;
      const delta = i - dayIndex;
      const dateCalendar = getDateFromStartingDate(startMonth, delta);

      const dayClassName = startMonth.getMonth() === dateCalendar.getMonth() ? 'actual-month' : 'other-month';
      const isToday = dateCalendar.toLocaleDateString() === TODAY.toLocaleDateString() ? 'day--today' : '';
      const isSelected = dateCalendar.toLocaleDateString() === new Date(stateCalendar.date).toLocaleDateString() ? 'day--selected' : '';

      array.push((
        <span 
          key={`day-${i.toString()}-${(dateCalendar.getMonth() + 1).toString()}`}
          className={`calendar__input ${dayClassName} ${isToday} ${isSelected}`}
          onClick={() => changeDate(dateCalendar)}
          data-day={dateCalendar.getDate()}
        ></span>
      ));
    }

    return array;
  }

  const setupMonthCalendar = () => {
    const array:JSX.Element[] = [];
    for(const m in MONTHS){
      array.push(
        <span 
          key={`Month-${MONTHS[m]}`} 
          className={"calendar__input"} 
          onClick={() => changeMonth(parseInt(m))}
        >
          {MONTHS[m]}
        </span>
      )
    }
    return array;
  }

  const setupYearCalendar = () => {
    const array:JSX.Element[] = [];
    const year = stateC.date.getFullYear();
    const decade = year - (year%10);

    for(let i = 0; i < 10; i++){
      const yearDecade = (decade+i);
      array.push(
        <span 
          key={`Year-${yearDecade.toString()}`} 
          className={"calendar__input"} 
          onClick={() => changeYear(yearDecade)}
        >
          {yearDecade.toString()}
        </span>
      )
    }
    return array;
  }

  const setupBodyContent = () => {
    switch(stateC.type){
      case TYPE_CALENDAR.MONTH:{
        return setupMonthCalendar();
      }
      case TYPE_CALENDAR.YEAR:{
        return setupYearCalendar();
      }
      case TYPE_CALENDAR.DAY:
      default:
      {
        return setupDayCalendar();
      }
    }

  }
  

  useEffect(() => {
    if(changeEvent != undefined) changeEvent(new DateTransform(stateC.date).YMD('-'));
  }, [stateCalendar]);


  return (
    <div key={'calendar-container'}>
      <div key={`calendar-input`} className="input__calendar" onClick={toggleCalendar}></div>
      {setupCalendar()}
    </div>
  )
}