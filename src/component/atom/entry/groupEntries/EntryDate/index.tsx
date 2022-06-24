import { DateTransform } from "@/service";
import React, { useState } from "react";
import { EntryDateProps } from "../interfaces";
import { Calendar } from "./Calendar";
import { CalendarContext } from './context'

export const EntryDate = (props:EntryDateProps) =>{

  const [date, setDate] = useState(new Date(props.value));
  
  const updateEntry = (newDate:Date) => {
      setDate(newDate);
      console.log(new DateTransform(newDate).YMD('-'));
      if(props.onChange != null) props.onChange(new DateTransform(newDate).YMD('-'));
  }

  return (
    <div className="container__entry--date">
      <CalendarContext.Provider value={{date, setDate}}>
        <input 
          className="entry"
          type={"date"}
          value={new DateTransform(date).YMD('-')}
          onChange={() => updateEntry(date)}
        />
        <Calendar />
      </CalendarContext.Provider>
    </div>
  )
}
