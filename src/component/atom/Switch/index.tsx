import React from "react";
import { PropsSwitch } from "./interface";
import './index.scss';

export const Switch = ({ id }:PropsSwitch) => (
  <>
    <input type="checkbox" name="switch" id={id} hidden />
    <label htmlFor={id} className="switch">
    </label>
  </>
)