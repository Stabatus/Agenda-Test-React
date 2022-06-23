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

export class DateTransform {
     
    private _dateString : DateStringProps;

    /**
     * Conversion d'une date en string ou objet en une chaine charactère, 
     * selon le format demandé
     * @param {ObjectDate | string} dateObj 
     * @param {FORMAT_DATE} format 
     * @returns {string} Date demandé
     */
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
     * @param {ObjectDate} param0 
     * @returns {'HH:MM:SS'} 
     */
     public static HOURS_MIN_SEC = () => {
        const {hours, minutes, secondes} = this._dateString;
        return `${hours}:${minutes}:${secondes}`;
    }
    /**
     * @param {ObjectDate} param0 
     * @returns {'YYYY-MM-DD HH:MM:SS'} 
     */
    public static YEAR_MONTH_DAY__HOURS_MIN_SEC = () => {
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${secondes}`;
    }
    /**
     * @param {ObjectDate} param0 
     * @returns {'DD-MM-YYYY HH:MM:SS'} 
     */
    public static DAY_MONTH_YEAR__HOURS_MIN_SEC  = () => {
        
        return `${day}-${month}-${year} ${hours}:${minutes}:${secondes}`;
    }
    /**
     * @param {ObjectDate} param0 
     * @returns {'YYYY-MM-DD'} 
     */
    public static YEAR_MONTH_DAY = () => {
        
        return `${year}-${month}-${day}`;
    }
    /**
     * @param {ObjectDate} param0 
     * @returns {'DD-MM-YYYY'} 
     */
    public static DAY_MONTH_YEAR = () => {
        
        return `${day}-${month}-${year}`;
    }
    /**
     * @param {ObjectDate} param0 
     * @returns {'MM-YYYY'} 
     */
    public static MONTH_YEAR = () => {
        
        return `${month}-${year}`;
    }
    /**
     * @param {ObjectDate} param0 
     * @returns {'MM'} 
     */
    public static MONTH = () => {
        
        return month;
    }
            /**
     * @param {ObjectDate} param0 
     * @returns {'DD'} 
     */
    public static DAY = () => {
        
        return day;
    }
    

}