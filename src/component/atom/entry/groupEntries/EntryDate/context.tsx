import React, {createContext} from "react";
import { StateCalendarProps } from '../interfaces';

export const CalendarContext = createContext({
  stateCalendar: {
    date : '',
    open : false
  },
  setStateCalendar: (_date:StateCalendarProps) => {/** Vide pour être remplacé par le hook */}
});