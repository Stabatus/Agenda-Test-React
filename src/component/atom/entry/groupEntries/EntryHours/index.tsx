import React from "react";

export const EntryHours = () => {

  const createHoursOption = () => {
    const arrayHours:JSX.Element[] = [];
    for(let i = 0; i < 24 ; i+=0.25){

      const numberQuarter = Math.floor(i) === 0 ? (i / 0.25) : (i%Math.floor(i) / 0.25);
      const hours = `${Math.floor(i).toString().padStart(2,'0')}:${(numberQuarter*15).toString().padStart(2,'0')}`;

      arrayHours.push((
        <option key={hours}>{hours}</option>
      ))
    }
    return arrayHours;
  }
  
  return (
    <select>
      {createHoursOption()}
    </select>
  )
}