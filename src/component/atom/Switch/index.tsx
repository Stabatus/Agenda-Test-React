import React from "react";
import './index.css';
import { PropsSwitch } from "./interface";

export const Switch = ({ id }:PropsSwitch) => (
  <>
    <input type="checkbox" name="switch" id={id} hidden />
    <label htmlFor={id} className="switch">
    </label>
  </>
)