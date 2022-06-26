import React, { useContext, useEffect } from "react";
import { Periode } from "@/component/Periode";
import { DateTransform } from "@/service";
import { AgendaContext } from "@/context/AgendaContext";
import './index.scss';
import { Entries } from "@/component/atom/entry";

const date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

export const Day = () => {
  const { AgendaDate : date, setAgendaDate } = useContext(AgendaContext);

  useEffect(() => {

  }, [date]);

  return (
    <div>
      <div className="px-4 d-flex justify-content-between align-items-center">
        <Entries.EntryDate
          defaultValue={new DateTransform(date).YMD('-')}
          onChange={(e: string | React.ChangeEvent<HTMLInputElement>) => {
            const date = typeof e === 'string' ? e : e?.target.value;
            setAgendaDate(new Date(date));
          }} 
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