/** Jour de la semaine */
export const DAY_OF_WEEK = Object.freeze(['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']);

/** Rajoute un 0 si le chiffre est endessous de 10 */
export const setupZero = ( item: string | number ) => item.toString().padStart(2, '0');


/** Récuper un object selon une date donnée et un delta autour de la date */
export const getDateFromStartingDate = ( date = new Date(), amouthDays = 0 ) => {
    const dateTmp = new Date(date.getTime());
    dateTmp.setDate(date.getDate() + amouthDays);
    return dateTmp;
}

export const TODAY = new Date();

interface DateStringProps {
    month : string;
    day : string;
    year : string;
    hours : string;
    minutes : string;
    secondes : string;
}

type separatorDate = '/' | '-';

/**
 * @class
 * @classdesc Conversion d'une date en string, ou objet, en une chaine charactère, 
 * selon le format disponible par la class
 * @constructor Transforme une chaine de caractère ou un objet date en un objet
 * pour créer le format de date disponible
 * @param { Date | string } 
 */
export class DateTransform {
     
    private _dateString : DateStringProps;

    constructor(dateObj: Date | string){
        if(typeof dateObj === 'string'){
            dateObj = new Date(dateObj);
        }

        this._dateString = {
            month : (dateObj.getMonth()+1).toString().padStart(2, "0"),
            day : dateObj.getDate().toString().padStart(2, "0"),
            year : dateObj.getFullYear().toString(),
            hours : dateObj.getHours().toString().padStart(2, "0"),
            minutes : dateObj.getMinutes().toString().padStart(2, "0"),
            secondes : dateObj.getSeconds().toString().padStart(2, "0")
        };

    }

    /**
     * @returns {string} hh:mm:ss
     */
    public HMS = () => {
        const { hours, minutes, secondes } = this._dateString;
        return `${hours}:${minutes}:${secondes}`;
    }
    
    /**
     * @param {'/' | '-'} separatorDate séparateur de date ( / | -)
     * @default {'/'}
     * @returns {string} yy/MM/dd hh:mm:ss
     */
    public YMDHMS = (separatorDate:separatorDate = '/') => {
        const { year, month, day, hours, minutes, secondes } = this._dateString;
        return `${year}${separatorDate}${month}${separatorDate}${day} ${hours}:${minutes}:${secondes}`;
    }
    
    /**
     * @param {'/' | '-'} separatorDate séparateur de date ( / | -)
     * @default {'/'}
     * @returns {string} dd/MM/yy hh:mm:ss
     */
    public DMYHMS  = (separatorDate:separatorDate = '/') => {
        const { year, month, day, hours, minutes, secondes } = this._dateString;        
        return `${day}${separatorDate}${month}${separatorDate}${year} ${hours}:${minutes}:${secondes}`;
    }
    
    /**
     * @param {'/' | '-'} separatorDate séparateur de date ( / | -)
     * @default {'/'}
     * @returns {string} yy/MM/dd
     */
    public YMD = (separatorDate:separatorDate = '/') => {
        const { year, month, day } = this._dateString;  
        
        return `${year}${separatorDate}${month}${separatorDate}${day}`;
    }
    
    /**
     * @param {'/' | '-'} separatorDate séparateur de date ( / | -)
     * @default {'/'}
     * @returns {string} dd/MM/yy
     */
    public DMY = (separatorDate:separatorDate = '/') => {
        const { year, month, day } = this._dateString;  
        
        return `${day}${separatorDate}${month}${separatorDate}${year}`;
    }
    
    /**
     * @param {'/' | '-'} separatorDate séparateur de date ( / | -)
     * @default {'/'}
     * @returns {string} MM/yy
     */
    public MY = (separatorDate:separatorDate = '/') => {
        const { year, month } = this._dateString;  
        
        return `${month}${separatorDate}${year}`;
    }

    /**
     * @returns {string} MM
     */
    public M = () => {
        const { month } = this._dateString;  
        
        return month;
    }
    
    /**
     * @returns {string} dd
     */
    public D = () => {
        const { day } = this._dateString;   
        return day;
    }

}

export const numberOfWeek = (dateObj:Date) => {
    const lastDay = new Date(dateObj.getFullYear(), dateObj.getMonth()+1, 0);
    return Math.ceil((lastDay.getDate() - lastDay.getDay()) / 7) + 1;
}