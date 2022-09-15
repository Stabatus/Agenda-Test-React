 import React from "react";
 import './index.scss';


interface EventProps{
  hours : number;
  content : string;
}

 export const Event = ({hours, content}:EventProps) => {

  return (
    <div 
      className={'event'} 
      data-hours={hours} 
      style={{
        gridArea: `${hours+1}/1`
      }}
    >
      {content}
    </div>
  )
 }