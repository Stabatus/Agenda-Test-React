import { createContext } from "react";

export const AgendaContext = createContext({
  AgendaDate: new Date(),
  setAgendaDate : (_date:Date) => { /* Remplacé par la méthode useState() dans le context */ }
});