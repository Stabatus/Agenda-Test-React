import React, {useRef, useState} from "react";
import { Event } from "../Event";
import './index.scss';

interface PeriodeState {
  numberEvent: number;
  event : JSX.Element[];
}

export const Periode = () => {

  let [periode, setPeriode] = useState({numberEvent:0, event: []} as PeriodeState);
  
  const interactiveRef = useRef(null);
  const eventArray:JSX.Element[] = [];

  /** Génération d'un liste d'heure interactif de l'agenda */
  const createPeriodeTemplate = () => {
    const arrayHour:JSX.Element[] = [];

    /** Boucle pour générer les différentes row de l'agenda */
    for(let i:number = 0; i < 24 ;i++){
      const hour = `${i.toString().padStart(2,'0')}:00`;

      const divHour = (
        <div 
          key={i}
          className="hour px-4 py-2"
        >
          <span>{hour}</span>
        </div>
      );

      arrayHour.push(divHour);
    }

    return arrayHour;
  }
  /** Récupère l'heure de l'event selon le click dans l'agenda */
  const getHoursForEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const cursorPosY = event.clientY;
    const interactiveBlockPositionTop = event.currentTarget.getBoundingClientRect().top;
    const interactiveBlockHeight = event.currentTarget.getBoundingClientRect().height;
    const HOURS_IN_DAY = 24;
    /** On récupére la position du curseur dans notre bloc interactif, puis on le divise par la taille * le nombre d'heure dans une journée */
    return Math.floor(((cursorPosY -interactiveBlockPositionTop ) / interactiveBlockHeight) * HOURS_IN_DAY);

  }

  const createEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const hoursEvent = getHoursForEvent(event);

    setPeriode(prevState => periode = {
      numberEvent : prevState.numberEvent + 1,
      event: [...prevState.event, <Event hours={hoursEvent}/>]
    });

  }

  return (
    <div>
      <div className="periode mt-3">
        <div aria-hidden="true" className="periode__template">
          {createPeriodeTemplate()}
        </div>
        <div 
          ref={interactiveRef} 
          className="periode__interactive"
          onClick={createEvent}
        >
           {periode.event}
        </div>
      </div>
    </div>
  )
}