import React, { useEffect, useState } from "react";
import { DateTransform, getDateFromStartingDate, numberOfWeek } from "@/service";
import { EntryDateProps } from "../interfaces";

export const EntryDate = (props:EntryDateProps) =>{

  
  let [stateCalendar, setStateCalendar] = useState({
    date: props?.defaultValue as string,
    open : false
  });

  const toggleCalendar = () => setStateCalendar(
    prevState => stateCalendar = {
      open : !prevState.open,
      date: prevState.date
    }
  );
  
  const openCalendar = `calendar--open`;
  
  const prevMonth = () => {
    let newMonth : Date = new Date();
    setStateCalendar( prevState => {
      const objDate = new Date(prevState.date);
      newMonth = new Date(objDate.getFullYear(), objDate.getMonth() - 1, 1);
      return {
        date : new DateTransform(newMonth).YMD('-'), 
        open : prevState.open
      };
    });
  };
  
  const nextMonth = () => {
    let newMonth : Date = new Date();
    setStateCalendar( prevState => {
      const objDate = new Date(prevState.date);
      newMonth = new Date(objDate.getFullYear(), objDate.getMonth() + 1, 1);
      return {
      date : new DateTransform(newMonth).YMD('-'), 
      open : prevState.open}
    });
  }
  
  const changeDate = (dateCalendar:Date) => {
    setStateCalendar( (prevState) => stateCalendar = {
      date : new DateTransform(dateCalendar).YMD('-'), 
      open : prevState.open
    });
  }
  
  const setupCalendar = () => {
    const dateObj = new Date(stateCalendar.date);
    const calendarArray:JSX.Element[] = [];
    const startMonth = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);

    for(let i = 0, max = numberOfWeek(startMonth) * 7; i < max; i++){
        const dayIndex = startMonth.getDay() === 0?  6 : startMonth.getDay() - 1;
        const delta = i - dayIndex;
        const dateCalendar = getDateFromStartingDate(startMonth, delta);
  
        const dayClassName = startMonth.getMonth() === dateCalendar.getMonth() ? 'actual-month' : 'other-month';
        calendarArray.push((
          <span 
            key={`day-${i.toString()}-${(dateCalendar.getMonth() + 1).toString()}`}
            className={`month_day ${dayClassName}`}
            onClick={() => changeDate(dateCalendar)}
            data-day={dateCalendar.getDate()}
          ></span>
        ))
    }
  
    useEffect(() => {
      props.onChange(stateCalendar.date);
    }, [stateCalendar])

    return (
      <div >
        <div className="d-flex justify-content-between align-items-center">
          <strong className="calendar__month">
            {dateObj.toLocaleDateString('default', {month:'long'}) + ' ' + dateObj.getFullYear()}
          </strong>
          <div >
            <button className="mr-3" onClick={prevMonth}>-</button>
            <button onClick={nextMonth}>+</button>
          </div>
        </div>
        <div className="calendar__header">
          <span key={'Monday'}>Lun.</span>
          <span key={'Tuesday'}>Mar.</span>
          <span key={'Wensday'}>Mer.</span>
          <span key={'Thursday'}>Jeu.</span>
          <span key={'Friday'}>Ven.</span>
          <span key={'Saturday'}>Sam.</span>
          <span key={'Sunday'}>Dim.</span>
        </div>
        <div className="calendar__body">
          {calendarArray}
        </div>
      </div>
    )
  }

  
  return (
    <div key={'input-date'} className="container__entry--date">
        <input 
          key={'input-date'}
          className="entry"
          type={"date"}
          value={stateCalendar.date}
          onChange={(e) => {
            setStateCalendar((prevState) => stateCalendar = {
              date : e.target.value,
              open : prevState.open
            });
          }}
        />
          <div key={'calendar-container'}>
            <div key={`calendar-input`} className="input__calendar" onClick={toggleCalendar}></div>
                <div key={'calendar'} className={`calendar ${stateCalendar.open && openCalendar}`}>
                    {setupCalendar()}
                </div>
          </div>
    </div>
  )
}
