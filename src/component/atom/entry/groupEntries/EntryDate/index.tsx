import React, {Component} from "react";
import { EntryDateProps } from "../interfaces";
import { Calendar } from "./Calendar";

export class EntryDate extends Component<EntryDateProps>{

  constructor(props:EntryDateProps){
    super(props);
  }

  render = () => (
    <div className="container__entry--date">
      <>
        <input 
          className="entry"
          type={"date"}
          {...this.props}
        />
        <Calendar date={this.props.value}/>
      </>
    </div>
  )

}
