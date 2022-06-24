import { InputHTMLAttributes } from "react";

export interface EntryProps extends InputHTMLAttributes<HTMLInputElement>{}

export interface EntryDateProps extends InputHTMLAttributes<HTMLInputElement>{
  value : string;
}

export interface CalendarProps{
  date: Date;
}