import {differenceInDays} from "date-fns";

export function isByWeeklyDate(startDate: Date, compareDate: Date) {
    const dagerForskjell = differenceInDays(compareDate, startDate);
    const rest = dagerForskjell%14;
    return rest === 0;
}
