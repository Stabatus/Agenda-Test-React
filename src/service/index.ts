/** Jour de la semaine */
export const DAY_OF_WEEK: string[] = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];

/** Rajoute un 0 si le chiffre est endessous de 10 */
export const setupZero = ( item: string | number ):string => item.toString().padStart(2, '0');

/** Récuper un object selon une date donnée et un delta autour de la date */
export const getDateFromStartingDate = ( date = new Date(), amouthDays = 0 ) => {
    const dateTmp = new Date(date.getTime());
    dateTmp.setDate(date.getDate() + amouthDays);
    return dateTmp;
}

export const TODAY = new Date();