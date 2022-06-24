import React, {Component} from "react";
import { EntryProps } from "./interfaces";

export class Entry extends Component<EntryProps>{

  constructor(props:EntryProps){
    super(props);
  }

  render(){ return (
    <>
      <input 
        className="entry"
        {...this.props}
      />
    </>
  )}

}
