import React, { useMemo } from "react";

const NEW_LINE = /\r\n|\n|\r/;

const EVENT = "VEVENT";
const EVENT_START = "BEGIN";
const EVENT_END = "END";
const START_DATE = "DTSTART";
const END_DATE = "DTEND";
const DESCRIPTION = "DESCRIPTION";
const SUMMARY = "SUMMARY";
const LOCATION = "LOCATION";
const ALARM = "VALARM";
const RRULE = "RRULE";

type keyMapType = typeof EVENT | typeof EVENT_START | typeof EVENT_END | typeof START_DATE | typeof END_DATE | typeof DESCRIPTION | typeof SUMMARY | typeof LOCATION | typeof ALARM | typeof RRULE;

const keyMap = {
  [START_DATE]: "startDate",
  [END_DATE]: "endDate",
  [DESCRIPTION]: "description",
  [SUMMARY]: "summary",
  [LOCATION]: "location",
  [RRULE]: "Recurrence rule"
} as const;

type keyMapKeys = keyof typeof keyMap;
type currentObjKeys = typeof keyMap[keyMapKeys];

export interface CurrentObjInterface {
  'startDate'? : Date;
  'endDate'? : Date;
  'description'? : string;
  'summary'? : string;
  'location'? : string;
  'Recurrence rule'? : Map<string,string>;
}
type lastKeyType = keyof CurrentObjInterface;

const clean = (string:string) => decodeURI(string).trim();

const setupReccurency = (rrule:string) => {
  const rruleValues = rrule.split(";");
  const arrayValues = rruleValues.map(rv => rv.split("="));
  const rrulesMap: Map<string,string> = new Map();

  for(const ar in arrayValues){
    rrulesMap.set(arrayValues[ar][0],arrayValues[ar][1]);
  }

  return rrulesMap;

}

const REGEX_DATE = /^(\d{4})(\d{2})(\d{2}\w{1}\d{2})(\d{2})(\d{2}\w{1})$/g;
const FORMAT_DATE = '$1-$2-$3:$4:$5';

class IcsToJson {

  public array:CurrentObjInterface[] = [];
  private currentObj:CurrentObjInterface = {};
  private lastKey:currentObjKeys | "" = "";
  private isAlarm = false;
  private lines:string[] = [];

  constructor(icsData:string){
    this.lines = icsData.split(NEW_LINE);
    
    for(const line in this.lines){
      this.createEventObj(this.lines[line]);
    }
  }

  private createEventObj = (line:string) => {
    const lineData = line.split(":");
    let key:keyMapType | string  = lineData[0] as keyMapType;
    const value = lineData[1];

    if (key.indexOf(";") !== -1) {
      const keyParts = key.split(";");
      key = keyParts[0];
      // Maybe do something with that second part later
    }

    if (lineData.length < 2 && this.lastKey != "") {
      if (key.startsWith(" ") && this.lastKey !== undefined && this.lastKey.length) {
        this.currentObj[this.lastKey] += clean(line.substring(1));
      }
      return;
    } else {
      this.lastKey = keyMap[key] as lastKeyType;
    }

    switch (key) {
      case EVENT_START:
        if (value === EVENT) {
          this.currentObj = {};
        } else if (value === ALARM) {
          this.isAlarm = true;
        }
        break;
      case EVENT_END:
        this.isAlarm = false;
        if (value === EVENT) this.array.push(this.currentObj);
        return;
      case START_DATE:
        this.currentObj[keyMap[START_DATE]] = new Date(value.replace(REGEX_DATE, FORMAT_DATE));
        return;
      case END_DATE:
        this.currentObj[keyMap[END_DATE]] = new Date(value.replace(REGEX_DATE, FORMAT_DATE));
        return;
      case DESCRIPTION:
        if (!this.isAlarm) this.currentObj[keyMap[DESCRIPTION]] = clean(value);
        return;
      case SUMMARY:
        this.currentObj[keyMap[SUMMARY]] = clean(value);
        return;
      case LOCATION:
        this.currentObj[keyMap[LOCATION]] = clean(value);
        return;
      case RRULE:
        this.currentObj[keyMap[RRULE]] = setupReccurency(clean(value));
        return;
      default:
        return;
    }
  }

}

interface ControllerInterface{
  AgendaDate: Date;
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
}

const mapWeek = ['MO','TU','WE','TH','FR','SA','SU'];

