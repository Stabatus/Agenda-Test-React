import React, { useContext } from "react";
import { Switch } from "../atom/Switch";
import { Periode } from "../Periode";
import { DayProps } from "./interface";
import { DAY_OF_WEEK, setupZero } from "../../service";
import './index.css';
import { AgendaContext } from "../../context/AgendaContext";


export const Day = () => {
  const { date } = useContext(AgendaContext);
  const dateString = `${DAY_OF_WEEK[date.getDay() - 1]} - ${setupZero(date.getDate())}/${setupZero(date.getMonth() + 1)}/${date.getFullYear()}`

  return (
    <div>
      <div className="px-4 d-flex justify-content-between align-items-center">
        <span>{dateString}</span>
        <Switch id="onOff" />
      </div>
      <Periode />
    </div>
  );
}