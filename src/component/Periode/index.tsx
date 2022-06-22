import React from "react";
import './index.css';


export const Periode = () => {

  const PeriodeTemplate = () => {
    const arrayHour:JSX.Element[] = [];

    for(let i:number = 0; i < 24 ;i++){
      const hour = i > 9 ? i.toString() : `0${i}`;

      const divHour = (
        <div 
          key={i}
          className="hour px-4 py-2"
        >
          <span>{hour}:00</span>
        </div>
      );

      arrayHour.push(divHour);
    }

    return arrayHour;
  }

  return (
    <div>
      <div className="periode mt-3">
        {PeriodeTemplate()}
      </div>
    </div>
  )
}