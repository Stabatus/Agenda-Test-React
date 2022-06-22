import { createContext, useContext } from "react";

export const AgendaContext = createContext({
  date: new Date(),
  setAgendaDate : (date:Date) => {}
});