import React from "react";
import './index.scss';


export const Periode = () => {

  /** Génération d'un liste d'heure interactif de l'agenda */
  const PeriodeTemplate = () => {
    const arrayHour:JSX.Element[] = [];

    /** Boucle pour générer les différentes row de l'agenda */
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