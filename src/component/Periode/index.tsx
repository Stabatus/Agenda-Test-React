import { AgendaContext } from "@/context/AgendaContext";
import React, {createContext, useContext, useEffect, useState} from "react";
import { Controller, CurrentObjInterface } from "./fetchData";
import {Event} from '@/component/Event';
import './index.scss';

export const Periode = () => {

  let [events, setEvents] = useState([] as CurrentObjInterface[]);
  let [allEvents, setAllEvents] = useState([] as CurrentObjInterface[]);
  const {AgendaDate} = useContext(AgendaContext);

  const {
    createPeriodeTemplate,
    fetchEvent,
    createEvent,
    createTemplate
  } = new Controller({AgendaDate, setEvents, allEvents, setAllEvents});

  useEffect(() => {
    fetchEvent();
  },[AgendaDate]);
  
  return (
      <div>
        <button
          onClick={createTemplate}
        >
          Créer un json
        </button>
        <div className="periode mt-3">
          <div aria-hidden="true" className="periode__template">
            {createPeriodeTemplate().map(
              h => 
                  <div 
                    key={`hours-${h}`}
                    className="hour px-4 py-2"
                  >
                    <span>{h}</span>
                  </div>
            )}
          </div>
          <div 
            className="periode__interactive"
            onClick={createEvent}
          >
          {events.length === 0 || 
              events.map(
                e => {
                  const startDate = new Date(e["startDate"]);
                  const endDate = new Date(e["endDate"]);
                  const startHours = `${startDate.getHours().toString().padStart(2,'0')}:${startDate.getMinutes().toString().padStart(2,'0')}`;
                  const endHours = `${endDate.getHours().toString().padStart(2,'0')}:${endDate.getMinutes().toString().padStart(2,'0')}`;
                  const title = e['summary'];
                  return <Event key={`event-${title}}`} hours={startDate.getHours()} content={`${title} : ${startHours} --- ${endHours}`}/>
                  
                }
              )
            }
          </div>
        </div>
      </div>
  )
}