import React, {useState} from "react";
import { getDateFromStartingDate, numberOfWeek } from '@/service';
import { CalendarProps } from '../interfaces.js';



export const Calendar = ({date, setDate}:CalendarProps) => {

  let [stateOpen, setStateOpen] = useState({
    open:false
  });

  let [stateDate, setStateDate] = useState({
    date: new Date(date)
  });


  const toggleCalendar = () => setStateOpen(
    prevState => stateOpen = {
      open : !prevState.open
    }
  );

  const openCalendar = `calendar--open`;

  const prevMonth = () => {
    let newMonth : Date = new Date();
    setStateDate( prevState => {
      newMonth = new Date(prevState.date.getFullYear(), prevState.date.getMonth() - 1, 1);
      return {date : newMonth};
    });
    setDate(newMonth);
  };

  const nextMonth = () => {
    let newMonth : Date = new Date();
    setStateDate( prevState => {
      newMonth = new Date(prevState.date.getFullYear(), prevState.date.getMonth() + 1, 1);
      return {date : newMonth}
    });
    setDate(newMonth);
  }

  const changeDate = (dateCalendar:Date) => {
    setStateDate( () => stateDate={date : dateCalendar});
    setDate(dateCalendar);
  }

  const setupCalendar = () => {
    const dateObj = stateDate.date;
    const calendarArray:JSX.Element[] = [];
    const startMonth = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
    for(let i = 0, max = numberOfWeek(startMonth) * 7; i < max; i++){
        const dayIndex = startMonth.getDay() === 0?  6 : startMonth.getDay() - 1;
        const delta = i - dayIndex;
        const dateCalendar = getDateFromStartingDate(startMonth, delta);

        const dayClassName = startMonth.getMonth() === dateCalendar.getMonth() ? 'actual-month' : 'other-month';

        calendarArray.push((
          <>
            <span 
              key={`day-${i.toString()}`} 
              className={dayClassName}
              onClick={() => changeDate(dateCalendar)}
            >
              {dateCalendar.getDate()}
            </span>
          </>
        ))
    }

    return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <strong className="calendar__month">{dateObj.toLocaleDateString('default', {month:'long'}) + ' ' + dateObj.getFullYear()}</strong>
        <div>
          <button className="mr-3" onClick={prevMonth}>-</button>
          <button onClick={nextMonth}>+</button>
        </div>
      </div>
      <div className="calendar__header">
        <span>Lun.</span>
        <span>Mar.</span>
        <span>Mer.</span>
        <span>Jeu.</span>
        <span>Ven.</span>
        <span>Sam.</span>
        <span>Dim.</span>
      </div>
      <div className="calendar__body">
        {calendarArray}
      </div>
    </div>
  )}

  return (
    <div>
      <div key={`calendar-input`} className="input__calendar" onClick={toggleCalendar}></div>
      <div key={'calendar'} className={`calendar ${stateOpen.open && openCalendar}`}>
        {setupCalendar()}
      </div>
    </div>
  )
}