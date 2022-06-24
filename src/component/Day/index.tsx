import React, { useContext } from "react";
import { Periode } from "@/component/Periode";
import { DateTransform } from "@/service";
import { AgendaContext } from "@/context/AgendaContext";
import './index.scss';
import { Entries } from "@/component/atom/entry";


export const Day = () => {
  const { AgendaDate : date, setAgendaDate } = useContext(AgendaContext);
  
  return (
    <div>
      <div className="px-4 d-flex justify-content-between align-items-center">
        
        <Entries.EntryDate 
          value={new DateTransform(date).YMD('-')}
          onChange={(e) => setAgendaDate(new Date(e.target.value))} 
        />

        <button
          className="third-btn"
          onClick={() => setAgendaDate(new Date())}
        >
            Aujourd'hui
        </button>
      </div>
      <Periode />
    </div>
  );
}