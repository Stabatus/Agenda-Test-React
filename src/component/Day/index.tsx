import React, { useContext } from "react";
import { Periode } from "@/component/Periode";
import { DateTransform } from "@/service";
import { AgendaContext } from "@/context/AgendaContext";
import { Entries } from "@/component/atom/entry";
import './index.scss';

export const Day = () => {
  const { AgendaDate : date, setAgendaDate } = useContext(AgendaContext);

  const changeDate = (e: string | React.ChangeEvent<HTMLInputElement>) => {
    const newDate = typeof e === 'string' ? e : e?.target.value;
    setAgendaDate(new Date(newDate));
  }

  return (
    <div>
      <div className="px-4 d-flex justify-content-between align-items-center">

        <Entries.EntryDate
          key={new DateTransform(date).YMD('-')}
          defaultValue={new DateTransform(date).YMD('-')}
          onChange={changeDate} 
          changeEvent={changeDate}
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