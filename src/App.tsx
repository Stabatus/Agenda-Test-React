import React, { useState } from "react";
import { Day } from '@/component/Day';
import { NavigationDay } from '@/component/NagivationDay';
import { AgendaContext } from "@/context/AgendaContext";

function App() {
  
  const [AgendaDate, setAgendaDate] = useState(new Date());
  return (
    <>
      <AgendaContext.Provider value={{ AgendaDate, setAgendaDate }}>
      <h1 className="px-4 py-2">{AgendaDate.getFullYear()}</h1>
        <NavigationDay/>
        <Day />
      </AgendaContext.Provider>
    </>
  )
}

export default App
