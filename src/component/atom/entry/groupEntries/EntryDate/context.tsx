import React, {createContext} from "react";

export const CalendarContext = createContext({
  date: new Date(),
  setDate: (_date:Date) => {/** Vide pour remplacer par le hook */}
})