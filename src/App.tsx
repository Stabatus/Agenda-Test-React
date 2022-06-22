import React, { createContext } from "react";
import { Day } from './component/Day';
import { NavigationDay } from './component/NagivationDay';
import { AgendaContext } from "./context/AgendaContext";

function App({date = new Date()}) {

  return (
    <>
      <h1 className="px-4 py-2">
        Test d'Agenda
      </h1>
      <AgendaContext.Provider value={{ date }}>
        <NavigationDay/>
        <Day />
      </AgendaContext.Provider>
    </>
  )
}

export default App
