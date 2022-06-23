import React, { useContext } from "react";
import { Switch } from "@/component/atom/Switch";
import { Periode } from "@/component/Periode";
import { DateTransform, DAY_OF_WEEK, setupZero } from "@/service";
import { AgendaContext } from "@/context/AgendaContext";
import './index.css';


export const Day = () => {
  const { AgendaDate : date, setAgendaDate } = useContext(AgendaContext);
  const weekday = date.toLocaleString('default', { weekday: 'long' });
  const dateString = `${weekday} - ${new DateTransform(date).DMY()}`;
  
  return (
    <div>
      <div className="px-4 d-flex justify-content-between align-items-center">
        <input 
          className="entry" 
          type={"date"} 
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