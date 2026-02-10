import {differenceInDays} from "date-fns";

export function isByWeeklyDate(startDate: Date, compareDate: Date) {
    const dagerForskjell = differenceInDays(compareDate, startDate);
    const rest = dagerForskjell%14;
    return rest === 0;
}

export function ukedagNavn(dayNumber: number) {
    const dayNames = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
    return dayNames[dayNumber];
}

export function imorgenDateString() {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const monthNames = ['Januar', 'Februar','Mars', 'April','Mai', 'Juni','Juli', 'August','September','Oktober', 'November', 'Desember']
    return `${tomorrow.getDate()}. ${monthNames[tomorrow.getMonth()]}`
}

export function tomorrowDate() {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    return tomorrow;
}