import React, {useState} from "react";
import { getDateFromStartingDate } from '@/service';

export const Calendar = ({ date }) => {
  
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

  const numberOfWeek = (dateObj:Date) => {
    const lastDay = new Date(dateObj.getFullYear(), dateObj.getMonth(), 0);
    console.log(lastDay);
    return Math.ceil((lastDay.getDate() + 1 - lastDay.getDay()) / 7);

  }

  const setupCalendar = () => {
    
    const dateObj = stateDate.date;
    const calendarArray:JSX.Element[] = [];
    const startMonth = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
    console.log(numberOfWeek(startMonth));
    
    for(let i = 0, max = numberOfWeek(startMonth) * 7; i < max; i++){
        console.log(i, max, numberOfWeek(startMonth));
        const dayIndex = dateObj.getDay() === 0?  6 : dateObj.getDay() - 1;
        const delta = i - dayIndex;
        const dateCalendar = getDateFromStartingDate(startMonth, delta);
        console.log(dateCalendar);
        calendarArray.push((
          <>
            <span>{dateCalendar.getDate()+ '/' + (dateCalendar.getMonth() +1)}</span>
          </>
        ))
    }

    return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <strong>{dateObj.toLocaleDateString('default', {month:'long'}) + ' ' + dateObj.getFullYear()}</strong>
        <div>
          <button className="mr-3">-</button>
          <button>+</button>
        </div>
      </div>
      <div className="calendar__body">
        {calendarArray}
      </div>
    </>
  )}

  return (
    <>
      <div className="input__calendar" onClick={toggleCalendar}></div>
      <div key={'calendar'} className={`calendar ${stateOpen.open && openCalendar}`}>
        {setupCalendar()}
      </div>
    </>
  )
}