const createFile = (array:CurrentObjInterface[]):void => {
  console.log(array, JSON.stringify(array));
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(array))}`;
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", "Events.json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

const createTemplate = ():CurrentObjInterface[] => {
  const array = [];
  const MAX_EVENT = 50000;

  const createRandomFrequency = () => {
      const isRecurent = Math.floor((Math.random() * 3)) % 3 === 0;
      if(!isRecurent) return null;

      const map:Map<string, string> = new Map();

      if(Math.floor((Math.random() * 3))%3 === 0 ) {
        map.set('FREQ','DAILY');
        if(Math.floor((Math.random() * 3))%3 === 0 ){
          map.set('INTERVAL',`${Math.floor((Math.random() * 4)+2)}`);
          return map;
        }
      }
      else{
        map.set('FREQ','WEEKLY');
        if(Math.floor((Math.random() * 3))%3 === 0 ){
          map.set('INTERVAL',`${Math.floor((Math.random() * 3))}`);
          return map;
        }else{
          const emptyArray:string[] = [];
          for(let i = 0, max = Math.floor((Math.random() * 6) + 1); i < max; i++ ){
            const newValue = mapWeek[Math.floor((Math.random() * 6) + 1)];
            if(!emptyArray.includes(newValue)) emptyArray.push();
            else {
              continue
            }
          }
          map.set('BYDAY', emptyArray.join(','));
          return map;
        }
      } 

      

  }

  for(let i = 0; i < MAX_EVENT; i++){
    
    const hoursEvent = Math.floor((Math.random() * 23));
    const date = `20${Math.floor((Math.random() * (MAX_EVENT/30)) + 10)}-${Math.floor((Math.random() * 12))}-${Math.floor((Math.random() * 30))}`;
    const startDate = new Date(date);
    const mapRrule = createRandomFrequency();

    const newEvent = {
      'Recurrence rule' : mapRrule == null ? null : JSON.stringify(Object.fromEntries(mapRrule)),
      'description' : "",
      'endDate' : new Date(startDate.setHours(hoursEvent+1, 0)),
      'location' : '',
      'startDate' : new Date(startDate.setHours(hoursEvent, 0)),
      'summary' : `RDV - ${i}`
    }

    array.push(newEvent);
  }

  createFile(array);
}


export class Controller {

  private AgendaDate: Date;
  private setEvents: React.Dispatch<React.SetStateAction<any[]>>;
  private data: CurrentObjInterface[] = [];

  constructor({AgendaDate, setEvents}:ControllerInterface){
    this.AgendaDate = AgendaDate;
    this.setEvents = setEvents;
  }

  private isInInterval = ({startDate, interval}: {startDate:Date, interval : number}) => Math.floor(this.AgendaDate.getTime() - startDate.getTime()/ (1000 * 60 * 60 * 24)) % interval == 0;

  private isTodayForEvent = (startDate :Date, rRuleString:string) => {
    if(rRuleString == undefined) return false;
    if(this.AgendaDate.getTime() < startDate.getTime()) return false;
    const jsonParsed = JSON.parse(rRuleString);
    const rRule:Map<string,string> = new Map();
    for(const jp in jsonParsed){
      rRule.set(jp, jsonParsed[jp]);
    }

    if(!rRule.has('FREQ')) return false;

    switch(rRule.get('FREQ')){
      case ('DAILY'):{
        if(!rRule.has('INTERVAL')) return true;

        const interval = parseInt(rRule.get('INTERVAL'));
        return this.isInInterval({interval, startDate});
      }
      case ('WEEKLY'):{
        
        if((!rRule.has('BYDAY') || !rRule.has('WKST') ||!rRule.has('INTERVAL')) && this.isInInterval({interval : 7, startDate})) return true;
        
        if(rRule.has('INTERVAL')) return this.isInInterval({interval : parseInt(rRule.get('INTERVAL')), startDate});
        
        if((rRule.has('BYDAY'))){
          const days = rRule.get('BYDAY')?.split(',');
          const dayOfAgendaDate = this.AgendaDate.toLocaleString('en-us', {  weekday: 'short' }).substring(0,2).toUpperCase();
          return days?.includes(dayOfAgendaDate);
        }
        return false;
      }
      default:
        return false;
    }

  }
  private isToday = (someDate: Date) => someDate.getDate() == this.AgendaDate.getDate() && someDate.getMonth() == this.AgendaDate.getMonth() && someDate.getFullYear() == this.AgendaDate.getFullYear();
  
  public fetchEvent = async ():Promise<void> => {
    //const icsRes = await fetch('rubenletist@gmail.com.ics');
    //const icsData = await icsRes.text();
    //this.data = new IcsToJson(icsData).array;
    const icsRes = await fetch('Events.json');
    const icsData = await icsRes.json();
    this.data = icsData;
    console.log(this.data);
    this.setEvents(() => {
      const todayDate = this.data.filter(
        event => {
          const startDate = new Date(event["startDate"]);
          if((startDate != null) && (this.isToday(startDate as Date) || this.isTodayForEvent(startDate as Date, event["Recurrence rule"] as Map<string, string>))) {
            return event;
          }
        });
      return [...todayDate]
    });
  }

  public createPeriodeTemplate = () => {
    const arrayHour:string[] = [];
  
    /** Boucle pour générer les différentes row de l'agenda */
    for(let i:number = 0; i < 24 ;i++){
      const hour = `${i.toString().padStart(2,'0')}:00`;
  
      arrayHour.push(hour);
    }
  
    return arrayHour;
  }

  private getHoursForEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const cursorPosY = event.clientY;
    const interactiveBlockPositionTop = event.currentTarget.getBoundingClientRect().top;
    const interactiveBlockHeight = event.currentTarget.getBoundingClientRect().height;
    const HOURS_IN_DAY = 24;
    /** On récupére la position du curseur dans notre bloc interactif, puis on le divise par la taille * le nombre d'heure dans une journée */
    return Math.floor(((cursorPosY -interactiveBlockPositionTop ) / interactiveBlockHeight) * HOURS_IN_DAY);
  
  }

  public createEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const hoursEvent = this.getHoursForEvent(event);
  
    this.setEvents(prevState => {
      const newEvent = {
      'Recurrence rule' : null,
      'description' : "",
      'endDate' : new Date(new Date().setHours(hoursEvent+1, 0)),
      'location' : '',
      'startDate' : new Date(new Date().setHours(hoursEvent, 0)),
      'summary' : 'Nouvel Event'
      }

      return [...prevState, newEvent];
    });
  
  }
 
  public createTemplate = () => createTemplate();

}