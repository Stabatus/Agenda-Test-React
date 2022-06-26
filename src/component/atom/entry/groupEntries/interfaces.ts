import React, { InputHTMLAttributes } from "react";

export interface EntryProps extends InputHTMLAttributes<HTMLInputElement>{}

export interface EntryDateProps extends InputHTMLAttributes<HTMLInputElement>{
}

export interface CalendarProps{
  date: Date;
  setDate : React.Dispatch<React.SetStateAction<Date>>
}