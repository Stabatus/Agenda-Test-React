import React, { createContext, useState } from "react";
import { Day } from './component/Day';
import { NavigationDay } from './component/NagivationDay';
import { AgendaContext } from "./context/AgendaContext";

function App() {
  
  const [AgendaDate, setAgendaDate] = useState(new Date());

  return (
    <>
      <h1 className="px-4 py-2">
        Test d'Agenda
      </h1>
      <AgendaContext.Provider value={{ AgendaDate, setAgendaDate }}>
        <NavigationDay/>
        <Day />
      </AgendaContext.Provider>
    </>
  )
}

export default App
