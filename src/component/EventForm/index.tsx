import React from "react";
import { Entries } from "../atom/entry";
import './index.scss';


export const EventForm = () => {


  return (
    <form className="form--event">
      <label className="mb-3">
        {"Ajouter un titre à l'évenement"}<br/>
        <Entries.Entry />
      </label>
      <div className="d-flex justify-content-start align-items-center gap-4 mb-3">
        <label htmlFor="">
          {"Heures du début"}<br/>
          <Entries.EntryHours />
        </label>
        <span>-</span>
        <label htmlFor="">
          {"Heures de fin"}<br/>
          <Entries.EntryHours />
        </label>
      </div>
      <div>
        <button className="primary-btn--fluid">
          {"Créer l'évenement"}
        </button>
      </div>
    </form>
  )

}