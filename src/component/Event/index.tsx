 import React from "react";
 import './index.scss';


interface EventProps{
  hours : number;
}

 export const Event = ({hours}:EventProps) => {

  return (
    <div 
      className={'event'} 
      data-hours={hours} 
      style={{
        gridArea: `${hours+1}/1`
      }}
    >
      {"cc"}
    </div>
  )
 }