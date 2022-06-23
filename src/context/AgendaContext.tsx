import { createContext, useContext } from "react";

export const AgendaContext = createContext({
  AgendaDate: new Date(),
  setAgendaDate : (date:Date) => {}
});