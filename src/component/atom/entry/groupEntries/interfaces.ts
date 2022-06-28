import React, { InputHTMLAttributes } from "react";

export interface EntryProps extends InputHTMLAttributes<HTMLInputElement>{}

export interface EntryDateProps extends InputHTMLAttributes<HTMLInputElement>{
  changeEvent : (arg:any) => void | undefined
}

export interface StateCalendarProps {
  date: string;
  open: boolean;
}


export type changeEventProps = {
  changeEvent: (arg:string) => void | React.ChangeEventHandler<HTMLInputElement> | undefined
};