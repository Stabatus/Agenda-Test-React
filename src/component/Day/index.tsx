import React, { useContext } from "react";
import { Switch } from "../atom/Switch";
import { Periode } from "../Periode";
import { DayProps } from "./interface";
import { DAY_OF_WEEK, setupZero } from "../../service";
import { AgendaContext } from "../../context/AgendaContext";
import './index.css';


export const Day = () => {
  const { AgendaDate : date } = useContext(AgendaContext);
  const weekday = date.toLocaleString('default', { weekday: 'long' });
  const dateString = `${weekday} - ${setupZero(date.getDate())}/${setupZero(date.getMonth() + 1)}/${date.getFullYear()}`
  return (
    <div>
      <div className="px-4 d-flex justify-content-between align-items-center">
        <span className="date">{dateString}</span>
        <Switch id="onOff" />
      </div>
      <Periode />
    </div>
  );
}