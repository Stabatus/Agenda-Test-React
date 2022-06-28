import React, { useState } from "react";
import { EntryDateProps } from "../interfaces";
import { Calendar } from "./Calendar";
import { CalendarContext } from './context';

export const EntryDate = (props:EntryDateProps) =>{

  let [stateCalendar, setStateCalendar] = useState({
    date: props?.defaultValue as string,
    open : false
  });
  
  return (
    <div className="container__entry--date">
      <CalendarContext.Provider 
        value={{ 
          stateCalendar, 
          setStateCalendar 
        }} 
      >
        <input 
          className="entry"
          type={"date"}
          value={stateCalendar.date}
          onChange={(e) => {
            setStateCalendar(
              (prevState) => stateCalendar = {
                date : e.target.value,
                open : prevState.open
              }
            );
          }}
        />
        <Calendar changeEvent={props.changeEvent}/>
      </ CalendarContext.Provider>
    </div>
  )
}
